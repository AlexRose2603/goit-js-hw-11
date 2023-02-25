import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33729999-7705c23e9189284ee9a61a627';
const options = {
  headers: {
    key: API_KEY,
    // q: this.searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    // page: this.page,
    per_page: 40,
  },
};
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    const URL = `${BASE_URL}?q=${this.searchQuery}&${options}${this.page}`;
    const response = await axios.get(URL, options);
    this.nextPage();
    return response.data.hits;
    // return fetch(URL)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.nextPage();
    //     return hits;
    //   });
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
