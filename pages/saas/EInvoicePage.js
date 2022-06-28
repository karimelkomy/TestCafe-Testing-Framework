import EInvoiceHeader from '../../components/saas/eInvoice/EInvoiceHeader';
import EInvoiceCardDetails from '../../components/saas/eInvoice/EInvoiceCardDetails';
import EInvoiceProductAndServiceTable from '../../components/saas/eInvoice/EInvoiceProductAndServiceTable';
import EInvoicePriceSummary from '../../components/saas/eInvoice/EInvoicePriceSummary';
import InvoiceSubmitFooter from '../../components/saas/invoices/InvoiceSubmitFooter';

export default class EInvoicePage {
	constructor() {
		this.eInvoiceHeader = new EInvoiceHeader();
		this.eInvoiceCardDetails = new EInvoiceCardDetails();
		this.eInvoiceProductAndServiceTable = new EInvoiceProductAndServiceTable();
		this.eInvoicePriceSummary = new EInvoicePriceSummary();
		this.invoiceSubmitFooter = new InvoiceSubmitFooter();
	}

	async submitEInvoice({ productRequest }) {
		const { organizationDetails, clientDetails } = productRequest;

		await this.invoiceSubmitFooter.validateEInvoice();
		await this.eInvoiceHeader.validateEInvoiceValidation();
		await this.eInvoiceCardDetails.validate({ cardDetails: clientDetails });
		await this.eInvoiceCardDetails.validate({ cardDetails: organizationDetails });
		await this.eInvoiceProductAndServiceTable.validate({ productRequest });
		await this.eInvoicePriceSummary.validate({ productRequest });
	}
}
