import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class OrgsList extends GenericElement {
	constructor() {
		super();
		this.createNewOrganizationButton = '//button[@data-test-id="create-new-org-button"]';
		this.orgIdButton = '//div[@role="row"][.//div[@col-id="orgName" and .="%s"]]/div[@col-id="orgId"]';
	}

	async clickCreateNewOrganizationButton() {
		await this.click(this.createNewOrganizationButton);
	}

	async clickOrgIdButton({ orgName }) {
		await this.click(sprintf(this.orgIdButton, orgName));
	}
}
