import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export function fetchBreed() {
  fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(breedsArr => {
      refs.selectionEl.innerHTML = createMarcup(breedsArr);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

const BASIC_URL = 'https://api.thecatapi.com/v1/images/search';

const refs = {
  selectionEl: document.querySelector('.breed-select'),
  errorEl: document.querySelector('.error'),
  loaderEl: document.querySelector('.loader'),
  catInfoEl: document.querySelector('.cat-info'),
};

function createMarcup(breedsArr) {
  return breedsArr
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

export function fetchCatByBreed(breedId) {
  Loading.arrows('Searching...', {
    svgColor: 'rgba(0,0,0,0.8)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    messageColor: 'rgba(0,0,0,0.8)'
  });
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
    api_key:
      'live_gpoZcOghIKxFU1uMBR9tGdAfF3nNIng6LpmcpEWwPGEdpQn6Ifd1p3v5eNwEUfsf',
  });
  fetch(`${BASIC_URL}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      refs.loaderEl.classList.add('hidden');
      return response.json();
    })
    .then(arr => (refs.catInfoEl.innerHTML = createCatImg(arr)))
    .catch(err => {
      refs.loaderEl.classList.add('hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function createCatImg(breed) {
  if (breed.length === 0) {
    throw new Error();
  }
  Loading.remove();
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
