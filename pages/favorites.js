import { getCurrentUserData, getJokeTitle, getUsers } from "../main.js"

export const favorites = () => {
	const favorites = document.getElementById("favorites")
	const custom = document.getElementById("custom")

	updateFavoriteList()

	function updateFavoriteList() {
		if (getCurrentUserData()["favorites"].length == 0) {
			favorites.innerHTML = `
			<p></p>
			<p class="text-right">No Favorites yet...</p>
			<p>go to the <a href="#/" class="text-[#ff9d0a] font-bold">Home Page</a></p>`
		} else {
			favorites.innerHTML = ""
			getCurrentUserData()["favorites"].forEach(e => {
				favorites.innerHTML += `
				<div class="card border border-[#363b3d] rounded-md p-2 relative">
					<h1 class="text-2xl font-bold text-[#ff9d0a]">${getJokeTitle(e)}</h1>
					<p class="joke">${e}</p>
					<span class="fav material-symbols-outlined absolute right-1 bottom-1 text-[#ff9d0a] select-none cursor-pointer opacity-0 transition-all filled">star</span>
					<div class="bg-[#ff9d0a] w-0 absolute bottom-0 left-0 h-1 loading transition-all"></div>
				</div>`
			})
		}
		document.querySelectorAll(".card").forEach(e => {
			e.addEventListener("mouseenter", () => {
				e.querySelector(".fav").classList.remove("opacity-0")
				e.querySelector(".fav").classList.add("opacity-100")
			})
			e.addEventListener("mouseleave", () => {
				e.querySelector(".fav").classList.remove("opacity-100")
				e.querySelector(".fav").classList.add("opacity-0")
			})
		})
		document.querySelectorAll(".fav").forEach(element => {
			let joke = element.parentElement.querySelector(".joke").innerText
			element.addEventListener("click", () => {
				let users = getUsers()
				users.forEach(e => { 
					if (e["name"] == getCurrentUserData()["name"]) {
						let index = e["favorites"].indexOf(joke)
						e["favorites"].splice(index, 1)
					}
				})
				localStorage.setItem("users", JSON.stringify(users));
				updateFavoriteList()
			})
		})
	}

	function updateCustomList() {
		if (getCurrentUserData()["uploaded"].length == 0) {
			custom.innerHTML = `
			<p></p>
			<p class="text-right">No custom jokes yet....</p>
			<p>go to the <a href="#/" class="text-[#ff9d0a] font-bold">Upload some</a></p>`
		} else {
			custom.innerHTML = ""
			getCurrentUserData()["uploaded"].forEach(e => {
				custom.innerHTML += `
				<div class="card border border-[#363b3d] rounded-md p-2 relative">
					<h1 class="text-2xl font-bold text-[#ff9d0a]">${getJokeTitle(e)}</h1>
					<p class="joke overflow-x-auto">${e}</p>
					<span class="fav material-symbols-outlined absolute right-1 bottom-1 text-[#ff9d0a] select-none cursor-pointer opacity-0 transition-all filled">delete</span>
					<div class="bg-[#ff9d0a] w-0 absolute bottom-0 left-0 h-1 loading transition-all"></div>
				</div>`
			})
		}
		document.querySelectorAll(".card").forEach(e => {
			e.addEventListener("mouseenter", () => {
				e.querySelector(".fav").classList.remove("opacity-0")
				e.querySelector(".fav").classList.add("opacity-100")
			})
			e.addEventListener("mouseleave", () => {
				e.querySelector(".fav").classList.remove("opacity-100")
				e.querySelector(".fav").classList.add("opacity-0")
			})
		})
		document.querySelectorAll(".fav").forEach(element => {
			let joke = element.parentElement.querySelector(".joke").innerText
			element.addEventListener("click", () => {
				let users = getUsers()
				users.forEach(e => { 
					if (e["name"] == getCurrentUserData()["name"]) {
						let index = e["uploaded"].indexOf(joke)
						e["uploaded"].splice(index, 1)
					}
				})
				localStorage.setItem("users", JSON.stringify(users));
				updateCustomList()
			})
		})
	}

	updateCustomList()

	// border-[#363b3d] bg-[#101112] bg-[#161819]



}