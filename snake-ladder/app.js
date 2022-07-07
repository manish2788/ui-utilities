class SnakeLadder {
  constructor() {
    this.container = document.querySelector('.snake-ladder-container');
  }

  render() {
    let lPtr = 10, rPtr = 1;
    for(let i = 0; i < 100; i++) {
      let temp = parseInt(i/10) % 2;
      let order = i;
      if(temp === 1) {
        order = i + lPtr - rPtr;
        lPtr--; rPtr++;
      }
      else {
        lPtr = 10; rPtr = 1;
      }
      this.container.insertAdjacentHTML('beforeend',`<li style="order:${order + 1}"><button>${i + 1}</button></li>`);
    }
  }
}

let game = new SnakeLadder();
game.render();