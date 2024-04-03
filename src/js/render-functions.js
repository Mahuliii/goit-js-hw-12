import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  images.forEach(image => {
    const listItem = document.createElement('li');
    listItem.classList.add('card');

    const link = document.createElement('a');
    link.classList.add('card-link');
    link.href = image.largeImageURL;

    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const info = document.createElement('div');
    info.classList.add('card-info');

    const likes = document.createElement('p');
    likes.textContent = `Likes: ${image.likes}`;

    const views = document.createElement('p');
    views.textContent = `Views: ${image.views}`;

    const comments = document.createElement('p');
    comments.textContent = `Comments: ${image.comments}`;

    const downloads = document.createElement('p');
    downloads.textContent = `Downloads: ${image.downloads}`;

    info.appendChild(likes);
    info.appendChild(views);
    info.appendChild(comments);
    info.appendChild(downloads);

    link.appendChild(img);
    listItem.appendChild(link);
    listItem.appendChild(info);
    gallery.appendChild(listItem);
  });
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
}

export function showAlert(message) {
  alert(message);
}
