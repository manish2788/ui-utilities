const dataSet = [
    {
      "label": "Description",
      "content": "The worlds fastest fidget spinner"
    },
    {
      "label": "Specs",
      "content": "Slime green, low friction ball bearings, with dual finger grips"
    },
    {
      "label": "Reviews",
      "content": "I have one. It's pretty good."
    }
  ];
  
  class TabBar {
    constructor(dataSet) {
      this.dataSet = dataSet;
      this.mainContent = document.querySelector("#main-content");
      this.tabBar = null;
      this.tabContent = null;
    }
    changeTab(ev) {
      let tabEl = ev.target;
      if(!tabEl.classList.contains('active')) {
        let activeTabIndex = this.tabBar.getAttribute('data-tab-active');
        let newTabIndex = tabEl.getAttribute('data-index');
        let activeTab = document.querySelector('.tab-link.active');
        activeTab.classList.toggle("active");
        console.log(this.dataSet[activeTabIndex].content);
        this.tabContent.innerHTML = this.dataSet[newTabIndex].content;
        tabEl.classList.toggle("active");
      }
    }
    addEvents() {
      let tabLinks = document.querySelectorAll(".tab-link");
      tabLinks.forEach(tabLink => {
        tabLink.addEventListener('click', this.changeTab.bind(this));
      })
    }
    render() {
      let template = `
                  <div class="tab-bar" data-tab-active="0">
                      <nav>
                          ${
                              this.dataSet.map((data, index) => {
                                return `<button id="tab-link-${index}" data-index="${index}" class="tab-link ${index===0 ? 'active' : ''}">${data.label}</button>`;
                             }).join("")
                          }
                      </nav>
                      <section class="tab-content">${this.dataSet[0].content}</section>
                  </div>
                  `;
      this.mainContent.innerHTML = template;
      this.tabBar = document.querySelector('.tab-bar');
      this.tabContent = document.querySelector('.tab-content');
      this.addEvents();
    }
  }
  
  let tabBarObj = new TabBar(dataSet);
  tabBarObj.render();