const ICON_PATHS = {
	open: "/icons/eyes/eye.svg",
	closed: "/icons/eyes/eye-off.svg",
};

const pwInput = document.querySelector("#passwordInput");
const pwVisibilityBtn = document.querySelector(".pw-visibility-btn");
const eyeImg = pwVisibilityBtn.querySelector("img");

const handlePwVisibilityToggle = () => {
	if (pwInput.type === "password") {
		pwInput.type = "text";
		eyeImg.src = ICON_PATHS.open;
	} else {
		pwInput.type = "password";
		eyeImg.src = ICON_PATHS.closed;
	}
};

pwVisibilityBtn.addEventListener("click", handlePwVisibilityToggle);
