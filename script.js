const bgColorBtn = document.getElementById("bgColorBtn");
let isAlternateBg = false;

if (bgColorBtn) {
    bgColorBtn.addEventListener("click", function () {
        isAlternateBg = !isAlternateBg; 
        if (isAlternateBg) {
            document.body.style.backgroundImage = "url('images/fon_grey.png')";
        } else {
            document.body.style.backgroundImage = "url('images/fon.png')";
        }
    });
}
function updateDateTime() {
    const dateTimeBlock = document.getElementById("currentDateTime");
    if (dateTimeBlock) {
        const now = new Date();
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };
        dateTimeBlock.textContent = "Current Date & Time: " + now.toLocaleString("en-US", options);
    }
}
updateDateTime();
setInterval(updateDateTime, 1000);
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popupOverlay = document.getElementById("popupOverlay");
const popupForm = document.getElementById("popupForm");
const popupMessage = document.getElementById("popupMessage");

if (openPopupBtn && popupOverlay) {
    openPopupBtn.addEventListener("click", function () {
        popupOverlay.style.display = "flex";
    });

    closePopupBtn.addEventListener("click", function () {
        popupOverlay.style.display = "none";
        popupMessage.textContent = "";
    });

    popupOverlay.addEventListener("click", function (event) {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = "none";
            popupMessage.textContent = "";
        }
    });

    popupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const subEmail = document.getElementById("subEmail").value.trim();
        if (subEmail === "" || !subEmail.includes("@")) {
            popupMessage.style.color = "#ff6b6b";
            popupMessage.textContent = "Please enter a valid email address!";
        } else {
            popupMessage.style.color = "#2ecc71";
            popupMessage.textContent = "Thank you for subscribing!";
            document.getElementById("subEmail").value = "";
        }
    });
}
const faqQuestions = document.querySelectorAll(".faq-question");

for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].addEventListener("click", function () {
        const answer = this.nextElementSibling;
        answer.classList.toggle("open");
    });
}

const supportForm = document.getElementById("supportForm");

if (supportForm) {
    supportForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const password = document.getElementById("userPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("userMessage").value.trim();

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const messageError = document.getElementById("messageError");
        const formSuccess = document.getElementById("formSuccess");

        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        messageError.textContent = "";
        formSuccess.textContent = "";

        let isValid = true;

        if (name === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        }
        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!email.includes("@") || !email.includes(".")) {
            emailError.textContent = "Please enter a valid email (must contain @ and .).";
            isValid = false;
        }
        if (password === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            isValid = false;
        }
        if (confirmPassword === "") {
            confirmPasswordError.textContent = "Please confirm your password.";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match.";
            isValid = false;
        }
        if (message === "") {
            messageError.textContent = "Please enter your question or error log.";
            isValid = false;
        }
        if (isValid) {
            formSuccess.textContent = "Form submitted successfully! All fields are valid.";
            supportForm.reset();
        }
    });
}