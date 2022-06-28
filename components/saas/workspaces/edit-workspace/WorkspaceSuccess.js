import GenericElement from '../../../shared/core/GenericElement';

export default class WorkspaceSuccess extends GenericElement {
	constructor() {
		super();
		this.successWorkspaceMessage = '//penny-workspace-success//h4[@data-test-id="well-done-message"]';
		this.goToWorkspacesButton = '//penny-workspace-success//button[@data-test-id="go-to-workspaces-button"]';
	}

	async validateWorkspaceSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successWorkspaceMessage);
	}

	async clickGoToWorkspacesButton() {
		await this.click(this.goToWorkspacesButton);
	}

	async submit() {
		await this.validateWorkspaceSubmittedSuccessfully();
		await this.clickGoToWorkspacesButton();
	}
}
