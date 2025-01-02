import { communicator } from "./communicator.js";
import { Name } from "./name.js";
import { Country } from "./country.js";
import { CountryListView } from "./countryListView.js";
import { NameListView } from "./nameListView.js";


class App {
  constructor() {
    this.nameModule = new Name();
    this.nameListViewModule = new NameListView;
    this.countryModule = new Country();
    this.countryListViewModule = new CountryListView;
  }
}

const app = new App();