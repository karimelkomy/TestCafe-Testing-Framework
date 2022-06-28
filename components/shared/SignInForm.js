import GenericElement from './core/GenericElement';
import Header from '../saas/shared/Header';

export default class SignInForm extends GenericElement {
	constructor() {
		super();
		this.header = new Header();
		this.emailInput = '//input[@placeholder="Email Address"]';
		this.passwordInput = '//input[@placeholder="Password"]';
		this.submitButton = '//button[@data-test-id="continue-button"]';
	}

	async fillEmail({ email }) {
		await this.fill(this.emailInput, email);
	}

	async fillPassword({ password }) {
		await this.fill(this.passwordInput, password);
	}

	async submit() {
		await this.click(this.submitButton);
	}

	async submitSignIn({ email, password }) {
		await this.wait(3);
		await this.fillEmail({ email });
		await this.fillPassword({ password });
		await this.submit();
		await this.header.validatePennyHeader();
	}
}
