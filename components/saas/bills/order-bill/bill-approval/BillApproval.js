import GenericElement from '../../../../shared/core/GenericElement';
import RemarkSidebar from './RemarkSidebar';

export default class BillApproval extends GenericElement {
	constructor() {
		super();
		this.remarkSidebar = new RemarkSidebar();
		this.rejectBillButton = '//div[contains(@class, "display-none")]//button[@data-test-id="reject-bill-button"]';
		this.approveBillButton = '//div[contains(@class, "display-none")]//button[@data-test-id="approve-bill-button"]';
	}

	async clickApproveBillButton() {
		await this.click(this.approveBillButton);
	}

	async clickRejectBillButton() {
		await this.click(this.rejectBillButton);
	}

	async approveBill({ billId, billDetails, approverUserDetails }) {
		await this.clickApproveBillButton();
		await this.remarkSidebar.submit({ billId, billDetails, approverUserDetails });
	}
}
