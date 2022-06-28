import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class VendorDetails extends GenericElement {
	constructor() {
		super();
		this.vendorNameInput = '//input[@data-test-id="vendor-name-input"]';
		this.contactFirstNameInput = '//input[contains(@data-test-id, "first-name-input")]';
		this.contactLastNameInput = '//input[contains(@data-test-id, "last-name-input")]';
		this.registrationNumberInput = '//input[@data-test-id="registration-number-input"]';
		this.taxCertificationNumberInput = '//input[@data-test-id="tax-certification-number-input"]';
		this.emailInput = '//input[@data-test-id="email-input"]';
		this.phoneInput = '//input[@data-test-id="phone-input"]';
		this.vendorClassificationDropdown = '//p-dropdown[@data-test-id="vendor-classification-dropdown"]';
		this.vendorClassificationDropdownItem = '//p-dropdownitem/li[./span[text()="%s"]]';
		this.stateInput = '//input[@data-test-id="province-state-input"]';
		this.streetInput = '//input[@data-test-id="street-input"]';
		this.cityInput = '//input[@data-test-id="city-input"]';
		this.postalCodeInput = '//input[@data-test-id="postal-code-input"]';
		this.countryDropdown = '//p-dropdown[@data-test-id="country-dropdown"]';
		this.countryDropdownItem = '//p-dropdownitem//span[text()="%s"]';
		this.primaryAddressText = '//h3[text()="Primary Address"]';
		this.paymentTermInput = '//input[@placeholder="Payment Term (optional)"]';
		this.shippingTermDropdown = '//p-dropdown[@data-test-id="shipment-terms-dropdown"]';
		this.shippingTermDropdownItem = '//p-dropdownitem//span[text()="%s"]';
		this.approvalPreferencesDropdown = '//p-dropdown[@data-test-id="vendor-order-approval-preferences-dropdown"]';
		this.approvalPreferencesDropdownItem = '//p-dropdownitem//span[text()="%s"]';
		this.saveButton = '//button[@data-test-id="save-button"]';
	}

	async fillVendorName({ vendorName }) {
		await this.fill(this.vendorNameInput, vendorName);
	}

	async fillContactFirstName({ firstName }) {
		await this.fill(this.contactFirstNameInput, firstName);
	}

	async fillContactLastName({ lastName }) {
		await this.fill(this.contactLastNameInput, lastName);
	}

	async fillRegistrationNumber({ registrationNumber }) {
		await this.fill(this.registrationNumberInput, registrationNumber.toString());
	}

	async fillTaxCertificationNumber({ taxCertificationNumber }) {
		await this.fill(this.taxCertificationNumberInput, taxCertificationNumber.toString());
	}

	async fillEmail({ email }) {
		await this.fill(this.emailInput, email);
	}

	async fillPhone({ phone }) {
		await this.fill(this.phoneInput, phone);
	}

	async selectVendorClassification({ vendorClassification }) {
		await this.click(this.vendorClassificationDropdown);
		await this.click(sprintf(this.vendorClassificationDropdownItem, vendorClassification));
	}

	async fillState({ state }) {
		await this.fill(this.stateInput, state);
	}

	async fillStreet({ street }) {
		await this.fill(this.streetInput, street);
	}

	async fillCity({ city }) {
		await this.fill(this.cityInput, city);
	}

	async fillPostalCode({ postalCode }) {
		await this.fill(this.postalCodeInput, postalCode.toString());
	}

	async selectCountry({ country }) {
		await this.click(this.countryDropdown);
		await this.click(sprintf(this.countryDropdownItem, country));
	}

	async fillPaymentTerm({ paymentTerm }) {
		await this.fill(this.paymentTermInput, formatedNumber(paymentTerm, 0));
	}

	async selectShippingTerm({ shippingTerm }) {
		await this.click(this.shippingTermDropdown);
		await this.click(sprintf(this.shippingTermDropdownItem, shippingTerm));
	}

	async selectApprovalPreferences({ approvalPreferences }) {
		await this.click(this.approvalPreferencesDropdown);
		await this.click(sprintf(this.approvalPreferencesDropdownItem, approvalPreferences));
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async submitVendorInfo({ vendorDetails }) {
		const {
			vendorName,
			registrationNumber,
			taxCertificationNumber,
			vendorClassification,
			firstName,
			lastName,
			email,
			phone,
		} = vendorDetails;

		await this.fillVendorName({ vendorName });
		await this.fillRegistrationNumber({ registrationNumber });
		await this.fillTaxCertificationNumber({ taxCertificationNumber });
		await this.selectVendorClassification({ vendorClassification });
		await this.fillContactFirstName({ firstName });
		await this.fillContactLastName({ lastName });
		await this.fillEmail({ email });
		await this.fillPhone({ phone });
	}

	async submitPrimaryAddress({ vendorDetails }) {
		const { state, street, city, postalCode, country } = vendorDetails;

		await this.fillState({ state });
		await this.fillStreet({ street });
		await this.fillCity({ city });
		await this.fillPostalCode({ postalCode });
		await this.selectCountry({ country });
	}

	async submitPreferences({ vendorDetails }) {
		const { paymentTerm, shippingTerm, approvalPreferences } = vendorDetails;

		// await this.fillPaymentTerm({ paymentTerm }); // TODO: optional field
		// await this.selectShippingTerm({ shippingTerm }); // TODO: optional field
		await this.selectApprovalPreferences({ approvalPreferences });
	}

	async submit({ vendorDetails }) {
		await this.submitVendorInfo({ vendorDetails });
		await this.submitPrimaryAddress({ vendorDetails });
		await this.submitPreferences({ vendorDetails });
		await this.clickSaveButton();
	}
}
