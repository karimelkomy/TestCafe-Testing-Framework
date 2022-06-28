import GenericElement from '../../../shared/core/GenericElement';

export default class WorkspaceDetails extends GenericElement {
	constructor() {
		super();
		this.workspaceNameInput = '//input[@data-test-id="workspace-name-input"]';
		this.continueButton = '//button[@data-test-id="continue-button"]';
	}

	async fillWorkspaceName({ details }) {
		const { name } = details;

		await this.fill(this.workspaceNameInput, name);
	}

	async clickContinueButton() {
		await this.click(this.continueButton);
	}

	async submitWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		// TODO: add and validate description, start and end date
		await this.fillWorkspaceName({ details });
		await this.clickContinueButton();
	}
}
