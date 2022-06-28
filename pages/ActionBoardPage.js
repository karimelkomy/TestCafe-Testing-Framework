import CreateRequest from "../components/saas/action-board/CreateRequest";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class ActionBoardPage {
  constructor() {
    this.createRequest = new CreateRequest();
    this.modulesSideBar = new ModulesSideBar();
  }

  async createNewRequest() {
    await this.modulesSideBar.clickActionboardLink();

    await this.createRequest.clickCreateRequestButton();
  }

  async createBulkRequest() {
    await this.modulesSideBar.clickActionboardLink();

    await this.createRequest.uploadExcelFileButton();
  }
}
