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
  const search = "a an the has had do don't did didn't what did their at be my they his her this in".split(" ")
  // search.forEach(e => {
  //   if (jokearr.includes(e)) {
  //     console.log(e);
  //     return getWordAfterWord(jokearr, e)
  //   }
  // })
	if (jokearr.includes("a")) return getWordAfterWord(jokearr, "a")
	if (jokearr.includes("an")) return getWordAfterWord(jokearr, "an")
  else if (jokearr.includes("the")) return getWordAfterWord(jokearr, "the")
  else if (jokearr.includes("has")) return getWordAfterWord(jokearr, "has")
	else if (jokearr.includes("had")) return getWordAfterWord(jokearr, "had")
	else if (jokearr.includes("do")) return getWordAfterWord(jokearr, "do")
	else if (jokearr.includes("do")) return getWordAfterWord(jokearr, "don't")
	else if (jokearr.includes("did")) return getWordAfterWord(jokearr, "did")
	else if (jokearr.includes("did")) return getWordAfterWord(jokearr, "didn't")
	else if (jokearr.includes("what")) return getWordAfterWord(jokearr, "what")
	else if (jokearr.includes("their")) return getWordAfterWord(jokearr, "their")
	else if (jokearr.includes("at")) return getWordAfterWord(jokearr, "at")
	else if (jokearr.includes("be")) return getWordAfterWord(jokearr, "be")
	else if (jokearr.includes("my")) return getWordAfterWord(jokearr, "my")
	else if (jokearr.includes("they")) return getWordAfterWord(jokearr, "they")
  else if (jokearr.includes("his")) return getWordAfterWord(jokearr, "his")
  else if (jokearr.includes("her")) return getWordAfterWord(jokearr, "her") 
  else if (jokearr.includes("this")) return getWordAfterWord(jokearr, "this") 
  else if (jokearr.includes("like")) return getWordAfterWord(jokearr, "like") 
  else if (jokearr.includes("in")) return getWordAfterWord(jokearr, "in") 
  return "Title"
}

function getWordAfterWord(arr, word) {
  let index = arr.indexOf(word)
  let title = arr[index + 1]
  return toTitleCase(title)
}

export const fetchData=async (url, render)=>{
	let configObj= {
		method: "GET",
		headers: { "X-Api-Key": apiKey }
	}
	try {
		const response = await fetch(url, configObj);
		const data = await response.json();
		render(data);
	} catch (error) {
		console.error("Error:", error);
	}
}