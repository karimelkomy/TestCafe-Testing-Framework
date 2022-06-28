import BillsList from "../components/saas/bills/BillsList";
import ActionsDropdown from "../components/saas/bills/ActionsDropdown";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class BillsPage {
  constructor() {
    this.billsList = new BillsList();
    this.actionsDropdown = new ActionsDropdown();
    this.modulesSideBar = new ModulesSideBar();
  }

  async openFirstSubmittedGrns({ productRequest }) {
    await this.modulesSideBar.clickBillsLink();

    await this.billsList.selectFirstSubmittedGrns({ productRequest });
  }

  async openFirstPendingBill({ reimbursementRequest }) {
    await this.modulesSideBar.clickBillsLink();

    await this.openBillsTab();

    await this.billsList.selectFirstPendingBill({ reimbursementRequest });
  }

  async openClientFirstPendingBill({ productRequest }) {
    await this.modulesSideBar.clickBillsLink();

    await this.billsList.selectClientFirstPendingBill({ productRequest });
  }

  async openGrnsTab() {
    await this.billsList.clickGrnsButton();
  }

  async openBillsTab() {
    await this.billsList.clickBillsButton();
  }

  async createAdvanceBill() {
    await this.modulesSideBar.clickBillsLink();

    await this.actionsDropdown.clickCreateAdvanceBillButton();
  }

  async createExpenseBill() {
    await this.modulesSideBar.clickBillsLink();

    await this.actionsDropdown.clickCreateExpenseBillButton();
  }
}
