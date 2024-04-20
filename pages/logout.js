import { getCurrentUserData, getUsers, setPlaceName, updateMenu } from "../main.js"

export const logout = () => {

	updateList()
	
	if (document.getElementById("logout")) {
		document.getElementById("logout").addEventListener("click", () => {
			localStorage.removeItem("currentUser")
			updateList()
			updateMenu()
		})
	}

	document.querySelectorAll(".relogin").forEach(e => {
		e.addEventListener("click", () => {
			setPlaceName(e.parentElement.querySelector(".rename").innerText)
			window.location.hash = "#/login";
		})
	})
	
	function updateList() {	
		document.getElementById("otherUsers").innerHTML = ""
		
		if (getCurrentUserData()) {
			document.getElementById("currentUser").innerHTML = `
			<div class="bg-black flex p-2 rounded-md gap-2 items-center">
				<span class="material-symbols-outlined filled text-2xl">account_circle</span>
				<p id="name" class="font-bold">${getCurrentUserData()["username"]}</p>
				<input id="logout" type="button" value="Logout" class="bg-[#ff9d0a] text-black font-bold px-2 py-1 rounded-md cursor-pointer">
			</div>`

			getUsers().forEach((e) => {
				if (e["username"] != getCurrentUserData()["username"]) {
					document.getElementById("otherUsers").innerHTML += `
						<div class="bg-black flex p-2 rounded-md gap-2 items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="material-symbols-outlined filled text-2xl">account_circle</span>
								<p class="font-bold rename">${e["username"]}</p>
							</div>
							<input type="button" value="Login" class="bg-[#ff9d0a] text-black font-bold px-2 py-1 rounded-md cursor-pointer relogin">
						</div>`
				}
			})
		} else {
			document.getElementById("currentUser").innerHTML = `
			<div class="bg-black flex p-2 rounded-md gap-2 items-center">
				<p id="name" class="font-bold">No Current User</p>
			</div>`
			getUsers().forEach((e) => {
				document.getElementById("otherUsers").innerHTML += `
					<div class="bg-black flex p-2 rounded-md gap-2 items-center justify-between">
						<div class="flex items-center gap-2">
							<span class="material-symbols-outlined filled text-2xl">account_circle</span>
							<p class="font-bold rename">${e["username"]}</p>
						</div>
						<input type="button" value="Login" class="bg-[#ff9d0a] text-black font-bold px-2 py-1 rounded-md cursor-pointer relogin">
					</div>`
			})
		}
	}
}