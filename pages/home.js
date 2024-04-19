export const home = () => {
	console.log("home js");
  	document.querySelectorAll(".fav").forEach(element => {
		element.addEventListener("click", (e) => {
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
		})
	});
}