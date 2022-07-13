import GenericElement from "./core/GenericElement";
import { waitForUrlChanged } from "../../utilities/helpers";
import { urls } from "../../data/urls";

export default class FooterBar extends GenericElement {
  constructor() {
    super();
    this.facebookButton = '//a[./span[contains(@class, "facebook")]]';
  }

  async navToFacebookPage() {
    await this.click(this.facebookButton);

    await waitForUrlChanged(urls.facebook);
  }
}
