import GenericElement from '../../../../shared/core/GenericElement';
import SelectUsersSidebar from './SelectUsersSidebar';

export default class AddUsers extends GenericElement {
	constructor() {
		super();
		this.selectUsersSidebar = new SelectUsersSidebar();
		this.usersButton = '//a[.="Users"]';
		this.addUsersButton = '//button[@data-test-id="add-remove-users-button"]';
		this.continueButton = '//button[@data-test-id="continue-button"]';
	}

	async clickUsersButton() {
		await this.click(this.usersButton);
	}

	async clickAddUsersButton() {
		await this.click(this.addUsersButton);
	}

	async clickContinueButton() {
		await this.click(this.continueButton);
	}

	async submitUser({ usersDetails }) {
		await this.clickAddUsersButton();
		await this.selectUsersSidebar.submitSidebar({ usersDetails });
	}
}
