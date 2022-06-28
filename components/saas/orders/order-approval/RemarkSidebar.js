import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RemarkSidebar extends GenericElement {
	constructor() {
		super();
		this.element = '//div[contains(@class, "p-sidebar-active")]';
		this.remarkInput = `${this.element}//textarea[@data-test-id="remarks-reason-input"]`;
		this.submitButton = `${this.element}//button[@data-test-id="action-button"]`;
		this.orderHeaderText = `${this.element}//h1[@data-test-id="request-header" and contains(text(), "%s")]`;
		this.profileBadgeText = `${this.element}//penny-profile-badge//span[text()="%s"]`;
	}

	async fillRemark({ orderDetails }) {
		const { orderApprovalRemark } = orderDetails;

		await this.fill(this.remarkInput, orderApprovalRemark);
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async validateOrderId({ orderId }) {
		await this.validateElementVisibility(sprintf(this.orderHeaderText, orderId));
	}

	async validateApproverFirstName({ approverUserDetails }) {
		const { firstName } = approverUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async submit({ orderId, orderDetails, approverUserDetails }) {
		await this.validateOrderId({ orderId });
		await this.validateApproverFirstName({ approverUserDetails });
		await this.fillRemark({ orderDetails });
		await this.clickSubmitButton();
	}
}
