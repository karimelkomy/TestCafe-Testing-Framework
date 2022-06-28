import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ApprovalWorkflow from './approval-workflow/ApprovalWorkflow';
import WorkspaceSuccess from './WorkspaceSuccess';
import Users from './users/Users';

export default class EditWorkspace extends GenericElement {
	constructor() {
		super();
		this.approvalWorkflow = new ApprovalWorkflow();
		this.users = new Users();
		this.workspaceSuccess = new WorkspaceSuccess();
		this.overviewTab = '//a[.="Overview"]';
		this.usersTab = '//a[.="Users"]';
		this.locationTab = '//a[.="Location"]';
		this.budgetsTab = '//a[.="Budgets"]';
		this.addedUserText = '//tr[@data-test-id="added-user-row"]//button/span[text()="%s"]';
		this.approvalWorkflowTab = '//a[.="Approval workflow"]';
		this.saveButton = '//div[@class="product-footer"]//button[@data-test-id="save-button"]';
	}

	async clickOverviewTab() {
		await this.click(this.overviewTab);
	}

	async clickUsersTab() {
		await this.click(this.usersTab);
	}

	async clickLocationTab() {
		await this.click(this.locationTab);
	}

	async clickBudgetsTab() {
		await this.click(this.budgetsTab);
	}

	async clickApprovalWorkflowTab() {
		await this.click(this.approvalWorkflowTab);
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async validateAddedUsers({ usersDetails }) {
		for (const userDetails of usersDetails) {
			const { firstName, lastName } = userDetails;

			await this.validateElementVisibility(sprintf(this.addedUserText, `${firstName} ${lastName}`));
		}
	}

	async editApprovalWorkflow({ approvalWorkflowsDetails }) {
		await this.clickApprovalWorkflowTab();

		for (const approvalWorkflowDetails of approvalWorkflowsDetails) {
			await this.approvalWorkflow.addApprovalWorkflow({ approvalWorkflowDetails });
			await this.wait(2);
		}

		await this.clickSaveButton();
		await this.workspaceSuccess.submit();
	}

	async editUsers({ usersDetails }) {
		await this.clickUsersTab();
		await this.users.submitUser({ usersDetails });
		await this.validateAddedUsers({ usersDetails });
		await this.clickSaveButton();
		await this.workspaceSuccess.submit();
	}
}
