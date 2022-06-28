import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { removeCommaSeperatorFromNumber } from '../../../utilities/helpers';

export default class VendorCredit extends GenericElement {
	constructor() {
		super();
		this.vendorNameText = '//span[@data-test-id="vendor-name" and contains(text(), "%s")]';
		this.totalCreditAvailable = '//span[@data-test-id="total-credit-available-%s-text" and contains(., "%s")]';
		this.intigerTotalCreditAvailable = '//span[@data-test-id="total-credit-available-price-text"]';
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async getTotalCreditAvailable() {
		return parseFloat(removeCommaSeperatorFromNumber(await this.getText(this.intigerTotalCreditAvailable)));
	}

	async validateTotalCreditAvailable({ availableCredit, organizationDetails }) {
		await this.validatePrice(this.totalCreditAvailable, availableCredit, organizationDetails);
	}

	async validateVendorCreditSection({ availableCredit, vendorDetails, organizationDetails }) {
		await this.validateVendorName({ vendorDetails });
		await this.validateTotalCreditAvailable({ availableCredit, organizationDetails });
	}
}
