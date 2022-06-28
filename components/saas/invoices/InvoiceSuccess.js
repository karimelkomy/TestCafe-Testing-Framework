import GenericElement from '../../shared/core/GenericElement';
import { getNumberFromText } from '../../../utilities/helpers';

export default class InvoiceSuccess extends GenericElement {
	constructor() {
		super();
		this.successInvoiceMessage = '//penny-invoice-create-success//h4[@data-test-id="well-done-message"]';
		this.goToInvoicesButton = '//penny-invoice-create-success//button[@data-test-id="go-to-bills-button"]'; // BUG: update data-test-id
		this.invoiceIdText = '//penny-invoice-create-success//span[contains(text(), "Invoice")]';
	}

	async validateInvoiceSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successInvoiceMessage);
	}

	async getInvoiceId() {
		const billText = await this.getText(this.invoiceIdText);

		return getNumberFromText(billText);
	}

	async clickGoToInvoicesButton() {
		await this.click(this.goToInvoicesButton);
	}

	async submit() {
		await this.validateInvoiceSubmittedSuccessfully();
		const createdInvoiceId = await this.getInvoiceId();
		await this.clickGoToInvoicesButton();

		return createdInvoiceId;
	}
}
