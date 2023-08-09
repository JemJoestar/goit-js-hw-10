import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreed, fetchCatByBreed } from './cat-api.js';

fetchBreed();

const refs = {
  breedSelectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  catInfoEl: document.querySelector('.cat-info'),
  errorEl: document.querySelector('.error'),
};


refs.breedSelectEl.addEventListener('change', findCatInfo);

function findCatInfo(event) {
  refs.loaderEl.classList.remove("hidden");

  refs.catInfoEl.innerHTML = '';
  const breed = event.currentTarget.value;
  
  fetchCatByBreed(breed)
  
}

