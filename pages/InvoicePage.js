import GdnsForOrder from "../components/saas/invoices/GdnsForOrder";
import InvoiceSuccess from "../components/saas/invoices/InvoiceSuccess";
import InvoiceInfoBox from "../components/saas/invoices/InvoiceInfoBox";
import InvoiceProductAndServiceTable from "../components/saas/invoices/InvoiceProductAndServiceTable";
import InvoicePriceSummary from "../components/saas/invoices/InvoicePriceSummary";
import InvoiceSubmitFooter from "../components/saas/invoices/InvoiceSubmitFooter";
import InvoiceRemarkBox from "../components/saas/invoices/InvoiceRemarkBox";

export default class InvoicePage {
  constructor() {
    this.gdnsForOrder = new GdnsForOrder();
    this.invoiceSuccess = new InvoiceSuccess();
    this.invoiceInfoBox = new InvoiceInfoBox();
    this.invoiceProductAndServiceTable = new InvoiceProductAndServiceTable();
    this.invoicePriceSummary = new InvoicePriceSummary();
    this.invoiceRemarkBox = new InvoiceRemarkBox();
    this.invoiceSubmitFooter = new InvoiceSubmitFooter();
  }

  async submitGdnsForOrder({ productRequest }) {
    await this.gdnsForOrder.submit({ productRequest });

    const invoiceId = await this.invoiceSuccess.submit();

    productRequest.setInvoiceId(invoiceId);
  }

  async submitInvoice({ productRequest }) {
    await this.invoiceInfoBox.validateInvoiceInfoBox({ productRequest });

    await this.invoiceProductAndServiceTable.validateProductAndServiceTable({
      productRequest
    });

    await this.invoicePriceSummary.validateSummary({ productRequest });

    await this.invoiceRemarkBox.submit({ productRequest });

    await this.invoiceSubmitFooter.submitInvoice();

    await this.invoiceInfoBox.validateInvoiceInfoBox({ productRequest });

    await this.invoiceProductAndServiceTable.validateProductAndServiceTable({
      productRequest
    });

    await this.invoicePriceSummary.validateSummary({ productRequest });

    await this.invoiceRemarkBox.validateSubmitted({ productRequest });
  }
}
