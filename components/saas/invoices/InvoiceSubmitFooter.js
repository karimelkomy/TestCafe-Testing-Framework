import GenericElement from '../../shared/core/GenericElement';

export default class InvoiceSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.submitButton = '//button[@data-test-id="submit-button" and .="SUBMIT"]';
		this.validateEInvoiceButton = '//button[@data-test-id="validate-e-invoice-button"]';
	}

	async submitInvoice() {
		await this.click(this.submitButton);
	}

	async validateEInvoice() {
		await this.click(this.validateEInvoiceButton);
	}
}
