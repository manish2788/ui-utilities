class BarChart extends HTMLElement {
  constructor() {
    super();
  }
  renderBars() {
    const barContainer = document.querySelector('.bars');
    for(let i = 0; i < 9; i++) {
      let val = new Date().getTime()%100;
      barContainer.insertAdjacentHTML('beforeend', `<div style="height:${val}px">${val}</div>`);
    }
    
  }
  connectedCallback() {
    this.innerHTML = document.querySelector("template#bar-chart").innerHTML;
    this.renderBars()
  }
}

customElements.define("bar-chart", BarChart);