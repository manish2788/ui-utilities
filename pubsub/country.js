import { communicator } from "./communicator.js";

export class Country {
  constructor() {
    this.data = null;
    this.field = document.getElementById('country');
    this.action = document.getElementById('add-country');
    this.action.addEventListener('click', this.handleInput.bind(this));
  }
  handleInput() {
    this.data = this.field.value;
    communicator.publish('countryAdded',this.data);
  }
}