//cimport { CajasModales } from "./funciones-cajas.js";
import { User } from "./User.js";


// Caja  modal 1 - No cumple la edad permitida (18-120 años) 
const mostrarMensaje1 = () => {
  document.getElementById('miModal1').style.display = 'block';
}
const cerrarMensaje1 = () => {
  document.getElementById('miModal1').style.display = 'none';
}

// Caja  modal 2 - Datos correctos, usuario registrado
// Realice su ingreso por la pantalla de LOGIN
const mostrarMensaje2 = () => {
  document.getElementById('miModal2').style.display = 'block';
}
const cerrarMensaje2 = () => {
  document.getElementById('miModal2').style.display = 'none';
}

// Caja modal 3 - Datos incompletos, digite nuevamente
const mostrarMensaje3 = () => {
  document.getElementById('miModal3').style.display = 'block';
}
const cerrarMensaje3 = () => {
  document.getElementById('miModal3').style.display = 'none';
}


// LLamada a función validRegister
const btnValReg = document.getElementById("btnRegist");
btnValReg.onclick = () => {
  validRegister();
}

// Llamada a función cancelar
const btnValCan = document.getElementById("btnCancel");
btnValCan.onclick = () => {
  cancelar();
}


const validRegister = () => {

  let emailInput = document.getElementById('email').value;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let validEmail = emailRegex.test(emailInput);
  //console.log("validEmail : " + validEmail);
  if(!validEmail) {
    alert("El email no cumple con el formato");
    location.href = "./register-rentease.html";
  }

  let passwdInput = document.getElementById('password').value;
  let passConfInput = document.getElementById('pass_confirm').value;
  let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

  let validPassw = pwdRegex.test(passwdInput);
  // console.log("validPassw : "  + validPassw);
  if (!validPassw) {
    alert("Password no cumple el formato");
  }

  let validPassConf = (passConfInput === passwdInput);
  // console.log("validPassConf : " + validPassConf);
  if (!validPassConf) {
    alert("Password no confirmada");
  }

  let fnameInput = document.getElementById('firstName').value;
  let nameRegex = /^[a-zA-Z]{2,}$/;
  let validName = nameRegex.test(fnameInput);
  // console.log("validName : " + validName);
  if (!validName) {
    alert("El primer nombre no cumple el formato");
  }

  let lnameInput = document.getElementById('lastName').value;
  let validApellido = nameRegex.test(lnameInput);
  // console.log("validApellido : " + validApellido);
  if (!validApellido) {
    alert("El apellido no cumple con el formato");
  }

  let birthDateInput = document.getElementById('birthDate').value;
  console.log("birthDateInput : " + birthDateInput);

  let a = new Date(birthDateInput);
  let yearInput = a.getFullYear();
  console.log("yearInput : " + yearInput)

  const d = new Date();
  let yearNow = d.getFullYear();
  console.log("yearNow : " + yearNow);

  let edad = yearNow - yearInput - 1;
  console.log("edad : " + edad);

  let edadVal = (edad >= 18 && edad <= 120) ? true : false;
  console.log("edadVal : " + edadVal);
  if(!edadVal) {
  alert("No cumple la edad permitida (18-120 años)");
  }
  // mostrarMensaje1();
  // cerrarMensaje1();
  
  console.log(validEmail, validPassw, validPassConf, validName, validApellido, edadVal)

  if (validEmail && validPassw && validPassConf && validName && validApellido && edadVal) {

    let newUser = new User(emailInput, passwdInput, fnameInput, lnameInput, birthDateInput);
    let usuarios = JSON.parse(localStorage.getItem('userList')) || [];
    usuarios.push(newUser);
    localStorage.setItem('userList', JSON.stringify(usuarios));

    // console.log("Datos correctos, usuario registrado, ingrese nuevamente");
    alert("Datos correctos, usuario registrado, Realice su ingreso por la pantalla de LOGIN");
    // mostrarMensaje2();
    // cerrarMensaje2();
    location.href = "./login-rentease.html";

  } else {
    alert("Datos o formatos no cumplidos, digite nuevamente");
    // mostrarMensaje3();
    // cerrarMensaje3();
    location.href = "./register-rentease.html";
  }
}

const cancelar = () => {
  location.href = "./register-rentease.html";
}