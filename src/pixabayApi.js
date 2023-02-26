const ENDPOINT = 'https://pixabay.com/api/';
const options = {
    'key': '33929638-3d09c2b606ca8b58d00360aed',
    'q': `${searchQuery}`,
    'image_type': 'photo',
    'orientation': 'horizontal',
    'safesearch': 'true'
};

export default class PixabayAPI {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    }

getPhotoes() {
    const URL = `${ENDPOINT}?q={$this.searchQuery}&per_page=40&page=${this.page}`;
    return fetch(URL, options).then(
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



