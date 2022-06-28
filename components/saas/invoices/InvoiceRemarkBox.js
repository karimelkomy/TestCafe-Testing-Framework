import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { imagePath } from '../../../data/saas/constants/documentsPath';

export default class InvoiceRemarkBox extends GenericElement {
	constructor() {
		super();
		this.remarkInput = '//p-editor[@data-test-id="comments-input"]//div[contains(@class, "ql-blank")]';
		this.remarkText = '//p-editor[@data-test-id="comments-input"]//p[text()= "%s"]';
		this.uploadInvoiceInput = '//penny-upload//input';
		this.uploadedInvoiceChip = '//a[contains(@class, "file-name") and text()=" invoice.jpeg "]';
	}

	async fillInvoiceRemark({ invoiceDetails }) {
		const { invoiceRemark } = invoiceDetails;

		await this.fill(this.remarkInput, invoiceRemark);
	}

	async validateRemarkText({ invoiceDetails }) {
		const { invoiceRemark } = invoiceDetails;

		await this.validateElementVisibility(sprintf(this.remarkText, invoiceRemark));
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.invoice, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}

	async submit({ productRequest }) {
		const { invoiceDetails } = productRequest;

		await this.fillInvoiceRemark({ invoiceDetails });
		await this.uploadInvoice();
		await this.validateUploadedInvoice();
	}

	async validateSubmitted({ productRequest }) {
		const { invoiceDetails } = productRequest;

		await this.validateRemarkText({ invoiceDetails });
		await this.validateUploadedInvoice();
	}
}
