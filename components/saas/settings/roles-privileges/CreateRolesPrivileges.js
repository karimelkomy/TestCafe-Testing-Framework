import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import AddPrivilegesSidebar from './AddPrivilegesSidebar';

export default class CreateRolesPrivileges extends GenericElement {
	constructor() {
		super();
		this.addPrivilegesSidebar = new AddPrivilegesSidebar();
		this.roleNameInput = '//input[@data-test-id="role-name-input"]';
		this.roleDescriptionInput = '//input[@data-test-id="role-description-input"]';
		this.addRemovePrivileges = '//button[@data-test-id="add-remove-privileges"]';
		this.privilegeChipText = '//div[./div/h5[contains(text(), "Privileges")]]//p-chips//li[text()=" %s "]';
		this.saveButton = '//button[@label="SAVE"]';
	}

	async fillRoleName({ rolesName }) {
		await this.fill(this.roleNameInput, rolesName[0]);
	}

	async fillRoleDescription({ roleDescription }) {
		await this.fill(this.roleDescriptionInput, roleDescription);
	}

	async clickAddRemovePrivilegesButton() {
		await this.click(this.addRemovePrivileges);
	}

	async validatePrivilegeChip({ privileges }) {
		for (let privilege of privileges) {
			await this.validateElementVisibility(sprintf(this.privilegeChipText, privilege.privilegeName));
		}
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async create({ roleDetails }) {
		const { rolesName, roleDescription, privileges } = roleDetails;

		await this.fillRoleName({ rolesName });
		await this.fillRoleDescription({ roleDescription });
		await this.clickAddRemovePrivilegesButton();
		await this.addPrivilegesSidebar.submit({ privileges });
		await this.validatePrivilegeChip({ privileges });
		await this.clickSaveButton();
	}
}
