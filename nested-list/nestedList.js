export default class NestedList extends HTMLElement {
  constructor() {
    super();
    this.data = this.fetchData();
  }
  fetchData() {
    return   [
      {
        "title": "News",
        "id": "news"
      },
      {
        "title": "Blogs",
        "id": "blogs",
        "children": [
          {
            "title": "Today",
            "id": "today"
          },
          {
            "title": "Yesterday",
            "id": "yesterday"
          },
          {
            "title": "Archive",
            "id": "archive"
          }
        ]
      },
      {
        "title": "Links",
        "id": "links",
        "children": [
          {
            "title": "Oracle",
            "id": "oracle",
            "children": [
              {
                "title": "USA",
                "id": "usa",
                "children": [
                  {
                    "title": "Northeast",
                    "id": "northeast"
                  },
                  {
                    "title": "Midwest",
                    "id": "midwest"
                  },
                  {
                    "title": "South",
                    "id": "south"
                  },
                  {
                    "title": "West",
                    "id": "west"
                  }
                ]
              },
              {
                "title": "Europe",
                "id": "europe"
              },
              {
                "title": "Asia",
                "id": "asia",
                "children": [
                  {
                    "title": "Japan",
                    "id": "japan"
                  },
                  {
                    "title": "China",
                    "id": "china"
                  },
                  {
                    "title": "India",
                    "id": "india"
                  }
                ]
              }
            ]
          },
          {
            "title": "IBM",
            "id": "ibm"
          },
          {
            "title": "Microsoft",
            "id": "microsoft"
          }
        ]
      }
    ]
  }
  generateList(data) {
    let fragment = "";
    data.forEach(item => {
      const hasChildren = item.children && item.children .length;
      fragment = fragment + `<li class="${hasChildren ? "hasChildren" : ""}" id="${item.id}">${item.title} 
        ${hasChildren ? this.generateList(item.children) : ""}</li>`;
    });
    return `<ul>${fragment}</ul>`;
  }
  bindActions() {
    const listWithChildren =  document.querySelectorAll(".hasChildren");
    listWithChildren.forEach(element => {
      element.addEventListener('click', (evt) => {
        evt.stopPropagation();
        evt.target.classList.toggle("expanded");
      })
    })
  }
  connectedCallback() {
    const fragment = this.generateList(this.data);
    this.insertAdjacentHTML('beforeend', fragment);
    this.bindActions()
  }
  disconnectedCallback() {

  }
}