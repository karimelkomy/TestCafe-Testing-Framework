import { sprintf } from "sprintf-js";
import GenericElement from "../shared/core/GenericElement";

export default class SummaryModel extends GenericElement {
  constructor() {
    super();
    this.productNameText = '//app-checkout-summary//h5[text()=" %s "]';
  }

  async validateProductName({ name }) {
    await this.validateElementVisibility(sprintf(this.productNameText, name));
  }
}
