import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

export const refs = {
  input : document.querySelector("input#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
}

const{input, countryList, countryInfo} = refs
input.addEventListener("input", debounce(onInputSearch, DEBOUNCE_DELAY))
function onInputSearch(e){
    e.preventDefault();

    const iValue = e.target.value.trim();
    if(!iValue){
      clearMarkup(countryList);
      clearMarkup(countryInfo);
      return
    }
    fetchCountries(iValue).then(data=> {
      if(data.length>10){
        clearMarkup(countryList);
        clearMarkup(countryInfo);
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
      return
      }
      else if(data.length>2 && data.length<10){
          renderCountryList(data)
clearMarkup(countryInfo);
return
      }
      else{
        renderCountryItem(data)
 clearMarkup(countryList);
        return
      }
    }).catch(onFetchError)
}

 function clearMarkup (countryName){
  countryName.innerHTML = ""
 }

  function renderCountryList(data){
  const listMarkup = createListMarkup(data)
countryList.innerHTML = listMarkup
}

 function renderCountryItem(data){
  const itemMarkup = createItemMarkup(data)
 countryInfo.innerHTML = itemMarkup
}

 function  createListMarkup (data){
  return data.map(({name, flags}) => `<li class="country-item"><img src="${flags.svg}"
  alt="" width="30"><span>${name.common}</span></li>`).join('')
}

 function createItemMarkup (data){
return data.map(({name, capital, population, flags, languages}) => ` <h2 class="country-name">
<img src="${flags.svg}" alt="" width="30">${name.common} </h2>
<p class="country-text">Capital: ${capital}</p>
<p class="country-text">Population: ${population}</p>
<p class="country-text">Languages: ${Object.values(languages)}</p>`).join('')
}

export function onFetchError (){
  Notiflix.Notify.failure("Oops, there is no country with that name");
  clearMarkup(countryList);
  clearMarkup(countryInfo);
}