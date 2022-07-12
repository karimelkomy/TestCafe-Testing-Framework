import { sprintf } from "sprintf-js";
import GenericElement from "../../components/shared/core/GenericElement";

export default class MenuItems extends GenericElement {
  constructor() {
    super();
    this.menuItem =
      '//div[./a[text()="Main menu"]]//*[text()="%s" and contains(@id, "text")]';
  }

  async validateMenuItemsVisibility(bookmark) {
    for (let menuItem of bookmark) {
      await this.validateElementVisibility(sprintf(this.menuItem, menuItem));
    }
  }

  async openMenuItem(menuItem) {
    await this.click(sprintf(this.menuItem, menuItem));
  }
}
