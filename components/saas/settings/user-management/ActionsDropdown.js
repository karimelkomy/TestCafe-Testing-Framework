import GenericElement from '../../../shared/core/GenericElement';

export default class ActionsDropdown extends GenericElement {
	constructor() {
		super();
		this.actionsButton = '//div[contains(@class, "display-none")]//button[@data-test-id="actions-button"]';
		this.createUserButton = '//div[contains(@class, "display-none")]//button[@data-test-id="create-user-button"]';
	}

	async clickActionsButton() {
		await this.click(this.actionsButton);
	}

	async clickCreateUserButton() {
		await this.click(this.createUserButton);
	}

	async openCreateUser(user) {
		await this.clickActionsButton();
		await this.clickCreateUserButton();
	}
}
