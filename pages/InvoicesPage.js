import InvoicesList from "../components/saas/invoices/InvoicesList";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class InvoicesPage {
  constructor() {
    this.invoicesList = new InvoicesList();
    this.modulesSideBar = new ModulesSideBar();
  }

  async openGdnsTab() {
    await this.invoicesList.clickGdnsButton();
  }

  async openInvoicesTab() {
    await this.invoicesList.clickInvoicesButton();
  }

  async openFirstSubmittedGdns({ productRequest }) {
    await this.modulesSideBar.clickInvoicesLink();

    await this.openGdnsTab();
    await this.invoicesList.selectFirstSubmittedGdns({ productRequest });
  }

  async openFirstPendingInvoice({ productRequest }) {
    await this.modulesSideBar.clickInvoicesLink();

    await this.openInvoicesTab();
    await this.invoicesList.selectFirstPendingInvoice({ productRequest });
  }
}
