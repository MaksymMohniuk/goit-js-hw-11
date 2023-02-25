import PixabayAPI from "./pixabayApi.js"
import LoadMoreBtn from './loadMoreBtn'

const form = document.getElementById("search-form");
const gallery = document.querySelector('.gallery');
const PixabayAPI = new PixabayAPI();
const loadMoreBtn = new LoadMoreBtn({
    selector: "#loadMore",
    isHidden: true,
  });


form.addEventListener("submit", onSubmit);
loadMoreBtn.button.addEventListener("click", fetchPhotoes);

function onSubmit(event) {
    event.preventDefault();
  
    const value = form.event.target.value.trim();
  
    PixabayAPI.searchQuery = value;
  
    PixabayAPI.resetPage();
    clearPhotoesList();
    loadMoreBtn.show();
    fetchPhotoes().finally(() => form.reset());
  }