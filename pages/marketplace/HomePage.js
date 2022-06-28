import SignInForm from '../../components/marketplace/homepage/sign-in-popup/SignInForm';
import RegisterForm from '../../components/marketplace/homepage/sign-in-popup/RegisterForm';
import MyProfile from '../../components/marketplace/MyProfile';
import Header from '../../components/marketplace/Header';

export default class HomePage {
	constructor() {
		this.header = new Header();
		this.registerForm = new RegisterForm();
		this.signInForm = new SignInForm();
		this.myProfile = new MyProfile();
	}

	async validateSignedIn(marketplaceBuyerDetails) {
		await this.header.validateSignIn(marketplaceBuyerDetails);
	}

	async validateSignedOut() {
		await this.header.validateSignOut();
	}

	async register(marketplaceBuyerDetails) {
		await this.header.clickSignInButton();
		await this.registerForm.registerBuyer(marketplaceBuyerDetails);
		await this.validateSignedIn(marketplaceBuyerDetails);
		await this.header.openUserProfile(marketplaceBuyerDetails);
		//await this.myProfile.validateUserInfo(marketplaceBuyerDetails); // TODO: enable after profile values are added to the page's HTML.
	}

	async signIn(marketplaceBuyerDetails) {
		await this.header.validateSignOut();
		await this.header.clickSignInButton();
		await this.signInForm.signIn(marketplaceBuyerDetails);
		await this.validateSignedIn(marketplaceBuyerDetails);
	}

	async signOut(marketplaceBuyerDetails) {
		await this.header.clickSignOutButton(marketplaceBuyerDetails);
		await this.validateSignedOut();
	}

	async openSupplierStore({ supplierDetails }) {
		await this.supplierStores.openSupplierStore(supplierDetails);
	}

	async openRfqs(marketplaceBuyerDetails) {
		await this.header.openRfqs(marketplaceBuyerDetails);
	}
}
