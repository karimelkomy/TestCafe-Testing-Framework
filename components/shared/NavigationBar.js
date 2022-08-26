import GenericElement from "./core/GenericElement";
import { waitForUrlChanged } from "../../utilities/helpers";
import { urls } from "../../data/urls";

export default class NavigationBar extends GenericElement {
  constructor() {
    super();
    this.flowersAndJewelryTab =
      '//div[@id="menu"]//a[text()="Flowers and Jewelry "]';
  }

  async navToFlowersAndJewelryPage() {
    await this.click(this.flowersAndJewelryTab);

    await waitForUrlChanged(urls.flowersAndJewelryTab);
  }
}
