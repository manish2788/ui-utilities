import { communicator } from "./communicator.js";

export class Name {
  constructor() {
    this.data = null;
    this.field = document.getElementById('name');
    this.action = document.getElementById('add-name');
    this.action.addEventListener('click', this.handleInput.bind(this));
  }
  handleInput() {
    this.data = this.field.value;
    communicator.publish('nameAdded',this.data);
  }
}