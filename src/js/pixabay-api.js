import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const API_KEY = '43146074-d3428091907388d5fa71ff65d';

export async function fetchImages(searchTerm, page = 1) {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${queryParams.toString()}`
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch images');
    }

    const data = response.data;

    if (data.hits.length === 0 && page === 1) {
      iziToast.show({
        backgroundColor: 'rgba(239, 64, 64, 1)',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'rgba(250, 250, 251, 1)',
        position: 'center',
      });
    }

    return {
      images: data.hits,
      totalHits: data.totalHits,
    };
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images',
      position: 'center',
    });
    throw new Error('Failed to fetch images');
  }
}
