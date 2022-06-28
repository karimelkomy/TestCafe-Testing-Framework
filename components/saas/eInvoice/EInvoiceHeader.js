import GenericElement from '../../shared/core/GenericElement';

export default class EInvoiceHeader extends GenericElement {
	constructor() {
		super();
		this.eInvoiceValidationIcon = '//div[./span[text()="E-Invoice"]]//mat-icon[text()="check_circle"]';
	}

	async validateEInvoiceValidation() {
		await this.validateElementVisibility(this.eInvoiceValidationIcon);
	}
}
