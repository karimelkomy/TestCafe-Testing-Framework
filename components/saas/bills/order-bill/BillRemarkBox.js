import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class BillRemarkBox extends GenericElement {
	constructor() {
		super();
		this.remarkInput = '//p-editor[@data-test-id="comments-input"]//div[contains(@class, "ql-blank")]';
		this.invoiceRemarkText = '//div[@class="comments-container"]//div[./span[contains(text(), "VENDOR REMARKS")]]//p[text()="%s"]';
		this.billRemarkText = '(//div[@class="comments-container"]//p[text()="%s"])[1]';
		this.uploadInvoiceInput = '//penny-upload//input';
		this.uploadedInvoiceChip = '//a[contains(@class, "file-name")]';
	}

	async fillBillRemark({ billDetails }) {
		const { billRemark } = billDetails;

		await this.fill(this.remarkInput, billRemark);
	}

	async validateInvoiceRemarkText({ invoiceDetails }) {
		const { invoiceRemark } = invoiceDetails;

		await this.validateElementVisibility(sprintf(this.invoiceRemarkText, invoiceRemark));
	}

	async validateBillRemarkText({ billDetails }) {
		const { billRemark } = billDetails;

		await this.validateElementVisibility(sprintf(this.billRemarkText, billRemark));
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.bill, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}

	async submit({ billDetails, invoiceDetails }) {
		await this.validateInvoiceRemarkText({ invoiceDetails });
		await this.fillBillRemark({ billDetails });
	}

	async validateSubmitted({ billDetails, invoiceDetails }) {
		await this.validateInvoiceRemarkText({ invoiceDetails });
		await this.validateBillRemarkText({ billDetails });
	}
}
