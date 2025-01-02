import communicator from "./communicator.js";
import state from "./state.js";

export default class BoardCell extends HTMLElement {
  constructor() {
    super();
    this.value = null;
    this.index = this.getAttribute("data-index");
    this.actionButton = null;
    const updatePlayerTurn = this.updateCellValue.bind(this);
    communicator.subscribe('currentPlayer', updatePlayerTurn);
  }
  updateCellValue(data) {
    if(this.index === data.cellIndex) {
      this.value = data.player;
      this.querySelector("button").insertAdjacentHTML('beforeend', this.value);
    }
  }
  boardCellClickHandler(evt) {
    if(!this.value) {
      communicator.publish('clicked', this.index);
    }
  }
  bindActions() {
    this.actionButton.addEventListener('click', this.boardCellClickHandler.bind(this));
  }
  connectedCallback() {
    this.insertAdjacentHTML('beforeend', `<button></button>`);
    this.actionButton = this.querySelector('button');
    this.classList = "cell";
    this.bindActions();
  }
  disconnectedCallback() {
    this.actionButton.removeEventListener('click', this.boardCellClickHandler);
  }
}