import { apiKey } from "./apikey.js"

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

function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

export function getJokeTitle(joke) {
	let jokearr = joke.toLowerCase().split(" ")
  	const search = "a an the has had do don't did didn't what not did their at be my they his her this in I'm they're you're".split(" ")
  	for (const i of search) if (jokearr.includes(i)) return getWordAfterWord(jokearr, i)
	return "Title"
}

function getWordAfterWord(arr, word) {
	let index = arr.indexOf(word)
	let title = arr[index + 1]
	return toTitleCase(title)
}

export const fetchData=async (url, render)=>{
	const limit = 4
	let configObj= {
		method: "GET",
		headers: { "X-Api-Key": apiKey }
	}
	try {
		let jokeBuffer = []
		for (let i = 0; i < limit; i++) {
			const response = await fetch(url, configObj);
			const data = await response.json();
			jokeBuffer.push(data)
			console.log(jokeBuffer)
		}
		render(jokeBuffer)
	} catch (error) {
		console.error("Error:", error);
	}
}