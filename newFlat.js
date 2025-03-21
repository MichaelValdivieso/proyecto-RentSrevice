class flat {

    City;// String
    Street;// name String
    StreetNumber;// Number
    AreaSize;// Number
    HasAC;// Boolean
    YearBuilt;// Number
    RentPrice;// Nu;//mber
    DateAvailable;// Date
    Favorite;//favorito

    constructor(city, street, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable, favorite) {
        this.City = city;
        this.Street = street;
        this.StreetNumber = streetNumber;
        this.AreaSize = areaSize;
        this.HasAC = hasAC;
        this.YearBuilt = yearBuilt;
        this.RentPrice = rentPrice;
        this.DateAvailable = dateAvailable;
        this.Favorite = favorite;

    }

}


let propiedades = [];

const saveFlat = () => {
    // Crear un nuevo objeto flat con los valores del formulario
    const newFlat = new flat(
        document.getElementById('city').value,
        document.getElementById('street').value,
        parseInt(document.getElementById('number').value),
        parseInt(document.getElementById('size').value),
        document.getElementById('ac').value,
        parseInt(document.getElementById('year').value),
        parseInt(document.getElementById('price').value),
        document.getElementById('date').value,
        true // Estado inicial de 'favorite'
    );

    // Leer las propiedades almacenadas en localStorage (si existen)
    let propiedades = JSON.parse(localStorage.getItem('flatList')) || []; // Si no existe, usar un array vacío

    // Agregar el nuevo flat al array de propiedades
    propiedades.push(newFlat);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('flatList', JSON.stringify(propiedades));
}
const clearInputs = () => {

    document.getElementById('city').value = '';
    document.getElementById('street').value = '';
    document.getElementById('number').value = '';
    document.getElementById('size').value = '';
    document.getElementById('ac').value = '';
    document.getElementById('year').value = '';
    document.getElementById('price').value = '';
    document.getElementById('date').value = '';
}


validarTexto = (input) => {
    
    const text = /^[A-Za-zÑñ\s]+$/;
    if (!text.test(input.value)) {
        console.log("Solo se permiten letras y espacios.");
        input.value = ''; 
    }
}

validarNumeros = (input) => { 
    input.value = input.value.replace(/[^0-9]/g, '')
}

mostrarMensaje=()=> {
    document.getElementById('miModal').style.display = 'block';
}
cerrarMensaje=()=> {
    document.getElementById('miModal').style.display = 'none';
}

mostrarMensajeError = () => { 
    document.getElementById('miModalError').style.display = 'block';
}
cerrarMensajeError = () => {
    document.getElementById('miModalError').style.display = 'none';
}
mostrarMensajeCancel = () => {
    document.getElementById('miModalCancel').style.display = 'block';
}
cerrarMensajeCancel = () => {
    document.getElementById('miModalCancel').style.display = 'none';
}





const valueInput = () => {

    if (
        (document.getElementById('city').value == "") ||
        (document.getElementById('street').value == "") ||
        (document.getElementById('number').value == "") ||
        (document.getElementById('size').value == "")   ||
        (document.getElementById('ac').value == "")     ||
        (document.getElementById('year').value == "")   ||
        (document.getElementById('price').value == "")  ||
        (document.getElementById('date').value == "")
    ) {

        console.log("faltan datos por ingresar ");
        mostrarMensajeError()
       // clearInputs();
    } else {

        saveFlat();
        mostrarMensaje();
        clearInputs();
    }
}

function showUserName() {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    if (user) {
        document.getElementById("userActivo").textContent = `${user.firstName + " " + user.lastName}`;
        console.log(checkSession());
    } else {
        alert("No hay sesión activa. Redirigiendo al login...");
        window.location.href = "login.html";
    }
}
mostrarMensajeOut = () => {
    document.getElementById('miModalOut').style.display = 'block';
}
cerrarMensajeOut = () => {
    document.getElementById('miModalOut').style.display = 'none';
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
window.onload = showUserName();
window.onload = checkSession();


const btnAceptar = document.getElementById("btnSave");

btnAceptar.onclick = () => {
    valueInput();
}

const btnHome = document.getElementById("home");

btnHome.onclick = () => { 
    location.href = "home.html";
}

const btnCancel = document.getElementById("btnCancel");

btnCancel.onclick = () => { 
    mostrarMensajeCancel();
    clearInputs();
}
let update = document.getElementById("update")
update.onclick = () => {
    location.href = "update.html";
}

let out = document.getElementById("logOut")
out.onclick = () => {
    logout();
}










