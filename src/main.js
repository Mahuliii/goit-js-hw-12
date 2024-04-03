import { fetchImages } from './js/pixabay-api.js';
import { displayImages, showAlert } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      showAlert('Please enter a search term');
      return;
    }
    loader.style.display = 'block';
    gallery.innerHTML = '';
    searchInput.value = '';
    try {
      const images = await fetchImages(searchTerm);

      loader.style.display = 'none';
      if (images.length > 0) {
        displayImages(images, gallery);
      }
    } catch (error) {
      loader.style.display = 'none';
      showAlert('Failed to fetch images');
      console.error(error);
    }
  });
});
