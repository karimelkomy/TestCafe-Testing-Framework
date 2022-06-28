import CreateNewOrg from '../../components/saas/orgs/CreateNewOrg';
import OrgsList from '../../components/saas/orgs/OrgsList';
import OrgDetails from '../../components/saas/orgs/OrgDetails';

export default class CreateOrgPage {
	constructor() {
		this.orgsList = new OrgsList();
		this.createNewOrg = new CreateNewOrg();
		this.orgDetails = new OrgDetails();
	}

	async create({ organizationDetails, superAdminUserDetails }) {
		await this.orgsList.clickCreateNewOrganizationButton();
		await this.createNewOrg.submit({ organizationDetails, superAdminUserDetails });
		await this.orgsList.clickOrgIdButton(organizationDetails);
		await this.orgDetails.validateOrgInfo({ organizationDetails, superAdminUserDetails });
	}
}
