import GenericElement from '../../../shared/core/GenericElement';
import { getNumberFromText } from '../../../../utilities/helpers';

export default class BillSuccess extends GenericElement {
	constructor() {
		super();
		this.successBillMessage = '//penny-bill-success//h4[@data-test-id="well-done-message"]';
		this.billIdText = '//penny-bill-success//a';
	}

	async validateBillSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successBillMessage);
	}

	async getBillId() {
		const billText = await this.getText(this.billIdText);

		return getNumberFromText(billText);
	}

	async clickBillId() {
		await this.click(this.billIdText);
	}

	async submit() {
		await this.validateBillSubmittedSuccessfully();
		const createdBillId = await this.getBillId();
		await this.clickBillId();

		return createdBillId;
	}
}
