import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const BASIC_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreed() {
  return fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    
}


export function fetchCatByBreed(breedId) {
  Loading.arrows('Searching...', {
    svgColor: 'rgba(0,0,0,0.8)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    messageColor: 'rgba(0,0,0,0.8)',
    messageFontSize: "24px"
  });
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
    api_key:
      'live_gpoZcOghIKxFU1uMBR9tGdAfF3nNIng6LpmcpEWwPGEdpQn6Ifd1p3v5eNwEUfsf',
  });
  return fetch(`${BASIC_URL}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    
    ;
}


