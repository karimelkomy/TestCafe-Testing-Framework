import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../../../utilities/helpers';
import GenericElement from '../../../../shared/core/GenericElement';

export default class VendorPopup extends GenericElement {
	constructor() {
		super();
		this.vendorNameButton = '//button[.="%s"]';
		this.vendorNameText = '//penny-vendor-profile-overlay//h1[text()=" %s "]';
		this.vendorRegistrationNumberText = '//penny-vendor-profile-overlay//h1/span[contains(., "%s")]';
		this.vendorAddressText = '//penny-vendor-profile-overlay//div/span[contains(text(), "%s")]';
		this.vendorEmailText = '//penny-vendor-profile-overlay//div[@data-test-id="vendor-email-text" and text()="%s"]';
		this.vendorClassificationText = '//penny-vendor-profile-overlay//div[@data-test-id="classification-text" and text()=" %s "]';
	}

	async clickVendorNameButton({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.click(sprintf(this.vendorNameButton, vendorName));
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validateVendorRegistrationNumber({ vendorDetails }) {
		const { registrationNumber } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorRegistrationNumberText, registrationNumber.toString()));
	}

	async validateVendorAddress({ vendorDetails }) {
		const { state, street, city, country, postalCode } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorAddressText, state));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, street));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, city));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, country));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, postalCode));
	}

	async validateVendorEmail({ vendorDetails }) {
		const { email } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorEmailText, email));
	}

	async validateVendorClassification({ vendorDetails }) {
		const { vendorClassification } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorClassificationText, vendorClassification));
	}

	async validate({ vendorDetails }) {
		await this.clickVendorNameButton({ vendorDetails });
		await this.validateVendorName({ vendorDetails });
		await this.validateVendorRegistrationNumber({ vendorDetails });
		await this.validateVendorAddress({ vendorDetails });
		await this.validateVendorEmail({ vendorDetails });
		await this.validateVendorClassification({ vendorDetails });
		await this.clickVendorNameButton({ vendorDetails });
	}
}
