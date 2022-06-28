import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RegisterForm extends GenericElement {
	constructor() {
		super();
		this.registerTab = '//p-tabview//span[.="Register"]';
		this.firstNameInput = '//input[@data-test-id="first-name-input"]';
		this.lastNameInput = '//input[@data-test-id="last-name-input"]';
		this.emailInput = '//input[@data-test-id="email-address-input"]';
		this.passwordInput = '//input[@data-test-id="create-password-input"]';
		this.mobileNumberInput = '//input[@data-test-id="mobile-number-input"]';
		this.entityNameInput = '//input[@data-test-id="entity-name-input"]';
		this.crNumberInput = '//input[@data-test-id="cr-number-input"]';
		this.cityDropdown = '//p-dropdown[@data-test-id="city-dropdown"]';
		this.dropDownItem = '//p-dropdownitem[.="%s"]/li';
		this.termsAndConditionsCheckBox = '//p-checkbox[@data-test-id="terms-and-conditions-dropdown"]';
		this.registerButton = '//button[@data-test-id="register-button"]';
	}

	async switchToRegisterForm() {
		await this.click(this.registerTab);
	}

	async fillFirstName({ firstName }) {
		await this.fill(this.firstNameInput, firstName);
	}

	async fillLastName({ lastName }) {
		await this.fill(this.lastNameInput, lastName);
	}

	async fillEmail({ email }) {
		await this.fill(this.emailInput, email);
	}

	async fillPassword({ password }) {
		await this.fill(this.passwordInput, password);
	}

	async fillPhoneNumber({ mobileNumber }) {
		await this.fill(this.mobileNumberInput, mobileNumber);
	}

	async fillEntityName({ entityName }) {
		await this.fill(this.entityNameInput, entityName);
	}

	async fillCrNumber({ crNumber }) {
		await this.fill(this.crNumberInput, crNumber);
	}

	async selectCity({ city }) {
		await this.click(this.cityDropdown);
		await this.click(sprintf(this.dropDownItem, city));
	}

	async clickTosCheckBox() {
		await this.click(this.termsAndConditionsCheckBox);
	}

	async clickRegisterButton() {
		await this.click(this.registerButton);
	}

	async registerBuyer(marketplaceBuyerDetails) {
		await this.switchToRegisterForm();

		await this.fillFirstName(marketplaceBuyerDetails);
		await this.fillLastName(marketplaceBuyerDetails);
		await this.fillEmail(marketplaceBuyerDetails);
		await this.fillPassword(marketplaceBuyerDetails);
		await this.fillPhoneNumber(marketplaceBuyerDetails);
		await this.fillEntityName(marketplaceBuyerDetails);
		await this.fillCrNumber(marketplaceBuyerDetails);
		await this.selectCity(marketplaceBuyerDetails);

		await this.clickTosCheckBox();
		await this.clickRegisterButton();
	}
}
