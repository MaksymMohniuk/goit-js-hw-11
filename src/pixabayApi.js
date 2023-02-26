import axios from 'axios';

export default class PixabayAPI {
    #ENDPOINT = 'https://pixabay.com/api/';
    #KEY = '33929638-3d09c2b606ca8b58d00360aed'
    constructor() {
        this.page = 1;
        this.searchQuery = '';
        this.perPage = 40;
    }

getPhotoes() {
    return axios.get(`${this.#ENDPOINT}`, {
        params: {
            key: this.#KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            perPage: this.perPage,
            page: this.page
        }
    }).then(
        (response) => response.json()
    ).then(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {this.nextPage()
        return webformatURL, largeImageURL, tags, likes, views, comments, downloads}
    )
        }
    nextPage() {
        this.page += 1;
      }
      resetPage() {
        this.page = 1;
      }
}



