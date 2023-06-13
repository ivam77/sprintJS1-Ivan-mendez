const elementoHtml = document.getElementById("cards")

const currentDate = data.currentDate
const cartasTotales = data.events //cartastotales es un array de objeto

//---------------------buscador......

const formSearch = document.getElementById("form-search")

console.log("------------------------------CREAR CHECKBOX----------------------------------------")

//----------------------------------hacer dinamicos los checkbox

const form = document.getElementById("form-checkbox")

//Crea el Array
const copiaCartaTotales = cartasTotales.map(events => events.category)
console.log(copiaCartaTotales)

//Crea un set para eliminar los repetidos
const cartasSinRepetir = new Set(copiaCartaTotales)

//lo vuelvo a pasar a array, para tener disponoble
//los metodos de array
const arrayCartasSinRepetir = Array.from(cartasSinRepetir)

//Function que cree los checkbox.
//estamos trabajando con un nodo.

function crearCheckbox(category) {
    const div = document.createElement(`DIV`)
    div.classList.add(`check`)

    const input = document.createElement(`INPUT`)
    input.type = "checkbox"
    input.className = "form-check-input"
    input.value = category
    input.id = `${category}-check`
    input.name = "category"
    input.style.cursor = "pointer";

    const label = document.createElement(`LABEL`)
    label.className = "form-check-label"
    label.setAttribute('for', `${category}-check`) // Establecer el atributo "for" del label para asociarlo con el checkbox
    label.textContent = category
    label.style.cursor = "pointer";

    div.appendChild(input)
    div.appendChild(label)

    return div
}

// llevo los checkbox al dom

function pintarCheck(copiaCartaTotales, elemento) {

    const fragment = document.createDocumentFragment()

    for (const copiaCartaTotal of copiaCartaTotales) {
        fragment.appendChild(crearCheckbox(copiaCartaTotal))
    }
    elemento.appendChild(fragment)
}

pintarCheck(arrayCartasSinRepetir, form)



console.log("-------------------------------CHECKBOX----------------------------------------")

//generar un escuchador de eventos para los checkbox..
//*Las funciones tienen que ser responsabilidad unica!!
//*Aca delegamos tareas

form.addEventListener(`change`, events => {

//TODO: Esta funcion no se debe precupar de filtar, ya que hay una funcion que hace ese proceso..
//*Form.add.. es un procedimiento..
//!Esta no retorna nada, se encrga de ejecutar otras..

    const cartasFiltradas = filtrarPorCheck(cartasTotales)
    imprimirDatos(cartasFiltradas, elementoHtml)
}
)

function filtrarPorCheck(cartasDeEventos) {

    const checkbox = Array.from(document.querySelectorAll(`input[type=checkbox]:checked`)).map(check => check.value)
    console.log(checkbox)

    if (checkbox.length == 0) {
        return cartasDeEventos
    } else {
        const cartasFiltradas = cartasDeEventos.filter(events => checkbox.includes(events.category))
        return cartasFiltradas
    }
}

console.log("-------------------------------BUSCADOR----------------------------------------")


formSearch.addEventListener("keyup", e => {
    let lista = cartasTotales
    let copiaDeLista = cartasTotales

    lista = copiaDeLista.filter((events) => {
        return events.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0;
    });

    imprimirDatos(lista, elementoHtml);
});



console.log("-----------------------------------------------------------------------")



console.log("-----------------------------------------------------------------------")

function cargarDatos(objeto) { // se almacena la cadena de texto del array
    return `
        <div class="card" id="${objeto._id}">
            <div class="img" style="background-image: url(${objeto.image})"></div>
            <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">${objeto.description}</p>
            <div class="d-flex justify-content-between ">
            <p class="text-center" >Price $${objeto.price}</p>
            <a href="./assets/pages/DETAILS.html?nombre=${objeto.name}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div> `
}

console.log("-----------------------------------------------------------------------")

//event se utiliza como la variable de iteración que representa cada evento en el arrayCards
//propiedad innerhtml del dom
//for of recorrer iterativamente elementos

function imprimirDatos(arrayCards, elementoHtml) {
    let template = ""
    for (let event of arrayCards) {
        template += cargarDatos(event)
    }
    // console.log(template)
    elementoHtml.innerHTML = template
}

imprimirDatos(cartasTotales, elementoHtml)








