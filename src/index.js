import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreed, fetchCatByBreed } from './cat-api.js';

fetchBreed();

const refs = {
  breedSelectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
};


refs.breedSelectEl.addEventListener('change', findCatInfo);

function findCatInfo(event) {

  refs.catInfoEl.innerHTML = '';
  const breed = event.currentTarget.value;
  
  fetchCatByBreed(breed)
  
}

