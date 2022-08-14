import GenericElement from "../shared/core/GenericElement";

export default class AddonsModel extends GenericElement {
  constructor() {
    super();
    this.closeButton = '//button[contains(@class, "p-dialog-header-close")]';
  }

  async close() {
    await this.click(this.closeButton);
  }
}
