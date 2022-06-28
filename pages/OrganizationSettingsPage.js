import SettingsNavigationBar from "../components/saas/settings/SettingsNavigationBar";
import OrganizationSettings from "../components/saas/settings/OrganizationSettings";
import OrganizationLocations from "../components/saas/settings/organization-locations/OrganizationLocations";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";
import { isStc, isEnterprise } from "../utilities/helpers";

export default class OrganizationSettingsPage {
  constructor() {
    this.settingsNavigationBar = new SettingsNavigationBar();
    this.organizationSettings = new OrganizationSettings();
    this.organizationLocations = new OrganizationLocations();
    this.modulesSideBar = new ModulesSideBar();
  }

  async submit({ organizationDetails }) {
    await this.modulesSideBar.clickSettingsLink();
    await this.settingsNavigationBar.clickOrganizationSettingsTab();
    await this.organizationSettings.submit({ organizationDetails });

    if (isEnterprise(organizationDetails) || isStc(organizationDetails)) {
      await this.modulesSideBar.clickSettingsLink();

      await this.settingsNavigationBar.clickCustomizeDataTab();
      await this.settingsNavigationBar.clickOrganizationLocationsTab();

      await this.organizationLocations.submit({ organizationDetails });

      await this.modulesSideBar.clickSettingsLink();

      await this.settingsNavigationBar.clickCustomizeDataTab();
      await this.settingsNavigationBar.clickOrganizationLocationsTab();

      await this.organizationLocations.validate({ organizationDetails });
    }
  }
}
