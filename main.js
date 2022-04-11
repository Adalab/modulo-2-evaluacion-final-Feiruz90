"use strict";

/* no he utilizado en document.querySelector porque he visto que se puede utilizar otras formas de llamar a la funcion , por ejemplo con onsubmit. Onsubmit llama a la funcion que se indique cuando hace click en el boton submit de html*/

const DEFAULT_IMAGE =
  "https://via.placeholder.com/210x450/ffffff/666666/?text="; /* es la imagen que se usa cuando la bebida no tiene una imagen*/

/* he definido una funcion para hacer la busqueda*/ /* onsumbit -> Llama a nuestra función desde un formulario*/
function sendForm(event) {
  /* he  evitado que se refescre la pagina ( hago que evite enviar una peticion al servidor*/
  event.preventDefault();

  /* he creado variables para guardar en favoritos. */
  const resultsUl = document.querySelector("#results");
  const favoritesUl = document.querySelector("#favorites");
  const input = document.querySelector("#drink-name");
  resultsUl.innerHTML = "";

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
      /* como pintar en el html  ( para mostrar el nombre, imagen, ESTE BUCLE VA BEBIDA POR BEBIDA, ejemplo margarita 1, margarita 2... por lo que he puesto el li para el html( se encuentra escrito abajo en resultsUL.innerHTML)*/
      for (const drink of data.drinks) {
        let imageUrl = "";
        /* he puesto una condocional para comprobar si las bebidad tienen una foto o no, y si tiene una foto se la asigno (img)*/
        if (drink.strDrinkThumb) {
          imageUrl = drink.strDrinkThumb;
        } else {
          /* pongo default_image es cuando no tiene bebida y esta declarada arriba*/
          imageUrl = DEFAULT_IMAGE + drink.strDrink;
        }

        /* He añadido despues del FOR DE ARRIBA  "oye traeme todos los li de todas las bebidas y he puesto un listener" + como se hace? añadiendo una clase a las listas*/
        resultsUl.innerHTML += `
          <li class="js-li">
            <h2>${drink.strDrink}</h2>
            <img class="imagen" src="${imageUrl}">
          </li>
        `;
      }

      // he añadido el queryselectorALL PARA COGER TODOS LOS LI QU HAY EN HTML Y DENTRO DEL FOR que se encuentra arriba
      //Creo una variable "todolosli"
      const todosLosLi = document.querySelectorAll(".js-li");

      for (const cadaLi of todosLosLi) {
        // he creado addeventlistener para todos los li  y cuando hago click  me ejecute esta funcion que he puesto abajo
        cadaLi.addEventListener("click", function (event) {
          // esta funcion ha cogido el li donde he hecho CLICK y lo clona y duplica y se guarda en la variable y en la lista de favoritos se añade la que esta abajo favoritesUl.appendChild(liClone);
          const liClone = event.currentTarget.cloneNode(true);
          // Meto la copia dentro de la lista de favoritos
          favoritesUl.appendChild(liClone);

          // estas dos LINEAS SIRVEN PARA : const liClone = event.currentTarget.cloneNode(true);       favoritesUl.appendChild(liClone);   cuando la usuaria hace click en una bebida hace que coga todo ese html y todo el li, lo coge lo duplica y se PONE EN LA LISTA DE FAVORITOS
        });
      }
    });
}
