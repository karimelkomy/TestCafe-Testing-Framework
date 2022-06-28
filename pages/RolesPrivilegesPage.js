import RolesPrivileges from "../components/saas/settings/roles-privileges/RolesPrivileges";
import SettingsNavigationBar from "../components/saas/settings/SettingsNavigationBar";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class RolesPrivilegesPage {
  constructor() {
    this.rolesPrivileges = new RolesPrivileges();
    this.settingsNavigationBar = new SettingsNavigationBar();
    this.modulesSideBar = new ModulesSideBar();
  }

  async createNewRoles({ rolesDetails }) {
    await this.modulesSideBar.clickSettingsLink();

    await this.settingsNavigationBar.clickRolesPrivilegesTab();

    await this.rolesPrivileges.createRoles({ rolesDetails });
  }
}
