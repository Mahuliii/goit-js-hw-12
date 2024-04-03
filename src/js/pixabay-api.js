import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '43146074-d3428091907388d5fa71ff65d';

export function fetchImages(searchTerm) {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${queryParams.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          backgroundColor: 'rgba(239, 64, 64, 1)',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'rgba(250, 250, 251, 1)',
          position: 'center',
        });
      }
      return data.hits;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images',
        position: 'center',
      });
      throw new Error('Failed to fetch images');
    });
}
