import SignInForm from '../../components/shared/SignInForm';

export default class SignInPage {
	constructor() {
		this.signInForm = new SignInForm();
	}

	async signIn(user) {
		await this.signInForm.submitSignIn(user);
	}
}
