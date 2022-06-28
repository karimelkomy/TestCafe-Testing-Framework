import GenericElement from '../../../shared/core/GenericElement';

export default class SignInForm extends GenericElement {
	constructor() {
		super();
		this.signInTab = '//p-tabview//span[.="Sign In"]';
		this.emailInput = '//input[@data-test-id="email-address-input"]';
		this.passwordInput = '//input[@data-test-id="password-input"]';
		this.forgotPasswordButton = '//span[@data-test-id="forgot-password-link"]';
		this.signInButton = '//p-dialog[@data-test-id="sign-in-dialog"]//button[@data-test-id="sign-in-button"]';
	}

	async switchToSignInForm() {
		await this.click(this.signInTab);
	}

	async fillEmail({ email }) {
		await this.fill(this.emailInput, email);
	}

	async fillPassword({ password }) {
		await this.fill(this.passwordInput, password);
	}

	async submit() {
		await this.click(this.signInButton);
	}

	async signIn(marketplaceBuyerDetails) {
		await this.switchToSignInForm();

		await this.fillEmail(marketplaceBuyerDetails);
		await this.fillPassword(marketplaceBuyerDetails);
		await this.submit();
	}
}
