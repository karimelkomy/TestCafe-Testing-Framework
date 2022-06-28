import GenericElement from '../../../shared/core/GenericElement';
import RemarkSidebar from './RemarkSidebar';

export default class OrderApproval extends GenericElement {
	constructor() {
		super();
		this.remarkSidebar = new RemarkSidebar();
		this.rejectOrderButton = '//button[@data-test-id="reject-order-button"]';
		this.approveOrderButton = '//button[@data-test-id="approve-order-button"]';
	}

	async clickApproveOrderButton() {
		await this.click(this.approveOrderButton);
	}

	async clickRejectOrderButton() {
		await this.click(this.rejectOrderButton);
	}

	async approveOrder({ orderId, orderDetails, approverUserDetails }) {
		await this.clickApproveOrderButton();
		await this.remarkSidebar.submit({ orderId, orderDetails, approverUserDetails });
	}
}
