const content = window.RegeneraContent;
const user = content.getCurrentUser();

window.location.replace(user ? "perfil.html#earnedMedals" : "login.html?returnTo=perfil.html%23earnedMedals");
