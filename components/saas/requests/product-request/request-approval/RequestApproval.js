import GenericElement from '../../../../shared/core/GenericElement';
import RemarkSidebar from './RemarkSidebar';

export default class RequestApproval extends GenericElement {
	constructor() {
		super();
		this.remarkSidebar = new RemarkSidebar();
		this.rejectRequestButton = '//button[@data-test-id="reject-request-button"]';
		this.approveRequestButton = '//button[@data-test-id="approve-request-button"]';
	}

	async clickApproveRequestButton() {
		await this.click(this.approveRequestButton);
	}

	async clickRejectRequestButton() {
		await this.click(this.rejectRequestButton);
	}

	async approveRequest({ requestId, requestDetails, requesterUserDetails }) {
		await this.clickApproveRequestButton();
		await this.remarkSidebar.submit({ requestId, requestDetails, requesterUserDetails });
	}
}
