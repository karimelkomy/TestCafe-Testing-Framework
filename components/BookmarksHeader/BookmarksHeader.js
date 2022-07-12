import { sprintf } from "sprintf-js";
import GenericElement from "../shared/core/GenericElement";
import MenuItems from "./MenuItems";
import { bookmarks } from "../../data/bookmarks";

export default class BookmarksHeader extends GenericElement {
  constructor() {
    super();
    this.menuItems = new MenuItems();
    this.bookmarksText = '//nav//span[text()="%s"]';
  }

  async validateBookmarksVisibility(bookmarks) {
    for (let bookmark of Object.keys(bookmarks)) {
      await this.hover(sprintf(this.bookmarksText, bookmark));
      await this.menuItems.validateMenuItemsVisibility(
        bookmarks[bookmark].list
      );
    }
  }

  async openContactPage() {
    await this.hover(sprintf(this.bookmarksText, bookmarks.Company.title));
    await this.menuItems.openMenuItem(bookmarks.Company.list[0]);
  }
}
