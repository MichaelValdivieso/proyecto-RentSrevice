document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout");
    const userDisplay = document.getElementById("user");
    const updateForm = document.getElementById("update-form");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const firstName = document.getElementById("first-name");
            const lastName = document.getElementById("last-name");
            const birthDate = document.getElementById("birth-date");

            if (!validateRegister(email.value, password.value, firstName.value, lastName.value, birthDate.value)) {
                alert("Datos inválidos. Verifica e intenta de nuevo.");
                return;
            }

            const user = { email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value, birthDate: birthDate.value };
            let users = JSON.parse(localStorage.getItem("userList")) || [];
            users.push(user);
            localStorage.setItem("userList", JSON.stringify(users));

            alert("Registro exitoso! Ahora puedes iniciar sesión.");
            registerForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const users = JSON.parse(localStorage.getItem("userList")) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                sessionStorage.setItem("loginTime", Date.now());
                window.location.href = "home.html";
            } else {
                alert("Credenciales incorrectas.");
            }document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout");
    const userDisplay = document.getElementById("user");
    const updateForm = document.getElementById("update-form");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const firstName = document.getElementById("first-name");
            const lastName = document.getElementById("last-name");
            const birthDate = document.getElementById("birth-date");
            
            if (!validateRegister(email.value, password.value, firstName.value, lastName.value, birthDate.value)) {
                alert("Datos inválidos. Verifica e intenta de nuevo.");
                return;
            }
            
            const user = { 
                email: email.value.trim(), 
                password: password.value.trim(), 
                firstName: firstName.value.trim(), 
                lastName: lastName.value.trim(), 
                birthDate: birthDate.value.trim()
            };
            
            let users = JSON.parse(localStorage.getItem("userList")) || [];
            users.push(user);
            localStorage.setItem("userList", JSON.stringify(users));
            
            alert("Registro exitoso! Ahora puedes iniciar sesión.");
            registerForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e)=> {
            e.preventDefault();
            
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();
            
            const users = JSON.parse(localStorage.getItem("userList")) || [];
            console.log("Usuarios en localStorage:", users);
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                sessionStorage.setItem("loginTime", Date.now());
                window.location.href = "home.html";
            } else {
                alert("Credenciales incorrectas.");
            }
        });
    }

    if (userDisplay && logoutBtn) {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const loginTime = sessionStorage.getItem("loginTime");
        
        if (user && loginTime) {
            const elapsedTime = (Date.now() - parseInt(loginTime)) / (1000 * 60);
            if (elapsedTime >= 60) {
                sessionStorage.clear();
                window.location.href = "login.html";
            } else {
                userDisplay.textContent = `Bienvenido, ${user.firstName} ${user.lastName}`;
                document.getElementById("update-first-name").value = user.firstName;
                document.getElementById("update-last-name").value = user.lastName;
            }
        } else {
            window.location.href = "login.html";
        }
        
        logoutBtn.addEventListener("click", function () {
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    }

    if (updateForm) {
        updateForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const updatedFirstName = document.getElementById("update-first-name").value.trim();
            const updatedLastName = document.getElementById("update-last-name").value.trim();
            
            let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
            if (user) {
                user.firstName = updatedFirstName;
                user.lastName = updatedLastName;
                
                let users = JSON.parse(localStorage.getItem("userList")) || [];
                users = users.map(u => u.email === user.email ? user : u);
                localStorage.setItem("userList", JSON.stringify(users));
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                
                userDisplay.textContent = `Bienvenido, ${user.firstName} ${user.lastName}`;
                alert("Perfil actualizado correctamente.");
                location.reload();
            }
        });
    }

    function validateRegister(email, password, firstName, lastName, birthDate) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        return (
            emailPattern.test(email) &&
            passwordPattern.test(password) &&
            firstName.length >= 2 &&
            lastName.length >= 2 &&
            age >= 18 && age <= 120
        );
    }

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("invalid", function () {
            if (!this.validity.valid) {
                this.setCustomValidity("Por favor, completa este campo correctamente.");
            }
        });
        input.addEventListener("input", function () {
            this.setCustomValidity("");
        });
    });
});

        });
    }

    if (userDisplay && logoutBtn) {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const loginTime = sessionStorage.getItem("loginTime");

        if (user && loginTime) {
            const elapsedTime = (Date.now() - parseInt(loginTime)) / (1000 * 60);
            if (elapsedTime >= 60) {
                sessionStorage.clear();
                window.location.href = "login.html";
            } else {
                userDisplay.textContent = `Bienvenido, ${user.firstName} ${user.lastName}`;
                document.getElementById("update-first-name").value = user.firstName;
                document.getElementById("update-last-name").value = user.lastName;
            }
        } else {
            window.location.href = "login.html";
        }

        logoutBtn.addEventListener("click", function () {
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    }

    if (updateForm) {
        updateForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const updatedFirstName = document.getElementById("update-first-name").value;
            const updatedLastName = document.getElementById("update-last-name").value;

            let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
            if (user) {
                user.firstName = updatedFirstName;
                user.lastName = updatedLastName;

                let users = JSON.parse(localStorage.getItem("userList")) || [];
                users = users.map(u => u.email === user.email ? user : u);
                localStorage.setItem("userList", JSON.stringify(users));
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));

                userDisplay.textContent = `Bienvenido, ${user.firstName} ${user.lastName}`;
                alert("Perfil actualizado correctamente.");
                location.reload();
            }
        });
    }

    function validateRegister(email, password, firstName, lastName, birthDate) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        return (
            emailPattern.test(email) &&
            passwordPattern.test(password) &&
            firstName.length >= 2 &&
            lastName.length >= 2 &&
            age >= 18 && age <= 120
        );
    }

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("invalid", function () {
            if (!this.validity.valid) {
                this.setCustomValidity("Por favor, completa este campo correctamente.");
            }
        });
        input.addEventListener("input", function () {
            this.setCustomValidity("");
        });
    });
});
