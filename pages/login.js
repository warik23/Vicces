import { getUsers, setPlaceName, updateMenu } from "../main.js";

export const login = (name, pass) => {
    console.log("login js");
    const nameInput = document.getElementById("username")
    const passInput = document.getElementById("password")
    const signinButton = document.getElementById("signin")

	passInput.addEventListener("input", checkAuth)
	nameInput.addEventListener("input", checkAuth)
	nameInput.addEventListener("focus", () => nameInput.classList.remove("text-red-500"))
	signinButton.addEventListener("click", signIn)

	nameInput.value = name
	passInput.value = pass

    function checkAuth() {
		if (passInput.value.length >= 8 && nameInput.value.trim() != "") signinButton.disabled = false
		else signinButton.disabled = true
    }

	function signIn() {
		let user = getUserByName(nameInput.value)
		if (user) {
			localStorage.setItem("currentUser", user["username"])
			updateMenu()
			window.location.hash = "";
			setPlaceName("")
		}
	}

	function getUserByName(name) {
		let users = getUsers()
		return users.find((e) => e["username"] == name)
	}
}