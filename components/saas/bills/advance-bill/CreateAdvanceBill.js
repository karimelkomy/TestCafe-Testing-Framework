import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class CreateAdvanceBill extends GenericElement {
	constructor() {
		super();
		this.vendorDropdown = '//p-dropdown[@data-test-id="vendor-dropdown"]';
		this.vendorDropdownItem = '//penny-bill-create-advance//p-dropdownitem/li[.="%s"]';
		this.totalAdvanceAmountInput = '//p-inputnumber[@data-test-id="total-advance-amount-input"]//input';
		this.saveButton = '//button[@data-test-id="save-button"]';
	}

	async selectVendor({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.click(this.vendorDropdown);
		await this.click(sprintf(this.vendorDropdownItem, vendorName));
	}

	async fillTotalAdvanceAmount({ billDetails }) {
		const { totalAdvanceAmount } = billDetails;

		await this.fill(this.totalAdvanceAmountInput, formatedNumber(totalAdvanceAmount));
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async create({ bill }) {
		const { vendorDetails, billDetails } = bill;

		await this.selectVendor({ vendorDetails });
		await this.fillTotalAdvanceAmount({ billDetails });
		await this.clickSaveButton();
	}
}
