import Notiflix from 'notiflix';
import PixabayAPI from "./pixabayApi.js"
import LoadMoreBtn from './loadMoreBtn'

const form = document.getElementById("search-form");
const gallery = document.querySelector('.gallery');
const newPixabayAPI = new PixabayAPI();
const loadMoreBtn = new LoadMoreBtn({
    selector: "#loadMore",
    isHidden: true,
  });


form.addEventListener("submit", onSubmit);
loadMoreBtn.button.addEventListener("click", fetchPhotoes);

function onSubmit(event) {
    event.preventDefault();
  
    const value = form.event.target.value.trim();
  
    newPixabayAPI.searchQuery = value;
  
    newPixabayAPI.resetPage();
    clearPhotoesList();
    loadMoreBtn.show();
    fetchPhotoes().finally(() => form.reset());
  }

  function fetchPhotoes() {
    loadMoreBtn.disable();
  
    return newPixabayAPI
      .getPhotoes()
      .then((hits) => {
        if (articles.length === 0) throw new Error("Sorry, there are no images matching your search query. Please try again.");
  
        return hits.reduce(
          (markup, hit) => createMarkup(hit) + markup,
          ""
        );
      })
      .then((markup) => {
        appendPhotoesToList(markup);
        loadMoreBtn.enable();
      })
      .catch(onError);
  }

  function appendPhotoesToList(markup) {
    gallery.insertAdjacentHTML("beforeend", markup);
  }

  function clearPhotoesList() {
    gallery.innerHTML = "";
  }

  function createMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>
    `;
  }

  function onError(err) {
    console.error(err);
    loadMoreBtn.hide();
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }