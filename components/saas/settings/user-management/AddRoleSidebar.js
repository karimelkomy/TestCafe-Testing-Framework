import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class AddRoleSidebar extends GenericElement {
	constructor() {
		super();
		this.addRolesButton = '//*[@data-test-id="add-roles-button"]';
		this.roleCheckbox = '//p-checkbox[./label[text()="%s"]]';
		this.confirmButton = '//p-sidebar[.//h2[contains(text(), "Add")]]//button[@data-test-id="confirm-button"]';
		this.roleChip = '//p-sidebar[.//h2[contains(text(), "Add")]]//p-chips//li[contains(text(), "%s")]';
	}

	async clickAddRolesButton() {
		await this.click(this.addRolesButton);
	}

	async selectRoleCheckbox({ roleName }) {
		await this.click(sprintf(this.roleCheckbox, roleName));
	}

	async validateRole({ roleName }) {
		await this.validateElementVisibility(sprintf(this.roleChip, roleName));
	}

	async clickConfirmButton() {
		await this.click(this.confirmButton);
	}

	async submit({ rolesName }) {
		if (rolesName) {
			await this.clickAddRolesButton();

			for (const roleName of rolesName) {
				await this.selectRoleCheckbox({ roleName });
				await this.validateRole({ roleName });
			}

			await this.clickConfirmButton();
		}
	}
}
