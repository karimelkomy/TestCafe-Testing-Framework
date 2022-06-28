import GenericElement from '../../../../shared/core/GenericElement';
import SelectUsersSidebar from './SelectUsersSidebar';
import SelectClientsSidebar from './SelectClientsSidebar';

export default class AddUsers extends GenericElement {
	constructor() {
		super();
		this.selectUsersSidebar = new SelectUsersSidebar();
		this.selectClientsSidebar = new SelectClientsSidebar();
		this.addUsersButton = '//button[@data-test-id="add-users-button"]';
		this.addClientsButton = '//button[@data-test-id="add-Clients-button"]';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async clickAddUsersButton() {
		await this.click(this.addUsersButton);
	}

	async clickAddClientsButton() {
		await this.click(this.addClientsButton);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async addUsers({ usersDetails }) {
		await this.clickAddUsersButton();
		await this.selectUsersSidebar.submitSidebar({ usersDetails });
	}

	async addClients({ clientsDetails }) {
		if (clientsDetails) {
			await this.clickAddClientsButton();
			await this.selectClientsSidebar.submitSidebar({ clientsDetails });
		}
	}

	async submitUser({ usersDetails, clientsDetails }) {
		await this.addUsers({ usersDetails });
		await this.addClients({ clientsDetails });
		await this.clickSaveAndContinueButton();
	}
}
