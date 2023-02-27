import PixabayApiService from './components/PixabayApiService.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';
import { createMarkup } from './components/MarkupCard.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  overlayOpacity: 0.8,
});

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
loadMoreBtn.button.addEventListener('click', fetchCards);
console.log(loadMoreBtn);

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
form.addEventListener('submit', onSubmit);

const pixabayApiService = new PixabayApiService();
console.log(pixabayApiService);

function onSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const value = form.elements.searchQuery.value.trim();

  pixabayApiService.searchQuery = value;
  pixabayApiService.resetPage();
  clearCardsList();
  if (value === '') {
    loadMoreBtn.hide();
    onEmptySubmit();
    clearCardsList();
    return;
  }
  if (value) {
    onSuccessSearch();
    loadMoreBtn.show();
  }
  fetchCards()
    .catch(onSearchError)
    .finally(() => form.reset());
}

async function fetchCards() {
  loadMoreBtn.disable();
  loadMoreBtn.enable();
  try {
    const { hits, totalHits } = await pixabayApiService.getCards();
    console.log(totalHits);

    const markup = hits.reduce((markup, hit) => markup + createMarkup(hit), '');
    addCardsToList(markup);
    if (hits.length < 40) {
      onSearchEnd();
      loadMoreBtn.hide();
    }
  } catch (error) {
    throw new Error(error);
  }
  lightbox.refresh();
}

function onSuccessSearch(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function onSearchEnd() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function onSearchError() {
  loadMoreBtn.hide();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function onEmptySubmit() {
  Notiflix.Notify.info("You can't get anything with an empty search field");
}

function addCardsToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearCardsList() {
  gallery.innerHTML = '';
}
