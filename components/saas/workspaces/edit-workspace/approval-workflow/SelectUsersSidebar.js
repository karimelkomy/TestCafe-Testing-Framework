import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class SelectUsersSidebar extends GenericElement {
	constructor() {
		super();
		this.element = '//p-sidebar[@data-test-id="select-users-sidebar"]/div[contains(@class, "p-sidebar-active")]';
		this.addButton = `${this.element}//tr[@data-test-id="user-row"][./td[text()=" %s "]]//button[@data-test-id="add-button"]`;
		this.userChip = `${this.element}//p-chips[contains(.,"%s")]`;
		this.confirmButton = `${this.element}//button[@data-test-id="confirm-button"]`;
	}

	async clickAddButton({ firstName, lastName }) {
		await this.click(sprintf(this.addButton, `${firstName} ${lastName}`));
	}

	async validateUserChipVisibility({ firstName, lastName }) {
		await this.validateElementVisibility(sprintf(this.userChip, `${firstName} ${lastName}`));
	}

	async clickConfirmButton() {
		await this.click(this.confirmButton);
	}

	async submitSidebar({ usersDetails }) {
		for (const userDetails of usersDetails) {
			const { firstName, lastName } = userDetails;

			await this.clickAddButton({ firstName, lastName });
			await this.validateUserChipVisibility({ firstName, lastName });
			await this.wait(1); // TODO: remove once system is more stable
		}

		await this.clickConfirmButton();
	}
}
