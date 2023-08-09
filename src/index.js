import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreed, fetchCatByBreed } from './cat-api.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const refs = {
  breedSelectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
};

fetchBreed()
  .then(breedsArr => (refs.breedSelectEl.innerHTML = createMarcup(breedsArr)))
  .catch(err => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

refs.breedSelectEl.addEventListener('change', findCatInfo);

function findCatInfo(event) {
  refs.catInfoEl.innerHTML = '';
  const breed = event.currentTarget.value;

  fetchCatByBreed(breed)
    .then(arr => (refs.catInfoEl.innerHTML = createCatImg(arr)))
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function createMarcup(breedsArr) {
  return breedsArr
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function createCatImg(breed) {
  Loading.remove();
  if (breed.length === 0) {
    throw new Error();
  }
  return breed
    .map(item => {
      const {
        breeds: {
          [0]: { description, name, temperament },
        },
      } = item;

      return `<img class="cat-photo" src="${item.url}" alt="${name}" width="300">
      <div class="cat-info-conteiner">
      <h1 class="cat-name">${name}</h1>
      <p class="cat-description"> 
       ${description}</p>
      <p calss="cat-description"><span class="descr-title">Temperament: </span> ${temperament}</span</p>
      </div>
      `;
    })
    .join('');
}
