export function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="photo-card">
    <a class="card-link" href="${webformatURL}">
    <img class="card-img" src="${largeImageURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b class="item-amount">Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b class="item-amount">Views: ${views}</b>
      </p>
      <p class="info-item">
        <b class="item-amount">Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b class="item-amount">Downloads: ${downloads}</b>
      </p>
    </div>
    </a>
  </div>`;
}
