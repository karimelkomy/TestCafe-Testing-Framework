import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class WorkspacesList extends GenericElement {
	constructor() {
		super();
		this.workspaceText = '//div[@role="row"]//span[text()="%s"]';
		this.createWorkspaceButton = '//div[contains(@class, "display-none")]/button[@data-test-id="create-workspace-button"]';
		this.editButton = '//div[@role="row"][.//span[text()="%s"]]//button[.="EDIT"]';
	}

	async clickCreateWorkspaceButton() {
		await this.click(this.createWorkspaceButton);
	}

	async clickEditWorkspaceButton({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.click(sprintf(this.editButton, details.name));
	}
}
