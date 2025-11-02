const listaPersonas = document.getElementById("character-list");
let numeroPag = 1;
const previus = document.getElementById("prev-page");
const next = document.getElementById("next-page");
let totalPaginas = null;

function llamadaApi(numeroPag) {
  fetch("https://rickandmortyapi.com/api/character/?page=" + numeroPag)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La petición no se ha realizado correctamente");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data.results);
       if (!totalPaginas) totalPaginas = data.info.pages;
      listaPersonas.innerHTML = "";
      for (let i = 0; i < data.results.length; i++) {
        let elemento = document.createElement("li");

        let img = document.createElement("img");
        img.src = data.results[i].image;

        let nombre = document.createElement("p");
        nombre.innerHTML = `<strong>Name:</strong> ${data.results[i].name}`;

        let especie = document.createElement("p");
        especie.innerHTML = `<strong>Species:</strong> ${data.results[i].species}`;

        elemento.appendChild(img);
        elemento.appendChild(nombre);
        elemento.appendChild(especie);

        listaPersonas.appendChild(elemento);
      }
    });
}
llamadaApi(numeroPag)
previus.addEventListener("click", () => {
  if (numeroPag > 1) {
    numeroPag--;
    llamadaApi(numeroPag);
  }
});

next.addEventListener("click", () => {
  if (!totalPaginas || numeroPag < totalPaginas) {
    numeroPag++;
    llamadaApi(numeroPag);
  }
});
