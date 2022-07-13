import GenericElement from "../shared/core/GenericElement";
import { waitForUrlChanged } from "../../utilities/helpers";
import { urls } from "../../data/urls";

export default class CareersSection extends GenericElement {
  constructor() {
    super();
    this.openPositionsButton =
      '//button[contains(@class, "contact-label-code")]';
  }

  async clickOpenPositionsButton() {
    await this.click(this.openPositionsButton);

    await waitForUrlChanged(urls.careers.joinUs);
  }
}
