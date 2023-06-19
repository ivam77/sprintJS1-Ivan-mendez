
export function cargarDatos(objeto) {
    const div = document.createElement("DIV")
    div.classList = `card`
    div.innerHTML = `
            <div class="img" style="background-image: url(${objeto.image})"></div>
            <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">${objeto.description}</p>
            <div class="d-flex justify-content-between ">
            <p class="text-center" >Price $${objeto.price}</p>
            <a href="./DETAILS.html?id=${objeto._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
            `
    return div
}

export function imprimirDatos(events, elementoHtml) {
    elementoHtml.innerHTML = ""
    let fragment = document.createDocumentFragment()
    events.forEach(objeto => fragment.appendChild(cargarDatos(objeto)))
    elementoHtml.appendChild(fragment)
}

//* Funcion para crear los checkboxes dinamicamente--Con Nodos....
export function crearCheckbox(events, elementoHtml) {
    const categories = [...(new Set(events.map((event) => event.category)))]

    for (let category of categories) {
        const div = document.createElement("div");
        div.classList.add("check");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "form-check-input";
        input.value = category;
        input.id = `${category}-check`;
        input.name = "category";
        input.style.cursor = "pointer";

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", `${category}-check`);
        label.textContent = category;
        label.style.cursor = "pointer";

        div.appendChild(input);
        div.appendChild(label);

        elementoHtml.appendChild(div);
    }
}

// export function combinacionEventos(events, formSearch, elementoHtml) {

//     const checkbox = [...document.querySelectorAll(`input[type=checkbox]:checked`)].map((check) => check.value);

//     const cartasFiltradas = events.filter(event => {
//         return checkbox.includes(event.category) || checkbox.length === 0;
//     }).filter(event => {
//         return event.name.toLowerCase().indexOf(formSearch.value.toLowerCase()) === 0;
//     });

//     imprimirDatos(cartasFiltradas, elementoHtml);
// }

export function combinacionEventos(events, formSearch, elementoHtml) {
    const checkbox = [...document.querySelectorAll(`input[type=checkbox]:checked`)].map((check) => check.value);

    const cartasFiltradas = events.filter(event => {
        return checkbox.includes(event.category) || checkbox.length === 0;
    }).filter(event => {
        return event.name.toLowerCase().indexOf(formSearch.value.toLowerCase()) === 0;
    });

    const noCoincidencias = document.getElementById("noCoincidencias");

    if (cartasFiltradas.length === 0) {
        elementoHtml.innerHTML = "";
        noCoincidencias.style.display = "block";
    } else {
        imprimirDatos(cartasFiltradas, elementoHtml);
        noCoincidencias.style.display = "none";
    }
}




export function myApp(eventsPast, eventsUp) {
    let tbodyPast = document.getElementById("tbodyPast");
    let tbodyUp = document.getElementById("tbodyUp");
    let mayorAsistencia = document.getElementById("mayorAsistencia");
    let menorAsistencia = document.getElementById("menorAsistencia");
    let mayorCapacidad = document.getElementById("mayorCapacidad");



    const categoryStatsUp = {};
    const categoryStatsPast = {};

    function fillTables(arrayEvents, table) {

        let categoryStats = table === "past" ? categoryStatsPast : categoryStatsUp

        for (let i = 0; i < arrayEvents.length; i++) {
            const event = arrayEvents[i]//en la posicion en la que esta, en cada objeto
            const category = event.category
            const assistanceOrEstimate = table === "past" ? event.assistance : event.estimate
            const price = event.price
            const capacity = event.capacity

            const priceCalculate = assistanceOrEstimate * price

            if (categoryStats[category]) {
                console.log("ya existe")
                categoryStats[category].assistanceOrEstimate += assistanceOrEstimate
                categoryStats[category].capacity += capacity
                categoryStats[category].priceCalculate += priceCalculate
            } else {
                console.log("crear")
                categoryStats[category] = {
                    category, // etan todas las suma
                    assistanceOrEstimate,
                    capacity,
                    priceCalculate
                };
            }

            for (const category in categoryStats) {
                const assistanceOrEstimate = categoryStats[category].assistanceOrEstimate
                const capacity = categoryStats[category].capacity

                const percentCapacity = (assistanceOrEstimate / capacity) * 100

                categoryStats[category].percentCapacity = percentCapacity
            }
        }
    }

    function updateView(object) {
        return `<tr>
        <td>${object.category}</td>
        <td>$${object.priceCalculate.toLocaleString()}</td>
        <td>${object.percentCapacity.toFixed(2)}%</td>
    </tr>`
    }

    function inprentDates(eventsPast, table) {
        let template = ""
        for (let datos of eventsPast) {
            template += updateView(datos)
        }
        table.innerHTML = template
    }


    function eventoConMayorAsistencia(data) {
        let maxAsistencia = 0;
        let eventoConMayorAsistencia;

        data.forEach((evento) => {
            const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;

            if (porcentajeAsistencia > maxAsistencia) {
                maxAsistencia = porcentajeAsistencia;
                eventoConMayorAsistencia = evento;
            }
        });

        mayorAsistencia.innerHTML =
            eventoConMayorAsistencia.name + " " + maxAsistencia.toFixed(2) + " %";
    }

    function eventoConMenorAsistencia(data) {
        let minAsistencia = Infinity;
        let eventoConMenorAsistencia;

        data.forEach((evento) => {
            const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;

            if (porcentajeAsistencia < minAsistencia) {
                minAsistencia = porcentajeAsistencia;
                eventoConMenorAsistencia = evento;
            }
        });

        menorAsistencia.innerHTML =
            eventoConMenorAsistencia.name + " " + minAsistencia + " %";
    }

    function eventoConMayorCapacidad(data) {
        let maxCapacidad = 0;
        let eventoConMayorCapacidad = null;

        data.forEach((evento) => {
            const porcentajeCapacidad = evento.capacity;

            if (porcentajeCapacidad > maxCapacidad) {
                maxCapacidad = porcentajeCapacidad;
                eventoConMayorCapacidad = evento;
            }
        });

        mayorCapacidad.innerHTML = eventoConMayorCapacidad.name + " " + maxCapacidad;
    }

    fillTables(eventsPast, "past");
    inprentDates(Object.values(categoryStatsPast), tbodyPast);

    fillTables(eventsUp, "up");
    inprentDates(Object.values(categoryStatsUp), tbodyUp);

    eventoConMayorAsistencia(eventsPast);
    eventoConMenorAsistencia(eventsPast);
    eventoConMayorCapacidad(eventsPast);
}
