import BillSuccess from "../components/saas/bills/advance-bill/BillSuccess";
import CreateAdvanceBill from "../components/saas/bills/advance-bill/CreateAdvanceBill";
import AdvanceBill from "../components/saas/bills/advance-bill/AdvanceBill";

export default class AdvanceBillPage {
  constructor() {
    this.createAdvanceBill = new CreateAdvanceBill();
    this.advanceBill = new AdvanceBill();
    this.billSuccess = new BillSuccess();
  }

  async createBill({ bill }) {
    await this.createAdvanceBill.create({ bill });

    const billId = await this.billSuccess.submit();

    bill.setBillId(billId);
  }

  async submitBill({ bill }) {
    await this.advanceBill.submit({ bill });

    await this.billSuccess.submit();

    await this.advanceBill.validateSubmitted({ bill });
  }
}
