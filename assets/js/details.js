const elementoHTMDetail = document.getElementById("detail");

const cartasTotales = data.events;

const Params = new URLSearchParams(location.search);

const nombre = Params.get(`nombre`);
console.log(nombre);

const eventoEncontrado = cartasTotales.find(event => event.name === nombre);
console.log(eventoEncontrado);

elementoHTMDetail.innerHTML = `
<div class="d-flex conteiner">
    <img class="img-da" src="${eventoEncontrado.image}" alt="img">
    <article class="article-datails">
        <h2 class="h2-datails">${eventoEncontrado.name}</h2>
        <ul class="ul-datails" >
            <li> <samp class="texto-details">id:</samp> ${eventoEncontrado._id}</li>
            <li> <samp class="texto-details">name:</samp> ${eventoEncontrado.name}</li>
            <li> <samp class="texto-details">date:</samp> ${eventoEncontrado.date}</li>
            <li> <samp class="texto-details">description:</samp>${eventoEncontrado.description}</li>
            <li> <samp class="texto-details">category:</samp> ${eventoEncontrado.category}</li>
            <li> <samp class="texto-details">place:</samp> ${eventoEncontrado.place}</li>
            <li> <samp class="texto-details">capacity:</samp> ${eventoEncontrado.capacity}</li>
            <li> <samp class="texto-details">assistance:</samp>${eventoEncontrado.assistance}</li>
            <li> <samp class="texto-details">price:</samp> ${eventoEncontrado.price}</li>
        </ul>
    </article>
</div>`;

















