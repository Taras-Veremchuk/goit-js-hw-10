import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
  input : document.querySelector("#search-box")
}

const{input} = refs
console.log(input)

input.addEventListener("input", onInputPress)
function onInputPress(){
  
}