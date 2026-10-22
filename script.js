const serverStats = {
    name: "HostNode PaperMC",
    version: "1.21",
    playersOnline: 8,
    maxPlayers: 20,
    getStatus: function () {
        return `${this.name} (${this.version}) - ${this.playersOnline}/${this.maxPlayers} players online.`;
    }
};
const normalSound = new Audio("audio/click.wav");
const secretSound = new Audio("audio/click1.mp3");

function playClickSound() {
    if (Math.random() < 0.1) {
        secretSound.currentTime = 0;
        secretSound.play();
    } else {
        normalSound.currentTime = 0;
        normalSound.play();
    }
}
function animateButton(btn) {
    if (!btn) return;
    btn.classList.add("btn-pressed");
    setTimeout(() => btn.classList.remove("btn-pressed"), 150);
}
const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", function () {
        playClickSound();
        animateButton(readMoreBtn);
        if (moreText.style.display === "none") {
            moreText.style.display = "block";
            readMoreBtn.textContent = "Show Less";
        } else {
            moreText.style.display = "none";
            readMoreBtn.textContent = "Read More";
        }
    });
}
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "b":
        case "B":
            toggleBackground();
            break;

        case "Escape":
            if (popupOverlay) {
                popupOverlay.style.display = "none";
            }
            break;

        case "s":
        case "S":
            if (popupOverlay) {
                popupOverlay.style.display = "flex";
                playClickSound();
            }
            break;
    }
});
const bgColorBtn = document.getElementById("bgColorBtn");
let isAlternateBg = false;

function toggleBackground() {
    isAlternateBg = !isAlternateBg;
    if (isAlternateBg) {
        document.body.style.backgroundImage = "url('images/fon_grey.png')";
    } else {
        document.body.style.backgroundImage = "url('images/fon.png')";
    }
}

if (bgColorBtn) {
    bgColorBtn.addEventListener("click", function () {
        playClickSound();
        animateButton(bgColorBtn);
        toggleBackground();
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
        playClickSound();
        animateButton(openPopupBtn);
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
        playClickSound();
        const answer = this.nextElementSibling;
        answer.classList.toggle("open");
    });
}

const supportForm = document.getElementById("supportForm");
const resetFormBtn = document.getElementById("resetFormBtn");

if (resetFormBtn) {
    resetFormBtn.addEventListener("click", function () {
        playClickSound();
        animateButton(resetFormBtn);
        
        const allInputs = document.querySelectorAll("#supportForm input, #supportForm textarea");
        allInputs.forEach(input => {
            input.value = "";
        });

        const allErrors = document.querySelectorAll("#supportForm small, #formSuccess");
        allErrors.forEach(err => {
            err.textContent = "";
        });
    });
}

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
            emailError.textContent = "Please enter a valid email (must contain @ and .)";
            isValid = false;
        }
        if (password === "") {
            passwordError.textContent = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long";
            isValid = false;
        }
        if (confirmPassword === "") {
            confirmPasswordError.textContent = "Please confirm your password";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match";
            isValid = false;
        }
        if (message === "") {
            messageError.textContent = "Please enter your question or error log";
            isValid = false;
        }
        if (isValid) {
            playClickSound();
            formSuccess.textContent = "Form submitted successfully! All fields are valid";
            supportForm.reset();
        }
    });
}