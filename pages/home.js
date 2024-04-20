import { getCurrentUserData, getJokeTitke, getUsers } from "../main.js";

export const home = () => {
	console.log("home js");

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

		if (getCurrentUserData()) { if (getCurrentUserData()["favorites"].includes(joke)) element.classList.add("filled") }

		element.addEventListener("click", (e) => {
			if (!getCurrentUserData()) return
			e.target.parentElement.querySelector(".loading").classList.remove("w-0")
			e.target.parentElement.querySelector(".loading").classList.add("w-full")
			e.target.classList.toggle("filled")
			setTimeout(() => {
				e.target.parentElement.querySelector(".loading").classList.remove("w-full")
				e.target.parentElement.querySelector(".loading").classList.add("w-0")
				e.target.parentElement.querySelector(".loading").classList.remove("transition-all")
				e.target.parentElement.querySelector(".loading").classList.add("opacity-0")
				setTimeout(() => {
					e.target.parentElement.querySelector(".loading").classList.add("transition-all")
					e.target.parentElement.querySelector(".loading").classList.remove("opacity-0")
					e.target.parentElement.querySelector(".loading").classList.add("opacity-100")
				}, 0)
			}, 300)
			
			if (getCurrentUserData()) {
				if (getCurrentUserData()["favorites"].includes(joke)) {
					let users = getUsers()
					users.forEach(e => { 
						if (e["name"] == getCurrentUserData()["name"]) {
							let index = e["favorites"].indexOf(joke)
							e["favorites"].splice(index, 1)
						}
					})
					localStorage.setItem("users", JSON.stringify(users));
					// console.log(getCurrentUserData()["favorites"])
				}
				else {
					let users = getUsers()
					users.forEach(e => { if (e["name"] == getCurrentUserData()["name"]) e["favorites"].push(joke) })
					localStorage.setItem("users", JSON.stringify(users));
					// console.log(getCurrentUserData()["favorites"])
				}
			}
		})
	});
}