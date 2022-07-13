import GenericElement from "./core/GenericElement";

export default class CookiesModel extends GenericElement {
  constructor() {
    super();
    this.acceptButton = '//a[text()="ACCEPT"]';
  }

  async accept() {
    await this.click(this.acceptButton);
  }
}
