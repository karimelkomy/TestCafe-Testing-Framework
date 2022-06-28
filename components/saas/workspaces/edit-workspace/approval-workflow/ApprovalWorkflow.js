import GenericElement from '../../../../shared/core/GenericElement';
import SelectUsersSidebar from './SelectUsersSidebar';
import approvalWorkflow from '../../../../../data/saas/constants/approvalWorkflow';

export default class ApprovalWorkflow extends GenericElement {
	constructor() {
		super();
		this.selectUsersSidebar = new SelectUsersSidebar();
		this.requestsTab = '//a[.="Requests"]';
		this.eSourceTab = '//a[.="E-Source"]';
		this.pendingOffersTab = '//a[.="Pending Offers"]';
		this.ordersTab = '//a[.="Orders"]';
		this.billsTab = '//a[.="Bills"]';
		this.addApprovalLevelLink = '//div[@aria-hidden="false"]//button[@data-test-id="add-approval-level-button"]';
		this.addApproverButton = '//div[@aria-hidden="false"]//button[@label="+ Add Approver"]';
		this.editApproverLevelNameButton = '(//div[@aria-hidden="false"]//mat-icon)[1]';
		this.approverLevelNameInput = '//div[@aria-hidden="false"]//input[@data-test-id="enter-name-input"]';
		this.confirmApproverLevelNameButton = '//div[@aria-hidden="false"]//div[./input[@data-test-id="enter-name-input"]]//mat-icon';
	}

	async clickRequestsTab() {
		await this.click(this.requestsTab);
	}

	async clickEsourceTab() {
		await this.click(this.eSourceTab);
	}

	async clickPendingOffersTab() {
		await this.click(this.pendingOffersTab);
	}

	async clickOrdersTab() {
		await this.click(this.ordersTab);
	}

	async clickBillsTab() {
		await this.click(this.billsTab);
	}

	async clickAddApprovalLevelLink() {
		await this.click(this.addApprovalLevelLink);
	}

	async clickAddApproverButton() {
		await this.click(this.addApproverButton);
	}

	async selectApprovalModule({ workflowModule }) {
		if (workflowModule === approvalWorkflow.REQUESTS_APPROVER) {
			await this.clickRequestsTab();
		} else if (workflowModule === approvalWorkflow.ESOURCE_APPROVER) {
			await this.clickEsourceTab();
		} else if (workflowModule === approvalWorkflow.PENDING_OFFERS_AOORIVER) {
			await this.clickPendingOffersTab();
		} else if (workflowModule === approvalWorkflow.ORDERS_APPROVER) {
			await this.clickOrdersTab();
		} else if (workflowModule === approvalWorkflow.BILLS_APPROVER) {
			await this.clickBillsTab();
		}
	}

	async editApproverLevelName(approvalWorkflow) {
		await this.click(this.editApproverLevelNameButton);
		await this.fill(this.approverLevelNameInput, approvalWorkflow);
		await this.click(this.confirmApproverLevelNameButton);
	}

	async addApprovalWorkflow({ approvalWorkflowDetails }) {
		const { workflowModule, workflowUsers } = approvalWorkflowDetails;

		// TODO: add validation for the added approver
		await this.selectApprovalModule({ workflowModule });
		await this.clickAddApprovalLevelLink();
		await this.clickAddApproverButton();
		await this.selectUsersSidebar.submitSidebar({ usersDetails: workflowUsers });
		await this.editApproverLevelName(workflowModule);
	}
}
