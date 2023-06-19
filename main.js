import {imprimirDatos, crearCheckbox, combinacionEventos} from "./module/funciones.js"

const elementoHtml = document.getElementById("cards")
const formSearch = document.getElementById("form-search")
const formCheckbox = document.getElementById("form-checkbox")
let events;

//metodo de wind.. es una api del navegador
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(response => response.json())
    .then(data => {
        events = data.events
        
        imprimirDatos(events, elementoHtml);
        crearCheckbox(events, formCheckbox);

        formCheckbox.addEventListener('change', () => combinacionEventos(events, formSearch, elementoHtml));

        formSearch.addEventListener("keyup", () => combinacionEventos(events, formSearch, elementoHtml));

    }).catch(err => console.log(err))


