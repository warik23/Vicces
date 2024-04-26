import { fetchData, getCurrentUserData, getJokeTitle, getUsers } from "../main.js";

export const home = () => {
	console.log("home js");

	let jokeBuffer = []

	function reroll() {
		if (!getCurrentUserData()) return
		// for (let i = 0; i < 8; i++) {
			fetchData("https://api.api-ninjas.com/v1/dadjokes?", render)
			console.log("asd");
		// }
		// render(jokeBuffer)
	}
	reroll()

  	document.getElementById("reroll").addEventListener("click", reroll)

	function render(data) {
		console.log(data)
		document.getElementById("jokes").innerHTML = `
		<p></p>
		<p class="text-right">No Jokes for you...</p>
		<p>Please <a href="#/login" class="text-[#ff9d0a] font-bold">Log In</a></p>`
		if (!getCurrentUserData()) return
		document.getElementById("jokes").innerHTML = ""
		console.log(data)
		data.forEach(e => {
			document.getElementById("jokes").innerHTML += `
			<div class="card border border-[#363b3d] rounded-md p-2 relative">
				<h1 class="text-2xl font-bold text-[#ff9d0a]">${getJokeTitle(e[0]["joke"])}</h1>
				<p class="joke">${e[0]["joke"]}</p>
				<span class="fav material-symbols-outlined absolute right-1 bottom-1 text-[#ff9d0a] select-none cursor-pointer opacity-0 transition-all">star</span>
				<div class="bg-[#ff9d0a] w-0 absolute bottom-0 left-0 h-1 loading transition-all"></div>
			</div>`
		})

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
		
			element.parentElement.querySelector("h1").innerText = getJokeTitle(joke)

			if (getCurrentUserData()) { 
				if (getCurrentUserData()["favorites"].includes(joke)) {
					console.log(joke);
					element.classList.add("filled") 
				}
			}

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
				} else {
					let users = getUsers()
					users.forEach(e => { if (e["name"] == getCurrentUserData()["name"]) e["favorites"].push(joke) })
					localStorage.setItem("users", JSON.stringify(users));
					// console.log(getCurrentUserData()["favorites"])
				}
				
			})
    	})
	}
}