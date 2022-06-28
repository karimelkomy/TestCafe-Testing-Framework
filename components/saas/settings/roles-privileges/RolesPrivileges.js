import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import CreateRolesPrivileges from './CreateRolesPrivileges';

export default class RolesPrivileges extends GenericElement {
	constructor() {
		super();
		this.createRolesPrivileges = new CreateRolesPrivileges();
		this.createRoleButton = '//button[@label="CREATE ROLE"]';
		this.roleNameText = '//p-table//td[./span[text()="ROLE NAME"]][text()=" %s "]';
		this.roleDescriptionText = '//p-table//td[./span[text()="DESCRIPTION"]][text()=" %s "]';
	}

	async clickCreateRoleButton() {
		await this.click(this.createRoleButton);
	}

	async validateRoleName({ rolesName }) {
		await this.validateElementVisibility(sprintf(this.roleNameText, rolesName[0]));
	}

	async validateRoleDescription({ roleDescription }) {
		await this.validateElementVisibility(sprintf(this.roleDescriptionText, roleDescription));
	}

	async createRoles({ rolesDetails }) {
		for (let roleDetails of rolesDetails) {
			const { rolesName, roleDescription } = roleDetails;

			await this.clickCreateRoleButton();
			await this.createRolesPrivileges.create({ roleDetails });
			await this.validateRoleName({ rolesName });
			await this.validateRoleDescription({ roleDescription });
		}
	}
}
