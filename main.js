"use strict";

/* no he utilizado en document.querySelector porque he visto que se puede utilizar otras formas de llamar a la funcion , por ejemplo con onsubmit. Onsubmit llama a la funcion que se indique cuando hace click en el boton submit de html*/

const DEFAULT_IMAGE =
  "https://via.placeholder.com/210x450/ffffff/666666/?text="; /* es la imagen que se usa cuando la bebida no tiene una imagen*/

/* he definido una funcion para hacer la busqueda*/
function sendForm(event) {
  /* hemos evitado que se refesque la pagina ( hago que evite enviar una peticion al servidor*/
  event.preventDefault();

  /* he creado un id en html para poder hacer js */
  const element = document.querySelector("#results");
  const input = document.querySelector("#drink-name");
  element.innerHTML = "";

  /* he utilizado fetch para poner la url que nos han puesto en el ejercicio*/
  /* el ejemplo que he extraido ha sido de los apuntes de FETCH*/
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
    input.value; /* he puesto la url para que salga dieferentes imagenes- El input ( es un objeto) es del html que he escrito y accedo con value lo que el usuario ponga de texto.

  /* he puesto la (url) porque voy a hacer la peticion y esta definida arriba en const url*/

  fetch(url)
    /* las funciones cuando las llamo tienen que responder instanteneamente y lo que me hace fetch es un objeto de js que se llama promesa y ésta misma me avisa cuando se ha terminado de descargar los fatos. es decir, cuando llamo a fetch me devuelve una promesa */

    .then(function (response) {
      return response.json();
    })

    /* para que sirve data? son los datos que me ha devuelto el servidor*/
    .then(function (data) {
      /* como pintar en el html  ( para mostrar el nombre, imagen)*/
      for (const drink of data.drinks) {
        const img = document.createElement("img");
        const h = document.createElement("h3");
        const t = document.createTextNode(drink.strDrink);

        /* he puesto una condocional para comprobar si las bebidad tienen una foto o no, y si tiene una foto se la asigno (img)*/
        if (drink.strDrinkThumb) {
          /* este src viene del servidor el que estoy haciendo la peticion*/
          img.src = drink.strDrinkThumb;
        } else {
          /* pongo default_image es cuando no tiene bebida y esta declarada arriba*/
          img.src = DEFAULT_IMAGE + drink.strDrink;
        }

        /*Agrega un nuevo nodo al final de la lista de un elemento hijo de un elemento padre especificado.Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento.*/
        h.appendChild(t);

        /*dentro del elemento he metido el h2 que se encuentra definido arriba*/
        element.appendChild(h);

        /*dentro de element he metido img que se encuentra definido arriba*/
        element.appendChild(img);
      }
    });
}
