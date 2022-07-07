class NavMenu {
    constructor() {
      this.menuLinksData = [{
        "label": "Home",
        "url": "#"
      }, {
        "label": "Contact",
        "url": "#"
      }, {
        "label": "Dropdown",
        "url": "#",
        "childLinks": [{
          "label": "Item 1",
          "url": "#"
        }, {
          "label": "Item 2",
          "url": "#"
        }, {
          "label": "Item 3",
          "url": "#"
        }]
      }]
      
      this.navMenuEl = document.querySelector('.menu-links-container');
    }
    renderList() {
      this.menuLinksData.forEach(link => {
        let childList = "";
        if(link.childLinks) {
          childList = `<ul class="menu-sub-menu">
                          ${link.childLinks.map(childLink => {return `<li><a href="${childLink.url}">${childLink.label}</a></li>`}).join('')}
                        </ul>`
        }
        let listEl = `<li><a href="${link.url}" class="${link.childLinks ? 'hasChild' : ''}">${link.label}</a>${childList}</li>`;
        this.navMenuEl.insertAdjacentHTML('beforeend', listEl);
      });
      this.addEvents();
    }
    
    clickHandler(ev) {
      if(ev.target.classList.contains('hasChild')) {
        ev.preventDefault();
        let subMenu = this.parentElement.querySelector('.menu-sub-menu');
        let displayProp = subMenu.style.display;
        subMenu.style.display = displayProp === 'block' ? 'none' : 'block';
     } 
    }
    
    addEvents() {
      this.menuLinks = document.querySelectorAll('.menu-links-container li > a');
      this.menuLinks.forEach(link => {
        link.addEventListener('click', this.clickHandler);
      });
    }
  }
  
  let navMenu = new NavMenu();
  navMenu.renderList();