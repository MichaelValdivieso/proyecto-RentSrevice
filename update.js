showUserName = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    if (user && user.firstName && user.lastName) {
        document.getElementById("userActivo").textContent = `${user.firstName} ${user.lastName}`;
        console.log(checkSession());
    } else {
        alert("No hay sesión activa. Redirigiendo al login...");
        window.location.href = "login.html";
    }
}
function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loginTime");
    //alert("Sesión cerrada.");
    mostrarMensajeOut();
    //window.location.href = "login.html";
    setTimeout(function () {
        window.location.href = "login.html";
    }, 2000);
}

checkSession = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const loginTime = localStorage.getItem("loginTime");
    const SESSION_TIMEOUT = 60 * 60 * 1000; // 60 minutos

    if (user && loginTime) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(loginTime);
        console.log(elapsedTime);

        if (elapsedTime > SESSION_TIMEOUT) {
            logout();
            mostrarMensajeTime();
        } else {
            document.getElementById("userActivo").textContent = `${user.firstName} ${user.lastName}`;
        }
    }
}
mostrarMensajeTime = () => {
    document.getElementById('miModalTime').style.display = 'block';
}
cerrarMensajeTime = () => {
    document.getElementById('miModalTime').style.display = 'none';
}
load = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("email").value = `${user.email}`;
        document.getElementById("password").value = `${user.password}`;
        document.getElementById("firstName").value = `${user.firstName}`;
        document.getElementById("lastName").value = `${user.lastName}`;
        document.getElementById("date").value = `${user.birthDate}`;
    }
}
window.onload = load();

update = () => {
    const updatedEmail = document.getElementById("email").value;
    const updatedPassword = document.getElementById("password").value;
    const updatedFirstName = document.getElementById("firstName").value;
    const updatedLastName = document.getElementById("lastName").value;
    const updatedDate = document.getElementById("date").value;

    let userAct = JSON.parse(localStorage.getItem("loggedInUser"));
    let userlist = JSON.parse(localStorage.getItem("userList"));
    let user = userlist.find(u => u.email === userAct.email);

    if (user && userAct) {

        user.email = updatedEmail;
        user.password = updatedPassword;
        user.firstName = updatedFirstName;
        user.lastName = updatedLastName;
        user.birthDate = updatedDate;

        userAct.email = updatedEmail;
        userAct.password = updatedPassword;
        userAct.firstName = updatedFirstName;
        userAct.lastName = updatedLastName;
        userAct.birthDate = updatedDate;


        userlist = userlist.map(u => u.email === user.email ? user : u);
        localStorage.setItem("userList", JSON.stringify(userlist));
        localStorage.setItem("loggedInUser", JSON.stringify(userAct));
        sessionStorage.setItem("loggedInUser", JSON.stringify(userAct));


        document.getElementById("userActivo").innerText = `${user.firstName} ${user.lastName}`;


        //  alert("Perfil actualizado correctamente.");
        mostrarMensaje();

    }
}


let btnSave = document.getElementById("btnSaveUp");
btnSave.onclick = () => {
    update();
}

let home = document.getElementById("home");
home.onclick = () => {
    location.href = "home.html";
}

window.onload = () => {
    showUserName();
    checkSession();
    load();
}

mostrarMensajeOut = () => {
    document.getElementById('miModalOut').style.display = 'block';
}
cerrarMensajeOut = () => {
    document.getElementById('miModalOut').style.display = 'none';
}
mostrarMensaje = () => {
    document.getElementById('miModal').style.display = 'block';
}
cerrarMensaje = () => {
    document.getElementById('miModal').style.display = 'none';
}
let out = document.getElementById("logOut")
out.onclick = () => {
    logout();
}
