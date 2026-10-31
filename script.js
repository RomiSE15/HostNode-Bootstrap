$(document).ready(function () {
    console.log("jQuery is ready!");

    const normalSound = new Audio("audio/click.wav");
    const secretSound = new Audio("audio/click1.mp3");

    function playClickSound() {
        if (Math.random() < 0.1) {
            secretSound.currentTime = 0;
            secretSound.play().catch(function () {});
        } else {
            normalSound.currentTime = 0;
            normalSound.play().catch(function () {});
        }
    }
    function showToast(message) {
        let $toast = $("#toastNotification");
        if ($toast.length === 0) {
            $toast = $('<div id="toastNotification" class="custom-toast"></div>').appendTo("body");
        }
        $toast.text(message).stop(true, true).fadeIn(300).delay(2500).fadeOut(400);
    }

    if ($("#scrollBar").length === 0) {
        $("body").prepend('<div id="scrollBar"></div>');
    }

    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        if (docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            $("#scrollBar").css("width", scrollPercent + "%");
        }
    });

    const pluginDatabase = ["EssentialsX", "LuckPerms", "WorldEdit", "PaperMC", "Purpur", "Spigot"];

    $("#pluginSearch").on("keyup", function () {
        const query = $(this).val().trim();
        const lowerQuery = query.toLowerCase();

        $(".plugin-card").each(function () {
            const $card = $(this);
            const $title = $card.find(".card-title");
            
            if (!$title.data("original-text")) {
                $title.data("original-text", $title.text());
            }
            const originalText = $title.data("original-text");

            if (lowerQuery === "") {
                $card.show();
                $title.text(originalText);
            } else if (originalText.toLowerCase().includes(lowerQuery)) {
                $card.show();
                const regex = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
                const highlighted = originalText.replace(regex, '<span class="search-highlight">$1</span>');
                $title.html(highlighted);
            } else {
                $card.hide();
            }
        });

        const $suggestions = $("#searchSuggestions").empty();
        if (query.length > 0) {
            const matches = pluginDatabase.filter(function (item) {
                return item.toLowerCase().includes(lowerQuery);
            });

            if (matches.length > 0) {
                matches.forEach(function (item) {
                    $suggestions.append('<div class="list-group-item list-group-item-action suggestion-item">' + item + "</div>");
                });
                $suggestions.fadeIn(150);
            } else {
                $suggestions.hide();
            }
        } else {
            $suggestions.hide();
        }
    });

    $(document).on("click", ".suggestion-item", function () {
        const selectedText = $(this).text();
        $("#pluginSearch").val(selectedText).trigger("keyup");
        $("#searchSuggestions").hide();
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest("#pluginSearch, #searchSuggestions").length) {
            $("#searchSuggestions").hide();
        }
    });

    let countersStarted = false;

    function runCounters() {
        $(".counter").each(function () {
            const $this = $(this);
            const target = parseInt($this.attr("data-target"), 10);

            $({ countNum: 0 }).animate(
                { countNum: target },
                {
                    duration: 1800,
                    easing: "swing",
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                }
            );
        });
    }

    if ($(".counter").length > 0) {
        function checkCounterVisibility() {
            if (countersStarted) return;
            const counterTop = $(".counter").first().offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > counterTop) {
                countersStarted = true;
                runCounters();
            }
        }
        $(window).on("scroll", checkCounterVisibility);
        checkCounterVisibility();
    }

    $("#copyScriptBtn").on("click", function () {
        playClickSound();
        const codeText = $("#runScriptCode").text();
        const $btn = $(this);
        const originalHtml = $btn.html();

        navigator.clipboard.writeText(codeText).then(function () {
            $btn.html("Copied to clipboard").removeClass("btn-outline-warning").addClass("btn-success");
            showToast("Command copied to clipboard");

            setTimeout(function () {
                $btn.html(originalHtml).removeClass("btn-success").addClass("btn-outline-warning");
            }, 2000);
        });
    });

    function lazyLoadImages() {
        $("img[data-src]").each(function () {
            const $img = $(this);
            const imgTop = $img.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > imgTop - 50) {
                $img.attr("src", $img.attr("data-src"));
                $img.removeAttr("data-src");
            }
        });
    }

    $(window).on("scroll", lazyLoadImages);
    lazyLoadImages();

    $("#readMoreBtn").on("click", function () {
        playClickSound();
        const $moreText = $("#moreText");
        if ($moreText.is(":visible")) {
            $moreText.slideUp(200);
            $(this).text("Read More");
        } else {
            $moreText.slideDown(200);
            $(this).text("Show Less");
        }
    });

    $(document).on("keydown", function (event) {
        switch (event.key) {
            case "b":
            case "B":
                toggleBackground();
                break;
            case "Escape":
                $("#popupOverlay").fadeOut(200);
                break;
            case "s":
            case "S":
                $("#popupOverlay").fadeIn(200).css("display", "flex");
                playClickSound();
                break;
        }
    });

    let isAlternateBg = false;
    function toggleBackground() {
        isAlternateBg = !isAlternateBg;
        $("body").css(
            "background-image",
            isAlternateBg ? "url('images/fon_grey.png')" : "url('images/fon.png')"
        );
    }

    $("#bgColorBtn").on("click", function () {
        playClickSound();
        toggleBackground();
    });
    $(".faq-question").on("click", function () {
        playClickSound();
        $(this).next(".faq-answer").slideToggle(250);
    });

    $("#openPopupBtn").on("click", function () {
        playClickSound();
        $("#popupOverlay").fadeIn(200).css("display", "flex");
    });

    $("#closePopupBtn").on("click", function () {
        $("#popupOverlay").fadeOut(200);
        $("#popupMessage").text("");
    });

    $("#popupOverlay").on("click", function (event) {
        if (event.target === this) {
            $("#popupOverlay").fadeOut(200);
            $("#popupMessage").text("");
        }
    });

    $("#popupForm").on("submit", function (event) {
        event.preventDefault();
        const subEmail = $("#subEmail").val().trim();
        if (subEmail === "" || !subEmail.includes("@")) {
            $("#popupMessage").css("color", "#ff6b6b").text("Please enter a valid email address!");
        } else {
            $("#popupMessage").css("color", "#2ecc71").text("Thank you for subscribing!");
            showToast("Subscribed successfully!");
            $("#subEmail").val("");
        }
    });

    $("#resetFormBtn").on("click", function () {
        playClickSound();
        $("#supportForm")[0].reset();
        $("#supportForm small").text("");
        $("#formSuccess").text("");
    });

    $("#supportForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#userName").val().trim();
        const email = $("#userEmail").val().trim();
        const password = $("#userPassword").val();
        const confirmPassword = $("#confirmPassword").val();
        const message = $("#userMessage").val().trim();

        $("#nameError, #emailError, #passwordError, #confirmPasswordError, #messageError, #formSuccess").text("");

        let isValid = true;

        if (name === "") {
            $("#nameError").text("Name is required.");
            isValid = false;
        }
        if (email === "") {
            $("#emailError").text("Email is required.");
            isValid = false;
        } else if (!email.includes("@") || !email.includes(".")) {
            $("#emailError").text("Please enter a valid email (must contain @ and .)");
            isValid = false;
        }
        if (password === "") {
            $("#passwordError").text("Password is required");
            isValid = false;
        } else if (password.length < 6) {
            $("#passwordError").text("Password must be at least 6 characters long");
            isValid = false;
        }
        if (confirmPassword === "") {
            $("#confirmPasswordError").text("Please confirm your password");
            isValid = false;
        } else if (password !== confirmPassword) {
            $("#confirmPasswordError").text("Passwords do not match");
            isValid = false;
        }
        if (message === "") {
            $("#messageError").text("Please enter your question or error log");
            isValid = false;
        }

        if (isValid) {
            playClickSound();
            const $submitBtn = $("#supportForm button[type='submit']");
            const originalBtnHtml = $submitBtn.html();

            // Task 6: Loading spinner on submit
            $submitBtn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Please wait...');

            setTimeout(function () {
                $submitBtn.prop("disabled", false).html(originalBtnHtml);
                $("#formSuccess").text("Form submitted successfully! All fields are valid");
                showToast("Support ticket successfully submitted!");
                $("#supportForm")[0].reset();
            }, 1500);
        }
    });
    function updateDateTime() {
        const dateTimeBlock = $("#currentDateTime");
        if (dateTimeBlock.length > 0) {
            const now = new Date();
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            };
            dateTimeBlock.text("Current Date & Time: " + now.toLocaleString("en-US", options));
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
});