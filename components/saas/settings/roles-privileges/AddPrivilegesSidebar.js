import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class AddPrivilegesSidebar extends GenericElement {
	constructor() {
		super();
		this.privilegeTitlePlusButton = '//div[contains(@class, "checkbox")][./label[text()="%s"]]//i[contains(@class, "plus")]';
		this.privilegeTitleMinusButton = '//div[contains(@class, "checkbox")][./label[text()="%s"]]//i[contains(@class, "minus")]';
		this.privilegeCheckbox = '//p-checkbox[@name="roleName"][./label[text()="%s"]]';
		this.privilegeChipText = '//p-sidebar//p-chips//li[text()=" %s "]';
		this.confirmButton = '//p-sidebar[.//h2[text()="Add Privileges"]]//button[@data-test-id="confirm-button"]';
	}

	async clickPrivilegeTitlePlusButton({ privilegeTitle }) {
		await this.click(sprintf(this.privilegeTitlePlusButton, privilegeTitle));
	}

	async clickPrivilegeTitleMinusButton({ privilegeTitle }) {
		await this.click(sprintf(this.privilegeTitleMinusButton, privilegeTitle));
	}

	async selectPrivilege({ privilegeName }) {
		await this.click(sprintf(this.privilegeCheckbox, privilegeName));
	}

	async validatePrivilegeChip({ privilegeName }) {
		await this.validateElementVisibility(sprintf(this.privilegeChipText, privilegeName));
	}

	async clickConfirmButton() {
		await this.click(this.confirmButton);
	}

	async submit({ privileges }) {
		for (let privilege of privileges) {
			const { privilegeName, privilegeTitle } = privilege;

			await this.clickPrivilegeTitlePlusButton({ privilegeTitle });
			await this.selectPrivilege({ privilegeName });
			await this.validatePrivilegeChip({ privilegeName });
			await this.clickPrivilegeTitleMinusButton({ privilegeTitle });
		}
		await this.clickConfirmButton();
	}
}
