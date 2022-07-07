/**
 * Author : Manish Kumar (manish2788@gmail.com)
 */
class Carousel extends HTMLElement {
  static TEMPLATES = {
    carousel : `<div class="carousel-container">
      <div class="search-container">
        <input id="search-input" type="search" />
        <button id="search">Search</button>
        <button id="reset">Reset</button>
      </div>
      <ul class="album-list">
        <li>Loading...</li>
      </ul>
      <nav class="action-buttons"></nav>
    </div>`
  }

  static get observedAttributes() {
    return ['data-active-page']
  }

  constructor() {
    super();
    this.dataURL = this.getAttribute('data-url');
    this.data = null;
    this.imageCountPerPage = 10;

    let activePage = Number(this.getAttribute('data-active-page'));
    this.activePage =  activePage ? activePage : 1;
    this.pageButtons = null;
  }

  /**
   * Gets called when component is loaded in DOM
   */
  connectedCallback() {
    this.innerHTML = Carousel.TEMPLATES.carousel;
    this.parseDOM();
    this.fetchData();
  }

  /**
   * In built custom element observer
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if(oldValue && attrName === 'data-active-page') {
      if(oldValue !== newValue) {
        this.activePage = Number(newValue);
        this.toggleAlbum(oldValue, newValue);
      }
    }
  }

  /**
   * Fetch the required DOM elements required for app feature
   */
  parseDOM() {
    this.container = document.querySelector('.album-list');
    this.actionButtonContainer = document.querySelector('.action-buttons');
    this.searchInput = document.getElementById('search-input');
    this.searchButton = document.getElementById('search');
    this.resetButton = document.getElementById('reset');
    this.albums = null;
  }
  
  /**
   * Fetch resources from REST API
   */
  fetchData() {
    fetch(this.dataURL).then(response => response.json()).then(data => {
      this.data = data;
      this.render();
    });
  }

  /**
   * Builds the HTML and renders on screen
   */
  render() {
    this.renderThumbnails();
    this.renderPagination();
    this.bindEvents();
  }

  /**
   * Renders thumnails
   */
  renderThumbnails() {
    this.container.innerHTML= this.data.map((album, index) => {
      return `
        <div data-value="${index}" class="album ${index > this.imageCountPerPage - 1 ? 'hide' : ''}">
          <a href="${album.url}">
            <img src="${album.thumbnailUrl}" />
          </a>
          <p class="title">${album.title}</p>
        </div>
        `
    }).join('');
    this.albums = document.querySelectorAll('.album-list .album');
  }

  /**
   * Renders pagination
   */
  renderPagination() {
    const pageCount = Number(this.data.length / 10);
    let buttonsTemplate = '';
    for (let index = 1; index <= pageCount; index++) {
      buttonsTemplate = buttonsTemplate + 
        `<button data-value="${index}" class="${index === this.activePage ? 'active' : ''}">${index}</button>`;
    }
    this.actionButtonContainer.innerHTML = buttonsTemplate;
  }

  /**
   * Handles Click events on Page buttons
   */
  pageButtonActionListener(evt) {
    let clickedPageButton = evt.target;
    let pageNumber = Number(clickedPageButton.getAttribute('data-value'));
    
    this.pageButtons[this.activePage - 1].classList.toggle('active');
    clickedPageButton.classList.toggle('active');

    this.setAttribute('data-active-page', pageNumber);
  }

  /**
   * Handles search feature
   */
  search(evt) {
    let searchText = this.searchInput.value;
    this.data.forEach((albumTitle, index) => {
      if(albumTitle.title.indexOf(searchText) !== -1) {
        this.albums[index].classList.remove('hide');
      }
      else {
        this.albums[index].classList.add('hide');
      }
    })
  }

  /**
   * Handles reset feature
   */
  reset(evt) {
    this.searchInput.value = '';
    this.setAttribute('data-active-page', 1);
    this.activePage = 1;
    this.albums.forEach((album, index) => {
      if(index < 10) {
        this.albums[index].classList.remove('hide');
      }
      else {
        this.albums[index].classList.add('hide');
      }
    })
  }

  /**
   * Binds JavaScript Events
   */
  bindEvents() {
    this.pageButtons = document.querySelectorAll('.action-buttons button');

    this.pageButtons.forEach(pageButton => {
      pageButton.addEventListener('click', this.pageButtonActionListener.bind(this));
    })

    this.searchButton.addEventListener('click', this.search.bind(this));
    this.resetButton.addEventListener('click', this.reset.bind(this));
  }

  /**
   * Hide and shows the needed thumbnail on user action
   */
  toggleAlbum(oldValue, newValue) {
    //Show New Page
    for(let i = newValue*10 - 10; i < newValue*10 ; i++) {
      this.albums[i].classList.toggle('hide');
    }
    //Hide Previous Page
    for(let i = oldValue*10 - 10; i < oldValue*10 ; i++) {
      this.albums[i].classList.toggle('hide');
    }
  }
}
customElements.define('carousel-app', Carousel);