import PixabayApiService from './components/PixabayApiService.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';
import { createMarkup } from './components/MarkupCard.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';

let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
const axios = require('axios');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
loadMoreBtn.button.addEventListener('click', onLoadMore);
console.log(loadMoreBtn);

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
form.addEventListener('submit', onSubmit);

const pixabayApiService = new PixabayApiService();
console.log(pixabayApiService);

function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  pixabayApiService.searchQuery = value;
  pixabayApiService.resetPage();

  clearCardsList();
  loadMoreBtn.show();
  fetchCards().finally(() => form.reset());
}

function onLoadMore() {
  nextPage();
}

async function fetchCards() {
  loadMoreBtn.disable();
  try {
    const hits = await pixabayApiService.getNews();
    console.log(hits);
    if (hits.length === 0) throw new Error('Nothing is written!');
    const markup = hits.reduce((markup, hit) => markup + createMarkup(hit), '');
    addCardsToList(markup);
    loadMoreBtn.enable();
  } catch (error) {
    console.error(error);
  }

  function onSuccessSearch(totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  function onSearchEnd() {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  function onSearchError() {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  function addCardsToList() {
    gallery.insertAdjacentHTML('beforeend', markup);
  }

  function clearCardsList() {
    gallery.innerHTML = '';
  }
}
function onError(err) {
  console.log(err);
  loadMoreBtn.hide();
}
