(() => {
    const capacities = [
        { version: 1, data: 19, ecc: 7 },
        { version: 2, data: 34, ecc: 10 },
        { version: 3, data: 55, ecc: 15 },
        { version: 4, data: 80, ecc: 20 },
        { version: 5, data: 108, ecc: 26 }
    ];

    function multiply(left, right) {
        let result = 0;
        for (let bit = 7; bit >= 0; bit -= 1) {
            result = (result << 1) ^ ((result >>> 7) * 0x11d);
            result ^= ((right >>> bit) & 1) * left;
        }
        return result;
    }

    function reedSolomon(data, count) {
        let generator = [1];
        let root = 1;
        for (let index = 0; index < count; index += 1) {
            const next = new Array(generator.length + 1).fill(0);
            generator.forEach((coefficient, position) => {
                next[position] ^= coefficient;
                next[position + 1] ^= multiply(coefficient, root);
            });
            generator = next;
            root = multiply(root, 2);
        }
        const remainder = new Array(count).fill(0);
        data.forEach(value => {
            const factor = value ^ remainder.shift();
            remainder.push(0);
            remainder.forEach((_, index) => { remainder[index] ^= multiply(generator[index + 1], factor); });
        });
        return remainder;
    }

    function makeCodewords(text, spec) {
        const bytes = [...new TextEncoder().encode(text)];
        const bitCount = 4 + 8 + bytes.length * 8;
        if (bitCount > spec.data * 8) throw new Error("El contenido QR es demasiado largo.");
        const bits = [];
        const append = (value, length) => {
            for (let shift = length - 1; shift >= 0; shift -= 1) bits.push((value >>> shift) & 1);
        };
        append(4, 4);
        append(bytes.length, 8);
        bytes.forEach(byte => append(byte, 8));
        for (let index = 0; index < Math.min(4, spec.data * 8 - bits.length); index += 1) bits.push(0);
        while (bits.length % 8) bits.push(0);
        const data = [];
        for (let index = 0; index < bits.length; index += 8) {
            data.push(bits.slice(index, index + 8).reduce((value, bit) => (value << 1) | bit, 0));
        }
        for (let pad = 0; data.length < spec.data; pad += 1) data.push(pad % 2 ? 0x11 : 0xec);
        return [...data, ...reedSolomon(data, spec.ecc)];
    }

    function formatBits(mask) {
        const data = (1 << 3) | mask;
        let remainder = data << 10;
        for (let bit = 14; bit >= 10; bit -= 1) {
            if ((remainder >>> bit) & 1) remainder ^= 0x537 << (bit - 10);
        }
        return ((data << 10) | remainder) ^ 0x5412;
    }

    function encode(text) {
        const bytes = new TextEncoder().encode(text);
        const spec = capacities.find(entry => 4 + 8 + bytes.length * 8 <= entry.data * 8);
        if (!spec) throw new Error("El código QR excede el tamaño permitido.");
        const size = 17 + spec.version * 4;
        const matrix = Array.from({ length: size }, () => new Array(size).fill(null));
        const set = (x, y, value) => { matrix[y][x] = Boolean(value); };
        const finder = (centerX, centerY) => {
            for (let dy = -4; dy <= 4; dy += 1) {
                for (let dx = -4; dx <= 4; dx += 1) {
                    const x = centerX + dx;
                    const y = centerY + dy;
                    if (x < 0 || y < 0 || x >= size || y >= size) continue;
                    const distance = Math.max(Math.abs(dx), Math.abs(dy));
                    set(x, y, distance !== 2 && distance !== 4);
                }
            }
        };
        finder(3, 3);
        finder(size - 4, 3);
        finder(3, size - 4);

        for (let index = 8; index < size - 8; index += 1) {
            if (matrix[6][index] === null) set(index, 6, index % 2 === 0);
            if (matrix[index][6] === null) set(6, index, index % 2 === 0);
        }
        const alignmentPositions = spec.version === 1 ? [] : [6, size - 7];
        alignmentPositions.forEach(centerY => alignmentPositions.forEach(centerX => {
            if (matrix[centerY][centerX] !== null) return;
            for (let dy = -2; dy <= 2; dy += 1) {
                for (let dx = -2; dx <= 2; dx += 1) {
                    set(centerX + dx, centerY + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
                }
            }
        }));

        const drawFormat = mask => {
            const format = formatBits(mask);
            for (let index = 0; index < 15; index += 1) {
                const dark = ((format >>> index) & 1) !== 0;
                if (index < 6) set(8, index, dark);
                else if (index < 8) set(8, index + 1, dark);
                else if (index === 8) set(7, 8, dark);
                else set(14 - index, 8, dark);

                if (index < 8) set(size - 1 - index, 8, dark);
                else set(8, size - 15 + index, dark);
            }
            set(8, size - 8, true);
        };
        drawFormat(0);

        const codewords = makeCodewords(text, spec);
        const dataBits = codewords.flatMap(byte => Array.from({ length: 8 }, (_, bit) => (byte >>> (7 - bit)) & 1));
        let bitIndex = 0;
        let upward = true;
        for (let right = size - 1; right >= 1; right -= 2) {
            if (right === 6) right -= 1;
            for (let vertical = 0; vertical < size; vertical += 1) {
                const y = upward ? size - 1 - vertical : vertical;
                for (let offset = 0; offset < 2; offset += 1) {
                    const x = right - offset;
                    if (matrix[y][x] !== null) continue;
                    const bit = bitIndex < dataBits.length ? dataBits[bitIndex] : 0;
                    bitIndex += 1;
                    set(x, y, Boolean(bit ^ ((x + y) % 2 === 0)));
                }
            }
            upward = !upward;
        }
        drawFormat(0);
        return matrix;
    }

    function toSvg(text) {
        const matrix = encode(text);
        const border = 4;
        const size = matrix.length + border * 2;
        const modules = [];
        matrix.forEach((row, y) => row.forEach((dark, x) => {
            if (dark) modules.push(`M${x + border},${y + border}h1v1h-1z`);
        }));
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Código QR de asistencia"><rect width="${size}" height="${size}" fill="#fff"/><path d="${modules.join("")}" fill="#123e32"/></svg>`;
    }

    window.RegeneraQr = { toSvg };
})();
