const upHtml = document.getElementById("up-html")
const pastHtml = document.getElementById("past-hmtl")
const elementoHtml = document.getElementById("cards")
const elementoHTMLup = document.getElementById("cards2")
const elementoHTMPast = document.getElementById("cards3")
const elementoHTMDetails = document.getElementById("details")
const elementoHTMDetail = document.getElementById("detail")

const currentDate = data.currentDate
const cartasTotales = data.events

if (upHtml) {
    imprimirDatos(cartasTotales, elementoHTMLup, "up")
} else if (pastHtml) {
    imprimirDatos(cartasTotales, elementoHTMPast, "past")
} else if (elementoHTMDetails) {
    imprimirDatos(cartasTotales, elementoHTMDetail, "detail")
} else {
    imprimirDatos(cartasTotales, elementoHtml, "all")
}

{/* <img src="${objeto.image}" class="card-img-top" alt="img"></img> */ }

function cargarDatos(objeto) {
    return `
        <div class="card" id="${objeto._id}">
            <div class="img" style="background-image: url(${objeto.image})"></div>
            <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">${objeto.description}</p>
            <div class="d-flex justify-content-between ">
            <p class="text-center" >Price $${objeto.price}</p>
            <a href="./DETAILS.html" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div> `
}

function cargarDatos2(objeto) {
    return `
    <div class="d-flex conteiner " >
    <img class="img-da" src="${objeto.image}" alt="img">
    <article>
        <h2></h2>
        <ul>
            <li>id: ${objeto._id}</li>
            <li>name: ${objeto.name}</li>
            <li>date: ${objeto.date}</li>
            <li class="descri">description: ${objeto.description}</li>
            <li>category: ${objeto.cateory}</li>
            <li>place: ${objeto.place}</li>
            <li>capacity: ${objeto.capacity}</li>
            <li>assistance: ${objeto.assitence}</li>
            <li>price: ${objeto.price}</li>
        </ul>
    </article>
    </div> `
}

function imprimirDatos(arrayCards, elementoHtml, identificador) {
    let template = ""
    for (let event of arrayCards) {
        if (identificador === "up") {
            event.date > currentDate ? template += cargarDatos(event) : null
        } else if (identificador === "past") {
            event.date < currentDate ? template += cargarDatos(event) : null
        } else if (identificador === "all") {
            template += cargarDatos(event)
        } else {
            template = cargarDatos2(event)
        }
    }
    elementoHtml.innerHTML = template
}