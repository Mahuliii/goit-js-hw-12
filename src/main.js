import { fetchImages } from './js/pixabay-api.js';
import { displayImages, showAlert } from './js/render-functions.js';

let searchTerm = '';
let currentPage = 1;
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const endMessage = document.getElementById('end-message');
  loader.style.display = 'none';
  loadMoreBtn.style.display = 'none';
  function getCardHeight(gallery) {
    const card = gallery.querySelector('.card');
    if (card) {
      return card.getBoundingClientRect().height;
    }
    return 0;
  }
  function smoothScrollBy(distance) {
    window.scrollBy({
      top: distance,
      behavior: 'smooth',
    });
  }

  searchInput.addEventListener('input', event => {
    searchTerm = event.target.value.trim();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!searchTerm) {
      showAlert('Please enter a search term');
      return;
    }
    currentPage = 1;
    loader.style.display = 'block';
    gallery.innerHTML = '';
    searchInput.value = '';
    try {
      loader.style.display = 'block';

      const { images, total } = await fetchImages(searchTerm, currentPage);
      totalHits = total;

      loader.style.display = 'none';
      if (images.length > 0) {
        displayImages(images, gallery);
        if (images.length === 15) {
          loadMoreBtn.style.display = 'block';
        }
      }
      smoothScrollBy(getCardHeight(gallery) * 2);
    } catch (error) {
      loader.style.display = 'none';
      showAlert('Failed to fetch images');
      console.error(error);
    }
  });
  loadMoreBtn.addEventListener('click', async () => {
    try {
      currentPage++;
      loader.style.display = 'block';

      const { images, total } = await fetchImages(searchTerm, currentPage);
      totalHits = total;
      displayImages(images, gallery);

      loader.style.display = 'none';
      if (
        images.length < 15 ||
        (totalHits > 0 && gallery.childElementCount >= totalHits)
      ) {
        loadMoreBtn.style.display = 'none';
        endMessage.style.display = 'block';
      }
      smoothScrollBy(getCardHeight(gallery) * 2);
    } catch (error) {
      loader.style.display = 'none';
      showAlert('Failed to fetch images');
    }
  });
});
