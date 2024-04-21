import { getCurrentUserData, getUsers } from "../main.js"

export const upload = () => {
	let customJoke = document.getElementById("customjoke").value

	document.getElementById("customjoke").addEventListener("input", () => {
		customJoke = document.getElementById("customjoke").value
		document.getElementById("submit").disabled = customJoke.trim() == ""
	})

	document.getElementById("submit").addEventListener("click", () => {
		if (getCurrentUserData()) {
			let users = getUsers()
			users.forEach(e => { if (e["name"] == getCurrentUserData()["name"]) e["uploaded"].push(customJoke) })
			document.getElementById("customjoke").value = ""
			localStorage.setItem("users", JSON.stringify(users));
		}
	})
}