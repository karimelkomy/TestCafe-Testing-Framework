import GrnsList from "../components/saas/grns/GrnsList";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class GrnsPage {
  constructor() {
    this.grnsList = new GrnsList();
    this.modulesSideBar = new ModulesSideBar();
  }

  async openFirstGrn({ productRequest }) {
    const {
      requestDetails,
      workspaceDetails,
      requesterUserDetails
    } = productRequest;

    await this.modulesSideBar.clickGrnLink();

    await this.grnsList.selectFirstGrn({
      requestDetails,
      workspaceDetails,
      requesterUserDetails
    });
  }

  async openClientFirstGrn({ productRequest }) {
    const {
      requestDetails,
      workspaceDetails,
      clientRequesterUserDetails
    } = productRequest;

    await this.modulesSideBar.clickGrnLink();

    await this.grnsList.selectFirstGrn({
      requestDetails,
      workspaceDetails,
      requesterUserDetails: clientRequesterUserDetails
    });
  }
}
