import { login } from "./pages/login.js"
import { register } from "./pages/register.js"


const routes = {
    "": "pages/home.html",
    "404" : "pages/404.html",
    "login" : "pages/login.html"
}

navigate()

window.addEventListener("hashchange", () => {
    console.log(window.location.hash)
    navigate()
})

function navigate() {
    let hash = window.location.hash.substring(2)
    console.log(hash)
    let page = routes[hash]
    console.log(page)
    if (!page) {
        loadPage("404.html", document.querySelector("main"))
        return
    } 
    loadPage(page, document.querySelector("main"))
}

async function loadPage(page, obj) {
    const response = await fetch(page)
    const html = await response.text()
    obj.innerHTML = html
    // if (page == "home.html") home()
    if (page == "login.html") login()
    else if (page == "register.html") register()
}