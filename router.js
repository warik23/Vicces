import { placeName, placePass } from "./main.js"
import { favorites } from "./pages/favorites.js"
import { home } from "./pages/home.js"
import { login } from "./pages/login.js"
import { logout } from "./pages/logout.js"
import { register } from "./pages/register.js"
import { upload } from "./pages/upload.js"


const routes = {
    "": "pages/home.html",
    "404" : "pages/404.html",
    "login" : "pages/login.html",
    "register" : "pages/register.html",
    "favorites" : "pages/favorites.html",
    "logout" : "pages/logout.html",
    "upload" : "pages/upload.html"
}

navigate()

window.addEventListener("hashchange", () => {
    // console.log(window.location.hash)
    navigate()
})

function navigate() {
    let hash = window.location.hash.substring(2)
    // console.log(hash)
    let page = routes[hash]
    // console.log(page)
    if (!page) {
        loadPage("pages/404.html", document.querySelector("main"))
        return
    } 
    loadPage(page, document.querySelector("main"))
}

async function loadPage(page, obj) {
    const response = await fetch(page)
    const html = await response.text()
    obj.innerHTML = html
	console.log(page)
    // if (page == "home.html") home()
    if (page == "pages/login.html") login(placeName, placePass)
    else if (page == "pages/register.html") register()
    else if (page == "pages/home.html") home()
    else if (page == "pages/favorites.html") favorites()
    else if (page == "pages/logout.html") logout()
    else if (page == "pages/upload.html") upload()
}