import { communicator } from "./communicator.js";

class CountryListView {
  constructor() {
    this.view = document.getElementById('country-list');
    let updateView = this.updateView.bind(this);
    communicator.subscribe('countryAdded', updateView);
    this.unsubscribeButton = document.getElementById('unsubscribe');
    this.unsubscribeButton.addEventListener('click', evt => {
      communicator.unsubscribe('countryAdded', updateView);
    })
  }
  updateView(data) {
    this.view.insertAdjacentHTML('beforeend', `<li>${data}</li>`);
  }
}

export { CountryListView };