import { sprintf } from "sprintf-js";
import GenericElement from "../shared/core/GenericElement";

export default class ProductItem extends GenericElement {
  constructor() {
    super();
    this.element =
      '//div[contains(@class, "product-item")][.//h3[text()=" %s"]]';
    this.addToCartButton = `${this.element}//button[.="Add to cart"]`;
    this.priceText = `${this.element}//h5[contains(., "%s")]`;
  }

  async clickAddToCartButton({ name, price }) {
    await this.hover(sprintf(this.priceText, name, price));
    await this.click(sprintf(this.addToCartButton, name));
  }

  async validateProductPrice({ name, price, currency }) {
    await this.validateElementVisibility(
      sprintf(this.priceText, name, currency)
    );
    await this.validateElementVisibility(sprintf(this.priceText, name, price));
  }

  async submit({ productDetails }) {
    await this.validateProductPrice(productDetails);
    await this.clickAddToCartButton(productDetails);
  }
}
