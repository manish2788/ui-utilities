class MemoryGame {
  constructor(size) {
    this.container = document.querySelector('.container');
    this.size = size ? size : 18;
    this.inputArray = [];
    this.imageResourceURL = "https://picsum.photos/v2/list";
    this.imageResource = null;
    this.activeTile = -1;
  }

  shuffleInputArray() {
    let len = this.size * 2;
    let i;
    for(let i = len - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.inputArray[j];
      this.inputArray[j] = this.inputArray[i];
      this.inputArray[i] = temp;
    }
  }

  createInputArray() {
    for(let i = 0; i < this.size; i++) {
      this.inputArray.push(i+1);
      this.inputArray.push(i+1);
    }
    this.shuffleInputArray();
  }

  fetchImageResource() {
    fetch(this.imageResourceURL).then(response => {
      return response.json();
    }).then(data => {
      this.imageResource = data;
    })
  }

  toggleImage(ev) {
    let tile = ev.target;
    let tileIndex = Number(tile.getAttribute('data-value'));
    tile.style.opacity = 1;
    if(this.activeTile !== -1 && this.activeTile !== tileIndex) {
      setTimeout(() => {
        tile.style.opacity = 0;
        this.activeTile = -1;
      }, 1 * 1000);
    }
    this.activeTile = tileIndex;
  }

  bindEvents() {
    let tiles = document.querySelectorAll('.game-tile .image-container');
    tiles.forEach(tile => {
      tile.addEventListener('click', this.toggleImage.bind(this));
    })
  }

  generateBody() {
    this.inputArray.forEach(item => {
      this.container.insertAdjacentHTML('beforeend', `<li class='game-tile'><div class="image-container" data-value="${item}" style="background-image: url(https://picsum.photos/id/${item}/100)"></div><span>${item}</span></li>`);
    });
    this.bindEvents();
  }

  render() {
    this.createInputArray();
    this.generateBody();
    //this.fetchImageResource();
  }
}

let game = new MemoryGame();
game.render();