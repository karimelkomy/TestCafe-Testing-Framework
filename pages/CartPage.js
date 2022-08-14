import AddonsModel from "../components/Cart/AddonsModel";
import SummaryModel from "../components/Cart/SummaryModel";

export default class CartPage {
  constructor() {
    this.addonsModel = new AddonsModel();
    this.summaryModel = new SummaryModel();
  }

  async validateProduct(productDetails) {
    await this.addonsModel.close();
    await this.summaryModel.validateProductName(productDetails);
  }
}
