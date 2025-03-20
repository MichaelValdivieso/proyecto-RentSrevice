// import { CajasModales } from "./funciones-cajas.js";
// CajasModales()


// Caja modal - El correo electrónico no es válido 
const mostrarMensaje1 = () => {
document.getElementById('miModal1').style.display = 'block';
}
const cerrarMensaje1 = () => {
document.getElementById('miModal1').style.display = 'none';
}

// Caja modal - La contrasena no es válida 
const mostrarMensaje2 = () => {
document.getElementById('miModal2').style.display = 'block';
}
const cerrarMensaje2 = () => {
document.getElementById('miModal2').style.display = 'none';
}

// Caja modal - Parámetros de email/password no cumplen el formato 
const mostrarMensaje3 = () => {
document.getElementById('miModal3').style.display = 'block';
}
const cerrarMensaje3 = () => {
document.getElementById('miModal3').style.display = 'none';
}

// // Caja modal - Usuario no registrado, presione la tecla REGISTER
const mostrarMensaje4 = () => {
document.getElementById('miModal4').style.display = 'block';
}
const cerrarMensaje4 = () => {
document.getElementById('miModal4').style.display = 'none';
}

// Caja modal - Usuario está registrado - se dirigirá a la pñagina HOME
const mostrarMensaje5 = () => {
document.getElementById('miModal5').style.display = 'block';
}
const cerrarMensaje5 = () => {
document.getElementById('miModal5').style.display = 'none';
}



// Inicialización de la función validarLogin() 

const btnValLog = document.getElementById("btnLogin");
btnValLog.onclick = () => {
  validarLogin();
}

// const clearInputs = () => {
//   document.getElementById('email').value = '';
//   document.getElementById('password').value = '';
// }

const validarLogin = () => {

  setTimeout(() => {
    alert("El tiempo de login ha excedido 60 minutos, vuelva a ingresar a la aplicación");
    logOut();
   }, 3600000);

  let emailInput = document.getElementById("email").value;
  console.log(emailInput);
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let validEmail = emailRegex.test(emailInput);
  if (!validEmail) {
    alert("El correo electrónico no es válido");
    // mostrarMensaje1();
    // cerrarMensaje1();
  }

  let passInput = document.getElementById("password").value;
  console.log(passInput);
  let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
  let validPassw = pwdRegex.test(passInput);
  if (!validPassw) {
    alert("La contrasena no es válida, debe tener por lo menos una letra mayúscula, una minúscula, un número, y un caracter especial");
    // mostrarMensaje2();
    // cerrarMensaje2();
  }

  // Verificar Si el email y password cumplen las condicionesw

  if (!validEmail || !validPassw) {
    // console.log("No se cumplieron los formatos de email o password");
    // alert("No se cumplieron los formatos de email o password")
    // mostrarMensaje3();
    // cerrarMensaje3();
    location.href = "./login-rentease.html"

  } else {

    // VerifySession
    // Verificar si está registrado en el Local Storage
    let usuarios = JSON.parse(localStorage.getItem('userList'));
    console.log(usuarios);
    
    let objFinded = usuarios.find((usuario) => usuario.email === emailInput);
    console.log(objFinded);
    
    if (objFinded === undefined) {
    alert("usuario no registrado, presione el boton REGISTER");
    // mostrarMensaje4();
    // cerrarMensaje4();
      location.href = "./register-rentease.html";

    } else {
      // El usuario esta registrado en la localStorage
      // Chequear la password ingresada con la password de la localStorage
      const userKeys = Object.keys(objFinded);
      console.log(userKeys);

      const userValues = Object.values(objFinded);
      console.log(userValues);

      console.log(userValues[0]); // email
      console.log(userValues[1]); // password  

      // Verificar la password del usuario registrado

      if (passInput === userValues[1]) {
        alert("El usuario consta registrado, debe ir a la pantalla HOME");
        // mostrarMensaje5();
        // cerrarMensaje5();

        // Redirigir a la pantalla HOME
        location.href = "./home.html";

      } else {
        alert("No coincide con la password registrada, vuelva a ingresar");
        // mostrarMensajes2();
        // cerrarMensaje2();
        location.href = "./login-rentease.html"
      }
    }
  }
}





