import GenericElement from '../../../../shared/core/GenericElement';
import SelectUsersSidebar from './SelectUsersSidebar';

export default class Users extends GenericElement {
	constructor() {
		super();
		this.selectUsersSidebar = new SelectUsersSidebar();
		this.addUsersButton = '//button[@data-test-id="add-remove-users-button"]';
	}

	async clickAddUsersButton() {
		await this.click(this.addUsersButton);
	}

	async submitUser({ usersDetails }) {
		await this.clickAddUsersButton();
		await this.selectUsersSidebar.submitSidebar({ usersDetails });
	}
}
