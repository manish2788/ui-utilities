import { communicator } from "./communicator.js";

class NameListView {
  constructor() {
    this.view = document.getElementById('name-list');
    communicator.subscribe('nameAdded', this.updateView.bind(this));
  }
  updateView(data) {
    this.view.insertAdjacentHTML('beforeend', `<li>${data}</li>`);
  }
}

export { NameListView };