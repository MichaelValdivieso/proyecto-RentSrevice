export class User {
  
  email; //string
  password; //string password
  firstName; //string
  lastName; // string
  birthDay; //date

  constructor( email, password, firstName, lastName, birthDay) {
   
  this.email = email;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDay = birthDay;
  
  }

}


