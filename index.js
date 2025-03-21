 getUsers=()=> {
    return JSON.parse(localStorage.getItem("userList")) || [];
}
login=()=> {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    let users = getUsers();

    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        const loginTime = new Date().getTime();
        localStorage.setItem("loggedInUser", JSON.stringify(user)); 
        localStorage.setItem("loginTime", loginTime);
        
        window.location.href = "home.html";
        //alert("Login exitoso.");
        //mostrarMensajeIngreso();
       
        
    } else {
      //  alert("Email o contraseña incorrectos.");
        mostrarMensajeNoInicio();
    }
}

logout=()=> {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loginTime");
    document.getElementById("status").textContent = "No has iniciado sesión.";
    //alert("Sesión cerrada.");
    mostrarMensajeOut();
    window.location.href = "login.html"; // Redirigir al login
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





mostrarMensajeNoInicio = () => {
    document.getElementById('miModalNoInicio').style.display = 'block';
}
cerrarMensajeNoInicio = () => {
    document.getElementById('miModalNoInicio').style.display = 'none';
}
mostrarMensajeOut = () => {
    document.getElementById('miModalOut').style.display = 'block';
}
cerrarMensajeOut = () => {
    document.getElementById('miModalOut').style.display = 'none';
}
let btnSing = document.getElementById("btnIngreso");

btnSing.onclick = () => { 
    login();
}

