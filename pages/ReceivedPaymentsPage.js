import ReceivedPaymentsList from "../components/saas/received-payments/ReceivedPaymentsList";
import Receipt from "../components/saas/received-payments/Receipt";
import ReceivedPaymentSubmitFooter from "../components/saas/received-payments/ReceivedPaymentSubmitFooter";
import RecievedPaymentBankSummary from "../components/saas/received-payments/RecievedPaymentBankSummary";
import ReceivedPaymentTable from "../components/saas/received-payments/ReceivedPaymentTable";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class ReceivedPaymentsPage {
  constructor() {
    this.receivedPaymentsList = new ReceivedPaymentsList();
    this.receipt = new Receipt();
    this.receivedPaymentSubmitFooter = new ReceivedPaymentSubmitFooter();
    this.recievedPaymentBankSummary = new RecievedPaymentBankSummary();
    this.receivedPaymentTable = new ReceivedPaymentTable();
    this.modulesSideBar = new ModulesSideBar();
  }

  async submitRecievedPayments({ productRequest }) {
    await this.modulesSideBar.clickReceivedPaymentLink();

    await this.receivedPaymentsList.submit({ productRequest });

    await this.receipt.validate();

    await this.receivedPaymentTable.validatePaymentTable({ productRequest });

    await this.recievedPaymentBankSummary.validate({ productRequest });

    await this.receivedPaymentSubmitFooter.submit();

    await this.receipt.validate();

    await this.receivedPaymentTable.validatePaymentTable({ productRequest });

    await this.recievedPaymentBankSummary.validate({ productRequest });
  }
}
