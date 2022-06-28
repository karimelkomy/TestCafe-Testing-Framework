import GenericElement from '../../shared/core/GenericElement';
import { defaultPassword } from '../../../data/saas/constants/credentials';

export default class SetPassword extends GenericElement {
	constructor() {
		super();
		this.orgNameLabel = '//h1[@data-test-id="org-name-label"]';
		this.orgNameInput = '//input[@data-test-id="org-name-input"]';
		this.emailInput = '//input[@data-test-id="email-input"]';
		this.newPasswordInput = '//input[@data-test-id="password-input"]';
		this.confirmPasswordInput = '//input[@data-test-id="confirm-password-input"]';
		this.continueButton = '//button[@data-test-id="continue-button"]';
	}

	async validateOrgName({ organizationDetails }) {
		const { orgName, vendorName, clientName } = organizationDetails;
		const name = clientName || vendorName || orgName;

		await this.validateElementVisibility(this.orgNameLabel);

		await this.validateInputTextEqual(this.orgNameInput, name);
	}

	async validateEmail({ userDetails }) {
		const { email } = userDetails;

		await this.validateInputTextEqual(this.emailInput, email);
	}

	async fillNewPassword() {
		await this.click(this.newPasswordInput);

		await this.fill(this.newPasswordInput, defaultPassword);
	}

	async fillConfirmPassword() {
		await this.fill(this.confirmPasswordInput, defaultPassword);
	}

	async clickContinueButton() {
		await this.click(this.continueButton);
	}

	async submit({ organizationDetails, userDetails }) {
		await this.wait(2);
		await this.validateOrgName({ organizationDetails });
		await this.validateEmail({ userDetails });
		await this.fillNewPassword();
		await this.fillConfirmPassword();
		await this.clickContinueButton();
	}
}
