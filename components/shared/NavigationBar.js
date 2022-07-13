import GenericElement from "./core/GenericElement";
import { waitForUrlChanged } from "../../utilities/helpers";
import { urls } from "../../data/urls";

export default class NavigationBar extends GenericElement {
  constructor() {
    super();
    this.companyTab = '//div[@id="navbar"]//a[.="Company"]';
    this.careersTab = '//div[@id="navbar"]//a[.="Careers"]';
  }

  async navToCompanyPage() {
    await this.click(this.companyTab);

    await waitForUrlChanged(urls.company);
  }

  async navToCareersPage() {
    await this.click(this.careersTab);
  }
}
