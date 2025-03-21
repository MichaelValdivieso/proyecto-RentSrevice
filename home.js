
let properties = JSON.parse(localStorage.getItem('flatList')) || [];
/* [
    { City: "Quito", Street: "Av. Amazonas", StreetNumber: 10, AreaSize: 80, HasAC: true, YearBuilt: 2015, RentPrice: 120, DateAvailable: "2024-01-10", Favorite: false },
    { City: "Guayaquil", Street: "Av. Barcelona", StreetNumber: 5, AreaSize: 300, HasAC: false, YearBuilt: 2010, RentPrice: 180, DateAvailable: "2024-02-20", Favorite: true },
    { City: "Cuenca", Street: "Calle Larga", StreetNumber: 15, AreaSize: 600, HasAC: true, YearBuilt: 2005, RentPrice: 250, DateAvailable: "2024-03-15", Favorite: false }
]; */
console.log(properties);
filtrarTabla = () => {
    cityFilter = document.getElementById('filterCity').value.toLowerCase();
    priceRange = document.getElementById('priceRange').value;
    sizeRange = document.getElementById('sizeRange').value;
    showFavorites = document.getElementById('showFavorites').checked;

    let filteredProperties = properties.filter(prop => {
        let priceValid = true;
        let sizeValid = true;

        if (priceRange) {
            let [min, max] = priceRange.split('-');
            if (max) {
                priceValid = prop.RentPrice >= parseInt(min) && prop.RentPrice <= parseInt(max);
            } else {
                priceValid = prop.RentPrice > parseInt(min);
            }
        }

        if (sizeRange) {
            let [min, max] = sizeRange.split('-');
            if (max) {
                sizeValid = prop.AreaSize >= parseInt(min) && prop.AreaSize <= parseInt(max);
            } else {
                sizeValid = prop.AreaSize > parseInt(min);
            }
        }

        return (!showFavorites || prop.Favorite) &&
            (cityFilter === '' || prop.City.toLowerCase().includes(cityFilter)) &&
            priceValid && sizeValid;
    });

    cargarTabla(filteredProperties);
}

capitalizarPrimeraLetra = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

cargarTabla = (data = properties) => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach((prop) => {
        let icon = prop.Favorite ? '<img class="heard" src="./Img/rojo.png" />' : '<img class="heard" src="./Img/blanco.png" />';
        let row = `<tr>
                    <td>${capitalizarPrimeraLetra(prop.City)}</td>
                    <td>${capitalizarPrimeraLetra(prop.Street)}</td>
                    <td>${prop.StreetNumber}</td>
                    <td>${prop.AreaSize}</td>
                    <td>${capitalizarPrimeraLetra(prop.HasAC)}</td>
                    <td>${prop.YearBuilt}</td>
                    <td>${prop.RentPrice}</td>
                    <td>${prop.DateAvailable}</td>
                    <td><button class="fvIc" onclick="selecFavoritos('${prop.City}', '${prop.Street}', ${prop.StreetNumber})">${icon}</button></td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}

selecFavoritos = (City, Street, StreetNumber) => {
    let property = properties.find(p => p.City === City && p.Street === Street && p.StreetNumber === StreetNumber);
    if (property) {
        property.Favorite = !property.Favorite;
    }
    filtrarTabla();
}

ordenarTabla = (property) => {
    properties.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    filtrarTabla();
}

filtrarTabla();

validarTexto=(input)=> {

    const regex = /^[A-Za-zÑñ\s]+$/;

    if (!regex.test(input.value)) {
        console.log("Solo se permiten letras y espacios.");
        input.value = ''; // Limpiar el campo si no es válido
    }
}


function showUserName() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))||[];
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


const btnFlat = document.getElementById("btnNewFlat");
btnFlat.addEventListener("click", () => {
    location.href = "newFlat.html";
});

let update = document.getElementById("update")
update.onclick = () => { 

    location.href = "update.html";
}

let out = document.getElementById("logOut")
out.onclick = () => { 
    logout();
}
