import MarkupsList from "../components/saas/markups/MarkupsList";
import CreateMarkup from "../components/saas/markups/create-markup/CreateMarkup";
import MarkupOverview from "../components/saas/markups/create-markup/MarkupOverview";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class MarkupsPage {
  constructor() {
    this.modulesSideBar = new ModulesSideBar();
    this.markupsList = new MarkupsList();
    this.createMarkup = new CreateMarkup();
    this.markupOverview = new MarkupOverview();
  }

  async createMarkups({ markupDetails }) {
    await this.modulesSideBar.clickMarkupsLink();
    await this.markupsList.clickCreateNewMarkupButton();
    await this.createMarkup.submit({ markupDetails });
    await this.markupsList.clickMarkupIdButton();
    await this.markupOverview.validate({ markupDetails });
  }
}
