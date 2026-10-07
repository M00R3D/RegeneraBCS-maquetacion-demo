const content = window.RegeneraContent;
const user = content.getCurrentUser();

if (!user) {
    window.location.replace("login.html?returnTo=medallas.html");
} else {
    const impact = content.getUserImpact(user.usuario_id);
    document.getElementById("medalImpactSummary").innerHTML = `
        <div><span>PUNTOS</span><strong>${impact.puntos}</strong></div>
        <div><span>MEDALLAS DESBLOQUEADAS</span><strong>${impact.medallas} / ${impact.achievements.length}</strong></div>
        <div><span>VOLUNTARIADOS COMPLETADOS</span><strong>${impact.voluntariados}</strong></div>
        <div><span>ARTÍCULOS APROBADOS</span><strong>${impact.articulos}</strong></div>`;
    document.getElementById("allMedals").innerHTML = impact.achievements
        .map(content.renderAchievementCard)
        .join("");
}
