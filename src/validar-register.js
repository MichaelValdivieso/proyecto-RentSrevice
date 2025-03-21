//cimport { CajasModales } from "./funciones-cajas.js";
import { User } from "./User.js";


//  const clearInputs = () => {
//   document.getElementById('email').value = '';
//   document.getElementById('password').value = '';
//   document.getElementById('pass_confirm').value = '';
//   document.getElementById('fName').value = '';
//   document.getElementById('lName').value = '';
//   document.getElementById('birthDate').value = '';
//  }

  // // Caja modal - Datos incompletos 
  // const mostrarMensaje2 = () => {
  // document.getElementById('miModal2').style.display = 'block';
  // }
  // const cerrarMensaje2 = () => {
  // document.getElementById('miModal2').style.display = 'none';
  // }
  
  

  // LLamada a función validRegister
  const btnValReg = document.getElementById("btnRegist");
  btnValReg.onclick = () => {
    validRegister();
  }

  const btnValCan = document.getElementById("btnCancel");
  btnValCan.onclick = () => {
     cancelar();
  }


 const validRegister = () => {

  let emailInput = document.getElementById('email').value;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let validEmail = emailRegex.test(emailInput);

  let passwdInput = document.getElementById('password').value;
  let passConfInput = document.getElementById('pass_confirm').value;
  let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

  let validPassw = pwdRegex.test(passwdInput);
  
  let validPassConf = (passConfInput === passwdInput);

  let fnameInput = document.getElementById('firstName').value;
  let nameRegex = /^[a-zA-Z]{3,}$/;
  let validName = nameRegex.test(fnameInput);

  let lnameInput = document.getElementById('lastName').value;
  let validApellido = nameRegex.test(lnameInput);

  let birthDateInput = document.getElementById('birthDate').value;
  let year = new Date (birthDateInput).getFullYear();
  let actual = new Date().getFullYear();
  let edad = actual - year;
  let edadVal = ( edad >= 18 && edad <= 120) ? true : false;
  
  console.log(validEmail, validPassw, validPassConf, validName, validApellido, edadVal)

  if (validEmail && validPassw && validPassConf && validName && validApellido && edadVal) {
  
    let newUser = new User(emailInput, passwdInput, fnameInput, lnameInput, birthDateInput);
    let usuarios = JSON.parse(localStorage.getItem('userList')) || [];
    usuarios.push(newUser);
    localStorage.setItem('userList', JSON.stringify(usuarios));

    alert("Datos correctos, usuario registrado, ingrese nuevamente");
    // mostrarMensaje1();
    // cerrarMensaje1();
    location.href = "./login-rentease.html";    
  } else {
    alert("Datos incompletos");
    // mostrarMensaje2();
    // cerrarMensaje2();
    location.href = "./register-rentease.html";
  } 
}

const cancelar = () => {
location.href = "./register-rentease.html";
// logout();
}