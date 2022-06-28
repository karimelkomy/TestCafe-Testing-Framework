import GenericElement from '../../shared/core/GenericElement';

export default class SettingsNavigationBar extends GenericElement {
	constructor() {
		super();
		this.userManagementTab = '//*[text()="User Management"]';
		this.rolesPrivilegesTab = '//*[text()="Roles/Privileges"]';
		this.customizeDataTab = '//*[text()="Customize Data"]';
		this.organizationSettingsTab = '//*[text()="Organizational settings" or text()="Organization Settings"]';
		this.organizationLocationsTab = '//div[text()="Org Locations"]';
	}

	async clickUserManagementTab() {
		await this.click(this.userManagementTab);
	}

	async clickRolesPrivilegesTab() {
		await this.click(this.rolesPrivilegesTab);
	}

	async clickCustomizeDataTab() {
		await this.click(this.customizeDataTab);
	}

	async clickOrganizationSettingsTab() {
		await this.click(this.organizationSettingsTab);
	}

	async clickOrganizationLocationsTab() {
		await this.click(this.organizationLocationsTab);
	} // TODO: move to customize data navigation
}
