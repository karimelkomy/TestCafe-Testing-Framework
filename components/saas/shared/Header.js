import GenericElement from '../../shared/core/GenericElement';
import { waitForUrlChanged, waitForUrlContains } from '../../../utilities/helpers';
import { urls } from '../../../data/saas/constants/urls';

export default class Header extends GenericElement {
	constructor() {
		super();
		this.userProfileLink = '//div[contains(@class, "penny-header-vendor")]';
		this.myProfileButton = '//a[.="My Profile"]';
		this.logOutButton = '//a[.="Logout"]';
		this.firstNameText = '//penny-header//a[.="%s"]';
		this.pennyHeader = '//penny-header/div[1]';
	}

	async clickUserProfileLink() {
		await this.click(this.userProfileLink);
	}

	async openUserProfile() {
		await this.clickUserProfileLink();
		await this.click(this.myProfileButton);

		await waitForUrlChanged(urls.userProfile);
	}

	async validatePennyHeader() {
		await this.validateElementVisibility(this.pennyHeader);
	}

	async logOut() {
		await this.clickUserProfileLink();
		await this.click(this.logOutButton);

		await waitForUrlContains(urls.buyerLogin);
	}
}
