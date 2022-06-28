import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class VendorOverview extends GenericElement {
	constructor() {
		super();
		this.vendorNameText = '//div[contains(text(), "VENDOR NAME")]/following-sibling::div[contains(text(), "%s")]';
		this.vendorRegistrationNumberText =
			'//div[contains(text(), "Vendor registration number")]/following-sibling::div[contains(text(), "%s")]';
		this.vendorClassificationText = '//div[contains(text(), "Vendor classification")]/following-sibling::div[contains(text(), "%s")]';
		this.vendorEmailText = '//div[contains(text(), "Vendor Email")]/following-sibling::div[contains(text(), "%s")]';
		this.vendorPhoneText = '//div[contains(text(), "Vendor phone")]/following-sibling::div[contains(text(), "%s")]';
		this.vendorAddressText = '//div[contains(text(), "Vendor Address")]/following-sibling::div[contains(., "%s")]';
		this.editVendorButton = '//div[contains(@class, "view-vendor")]//button[@data-test-id="edit-vendor-button"]';
		this.inviteVendorToPennyButton = '//div[contains(@class, "view-vendor")]//button[@data-test-id="invite-vendor-to-penny-button"]';
	}

	async validateVendorName({ vendorName }) {
		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validateRegistrationNumber({ registrationNumber }) {
		await this.validateElementVisibility(sprintf(this.vendorRegistrationNumberText, registrationNumber.toString()));
	}

	async validateVendorClassification({ vendorClassification }) {
		await this.validateElementVisibility(sprintf(this.vendorClassificationText, vendorClassification));
	}

	async validateVendorEmail({ email }) {
		await this.validateElementVisibility(sprintf(this.vendorEmailText, email));
	}

	async validateVendorPhone({ phone }) {
		await this.validateElementVisibility(sprintf(this.vendorPhoneText, phone));
	}

	async editVendor() {
		await this.click(this.editVendorButton);
	}

	async inviteVendorToPenny() {
		await this.click(this.inviteVendorToPennyButton);
	}

	async validateVendorAddress({ state, street, city, postalCode, country }) {
		await this.validateElementVisibility(sprintf(this.vendorAddressText, state));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, street));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, city));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, postalCode));
		await this.validateElementVisibility(sprintf(this.vendorAddressText, country));
	}

	async validateVendorOverview({ vendorDetails }) {
		const { vendorName, registrationNumber, vendorClassification, email, phone, state, street, city, postalCode, country } = vendorDetails;

		await this.validateVendorName({ vendorName });
		await this.validateRegistrationNumber({ registrationNumber });
		await this.validateVendorClassification({ vendorClassification });
		await this.validateVendorEmail({ email });
		await this.validateVendorPhone({ phone });
		await this.validateVendorAddress({ state, street, city, postalCode, country });
	}
}
