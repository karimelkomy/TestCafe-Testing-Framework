import GenericElement from '../../shared/core/GenericElement';

export default class ActionsDropdown extends GenericElement {
	constructor() {
		super();
		this.element = '//div[contains(@class, "display-none")]';
		this.actionsDropdown = `${this.element}//button[@data-test-id="actions-button"]`;
		this.createAdvanceBillButton = `${this.element}//button[@data-test-id="create-advance-bill-button"]`;
		this.createExpenseBillButton = `${this.element}//button[@data-test-id="create-expense-bill-button"]`;
	}

	async clickActionsDropdown() {
		await this.click(this.actionsDropdown);
	}

	async clickCreateAdvanceBillButton() {
		await this.clickActionsDropdown();
		await this.click(this.createAdvanceBillButton);
	}

	async clickCreateExpenseBillButton() {
		await this.clickActionsDropdown();
		await this.click(this.createExpenseBillButton);
	}
}
