import { sprintf } from "sprintf-js";
import GenericElement from "./shared/core/GenericElement";

export default class SearchModel extends GenericElement {
  constructor() {
    super();
    this.searchButton = '//button[@aria-label="Open search"]';
    this.searchInput = '//input[@type="search"]';
    this.searchResult = '//div[@class="ct-div-block" and contains(., "%s")]';
  }

  async clickSearchButton() {
    await this.click(this.searchButton);
  }

  async fillSearchInput(searchInput) {
    await this.fill(this.searchInput, searchInput);
    await this.pressEnter();
  }

  async validateSearchResult(searchResult) {
    await this.validateElementVisibility(
      sprintf(this.searchResult, searchResult)
    );
  }

  async search(searchInput, searchResult) {
    await this.clickSearchButton();
    await this.fillSearchInput(searchInput);
    await this.validateSearchResult(searchResult);
  }
}
