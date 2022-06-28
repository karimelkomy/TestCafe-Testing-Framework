import { sprintf } from 'sprintf-js';
import GenericElement from '../shared/core/GenericElement';

export default class MyProfile extends GenericElement {
	constructor() {
		super();
		this.fullNameField = '//div[.="%s"]';
		this.firstNameField = '//input[@data-test-id="first-name-input"]';
		this.lastNameField = '//input[@data-test-id="last-name-input"]';
		this.emailIdField = '//input[@data-test-id="email-id-input"and text()="%s"]';
		this.mobileNumberField = '//input[@data-test-id="mobile-number-input"and text()="%s"]';
		this.entityNameField = '//input[@data-test-id="entity-name-input"and text()="%s"]';
		this.crNumberField = '//input[@data-test-id="cr-number-input" and text()="%s"]';
		this.vatNumberField = '//input[@data-test-id="vat-number-input" %s]';
		this.cityField = '//input[@data-test-id="city-input" and text()="%s"]';
		this.countryField = '//input[@data-test-id="country-input" and text()="%s"]';
		this.currencyField = '//input[@data-test-id="currency-input" and text()="%s"]';
		this.mapLocationField = '//input[@data-test-id="map-location-input" and text()="%s"]';
		this.editProfileButton = '//button[@data-test-id="edit-profile-button"]';
		this.saveChangesButton = '//button[@data-test-id="save-changes-button"]';
		this.undoChangesButton = '//button[@data-test-id="undo-changes-button"]';
		this.logOutButton = '//button[@data-test-id="logout-button"]';
	}

	async validateFullName({ firstName, lastName }) {
		await this.validateElementVisibility(sprintf(this.fullNameField, `${firstName} ${lastName}`));
	}

	async validateEmail({ email }) {
		await this.validateElementVisibility(sprintf(this.emailIdField, email));
	}

	async validateMobileNumber({ mobileNumber }) {
		await this.validateElementVisibility(sprintf(this.mobileNumberField, mobileNumber));
	}

	async validateEntityName({ entityName }) {
		await this.validateElementVisibility(sprintf(this.entityNameField, entityName));
	}

	async validateCRNumber({ crNumber }) {
		await this.validateElementVisibility(sprintf(this.crNumberField, crNumber));
	}

	async validateEmptyVATNumber() {
		await this.validateElementVisibility(sprintf(this.vatNumberField, '')); // TODO: check empty validation
	}

	async validateCity({ city }) {
		await this.validateElementVisibility(sprintf(this.cityField, city));
	}

	async validateCountry({ country }) {
		await this.validateElementVisibility(sprintf(this.countryField, country));
	}

	async validateCurrency(organizationDetails) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.currencyField, currencyCode));
	}

	async validateMapLocation({ mapLocation }) {
		await this.validateElementVisibility(sprintf(this.mapLocationField, mapLocation));
	}

	async validateUserInfo(marketplaceBuyerDetails) {
		// TODO: add image upload
		await this.validateFullName(marketplaceBuyerDetails);
		await this.validateEmail(marketplaceBuyerDetails);
		await this.validateMobileNumber(marketplaceBuyerDetails);
		await this.validateEntityName(marketplaceBuyerDetails);
		await this.validateCRNumber(marketplaceBuyerDetails);
		await this.validateEmptyVATNumber(marketplaceBuyerDetails);
		await this.validateCity(marketplaceBuyerDetails);
		await this.validateCountry(marketplaceBuyerDetails);
		await this.validateCurrency(marketplaceBuyerDetails);
		await this.validateMapLocation(marketplaceBuyerDetails);
	}
}
