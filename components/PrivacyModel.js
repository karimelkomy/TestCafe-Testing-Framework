import GenericElement from "./shared/core/GenericElement";
import { checkElementVisibility } from "../utilities/helpers";

export default class PrivacyModel extends GenericElement {
  constructor() {
    super();
    this.logoText = '//span[text()="Smarter"]';
    this.acceptButton = '//a[contains(text(), "ACCEPT")]';
  }

  async accept() {
    await this.click(this.logoText);

    if (await checkElementVisibility(this.acceptButton)) {
      await this.click(this.acceptButton);
    }
  }
}
