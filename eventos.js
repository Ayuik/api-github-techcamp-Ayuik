import { giveMeData, mainSection } from "./script.js";

const form = document.getElementById('form')
const userSearched = document.getElementById('search')

form.addEventListener('submit', function(event) {
    event.preventDefault();
    mainSection.innerHTML = " "
    const username = userSearched.value.trim();
    if (username) {
        giveMeData (username); 
        userSearched.value = "";
    }
});
