import ruleSet from './ruleSet.js';
import communicator from './communicator.js';

export default class TictacToe extends HTMLElement {
	constructor() {
		super();
    this.ruleSet = ruleSet;
    this.crossIcon = `<i class="bi bi-x-lg"></i>`;
    this.roundIcon = `<i class="bi bi-circle"></i>`;

    this.players = ["X","O"];
    this.currentPlayer = this.players[0];
    this.playersFragment = {
      "X": this.crossIcon,
      "O": this.roundIcon 
    };
    this.clickCounter = 0;
    this.winningSequence = [];
	}
  renderMaze() {
    let fragment = "";
    for(let i = 0; i < 9; i++) {
      fragment = fragment + `<board-cell data-index="${i+1}"></board-cell>`;
    }
    return fragment;
  }

  bindActions() {
    const allCells = this.querySelectorAll(".cell button");
    allCells.forEach(cell => {
      cell.addEventListener('click', (evt) => {
        this.clickCounter++;
        const index = evt.target.getAttribute("data-index");
        if(ruleSet[index].value === null) {
          evt.target.insertAdjacentHTML('beforeend',this.playersFragment[this.currentPlayer]);
          ruleSet[index].value = this.currentPlayer;
          let flag = false;
          ruleSet[index]["winningSequence"].forEach(item => {
            let counter = 0;
            if(flag === true) {
              return;
            }
            item.forEach(currentIndex => {
              if(ruleSet[currentIndex].value === this.currentPlayer) {
                counter++;
              }
            });
            if(counter === 3) {
              flag = true;
              this.winningSequence = item;
            }
          });
          let message = flag ? `${this.currentPlayer} wins`: "Match Drawn";
          this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
          if(flag) {
            document.querySelector(".message").innerText = message;
            this.winningSequence.forEach(item => {
              allCells[item-1].style.background = "cyan";
            })
          }
          else if(this.clickCounter === 9) {
            document.querySelector(".message").innerText = message;
          }
        }
      })
    })
  }
  updateState(data) {
    this.ruleSet[data].value = this.currentPlayer;
    communicator.publish('currentPlayer', {"cellIndex": data,"player":this.currentPlayer});
    this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
  }
  connectedCallback() {
    this.insertAdjacentHTML('beforeend',this.renderMaze());
    communicator.subscribe('clicked', this.updateState.bind(this));
    // communicator.publish('currentPlayer', this.currentPlayer);
    this.insertAdjacentHTML('afterend', `<div class="message"></div>`);
    // this.bindActions();
  }
}