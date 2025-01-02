/**
 * @typedef {HTMLElement} Carousel
 * @property {string} dataUrl
 * @property {Array} imageArray
 */

export default class Carousel extends HTMLElement {
  static observedAttributes = ["data-url"];
  constructor() {
    super();
    this.dataUrl = null;
    this.imageArray = [];
    this.activeIndex = 1;
    this.offset = 0;
    this.carouselActions = {
      leftNav : null,
      rightNav :  null
    }
  }
  render() {
    let images = "", navButtons = "";
    this.imageArray.forEach(image => {
      images = images + `<li><img src="${image["download_url"]}" width="200px" height="133px" /></li>`;
      navButtons = navButtons + '<button>o</button>'
    })
    const carouselFragment = `
      <button class="left-nav">&lt;</button>
        <div class="image-container"><ul>${images}</ul><nav>${navButtons}</nav></div>
      <button class="right-nav">&gt;</button>
      `;
      
    
    this.insertAdjacentHTML('beforeend', carouselFragment);
  }
  toggleNavButton() {
    this.carouselActions.leftNav.disabled = this.activeIndex === 1 ? true : false;
    this.carouselActions.rightNav.disabled = this.activeIndex === this.imageArray.length ? true : false;
  }
  changeImage(direction, index) {
    if(direction === 'RIGHT') {
      this.offset = this.offset - 100;
      this.activeIndex++;
    }
    else if(direction === 'LEFT') {
      this.activeIndex--;
      this.offset = this.offset + 100;
    }
    else if(direction === 'JUMP') {
      this.activeIndex = index;
      this.offset = -1 * (index-1) * 100;
    }
    this.querySelector("ul").style.transform = `translateX(${this.offset}%)`;
    this.toggleNavButton();
  }
  bindActions() {
    this.carouselActions.leftNav = this.querySelector(".left-nav");
    this.carouselActions.rightNav = this.querySelector(".right-nav");
    this.carouselActions.jumpNavigations = this.querySelectorAll("nav button");

    this.carouselActions.leftNav.addEventListener('click', this.changeImage.bind(this, 'LEFT'));
    this.carouselActions.rightNav.addEventListener('click', this.changeImage.bind(this, 'RIGHT'));

    this.carouselActions.jumpNavigations.forEach((button, index) => {
      button.addEventListener('click', this.changeImage.bind(this, 'JUMP', index+1))
    })
  }
  initialize() {
    this.render();
    this.bindActions();
    this.toggleNavButton();
  }
  async fetchImages() {
    const response = await fetch(this.dataUrl);
    this.imageArray = await response.json();
    this.initialize();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if(name === "data-url") {
      this.dataUrl = newValue;
    }
  }
  connectedCallback() {
    this.fetchImages();
  }
  disconnectedCallback() {

  }
}