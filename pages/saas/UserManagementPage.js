import UserManagement from '../../components/saas/settings/user-management/UserManagement';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';
import SettingsNavigationBar from '../../components/saas/settings/SettingsNavigationBar';

export default class UserManagementPage {
	constructor() {
		this.settingsNavigationBar = new SettingsNavigationBar();
		this.userManagement = new UserManagement();
		this.modulesSideBar = new ModulesSideBar();
	}

	async validateUser({ userDetails }) {
		await this.modulesSideBar.clickSettingsLink();

		await this.settingsNavigationBar.clickUserManagementTab();

		await this.userManagement.validateUser({ userDetails });
	}

	async createNewUsers({ usersDetails }) {
		await this.modulesSideBar.clickSettingsLink();

		await this.settingsNavigationBar.clickUserManagementTab();

		await this.userManagement.createUsers({ usersDetails });
	}
}
