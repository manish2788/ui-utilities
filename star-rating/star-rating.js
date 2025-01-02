import starTemplate from "./star-template.js";

export default class StarRating extends HTMLElement {
  constructor() {
    super();
    this.template = starTemplate;
  }
  connectedCallback() {

  }
  disconnectedCallback() {

  }
}