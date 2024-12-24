import { giveMeData, mainSection } from "./script.js";

const form = document.getElementById('form')
const userSearched = document.getElementById('search')

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario recargue la pagina
    mainSection.innerHTML = " "
    const username = userSearched.value.trim();  // Trim elimina espacios en blanco
    if (username) {
        giveMeData (username); //El valor de usuarioTipeado.value se almacena en una nueva variable local (username)
    }
    console.log(username)
});
