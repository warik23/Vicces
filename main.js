export let placeName = ""
export let placePass = ""

export function setPlaceName(name) {
	placeName = name
}

export function getCurrentUserData() {
	let currentUsername = localStorage.getItem("currentUser")
	let users = JSON.parse(localStorage.getItem('users')) || []
	return users.find((e) => e["username"] == currentUsername)
}

updateMenu()

export function updateMenu() {
	if (getCurrentUserData()) {
		document.querySelectorAll(".log-only").forEach((e) => {
			e.classList.remove("hidden")
		})
		document.querySelector(".logout-only").classList.add("hidden")
	} else {
		document.querySelectorAll(".log-only").forEach((e) => {
			e.classList.add("hidden")
		})
		document.querySelector(".logout-only").classList.remove("hidden")
	}
}

export function getUsers() {
	return JSON.parse(localStorage.getItem('users')) || []
}