export const register = () => {
	console.log("register js");

	const nameInput = document.getElementById("username");
	const passInput = document.getElementById("password");
	const pass2Input = document.getElementById("password2");
	const signupButton = document.getElementById("signup");

	passInput.addEventListener("input", checkAuth)
	pass2Input.addEventListener("input", checkAuth)
    nameInput.addEventListener("input", checkAuth)
    nameInput.addEventListener("focus", () => nameInput.classList.remove("text-red-500"))
	signupButton.addEventListener("click", signUp)

	function signUp() {
		let username = nameInput.value;
		let password = passInput.value;

		if (isUsernameExists(username)) {
			nameInput.classList.add("text-red-500");
			return;
		}
		let users = JSON.parse(localStorage.getItem("users")) || [];
		console.log(users);
		users.push({
			username,
			password,
			favorites: [],
			uploaded: [],
		});
		localStorage.setItem("users", JSON.stringify(users));
		window.location.hash = "#/login";
	}

	function isUsernameExists(name) {
		let users = JSON.parse(localStorage.getItem('users')) || []
		return users.some((e) => e["username"] == name)
	}

	function checkAuth() {
		if (passInput.value == pass2Input.value && passInput.value.length >= 8 && nameInput.value.trim() != "") signupButton.disabled = false
		else signupButton.disabled = true
    }
};
