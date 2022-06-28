import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class RemarkSidebar extends GenericElement {
	constructor() {
		super();
		this.element = '//div[contains(@class, "p-sidebar-active")]';
		this.remarkInput = `${this.element}//textarea[@data-test-id="remarks-reason-input"]`;
		this.submitButton = `${this.element}//button[@data-test-id="action-button"]`;
		this.billHeaderText = `${this.element}//h1[@data-test-id="request-header" and contains(text(), "%s")]`;
		this.profileBadgeText = `${this.element}//penny-profile-badge//span[text()="%s"]`;
	}

	async fillRemark({ billDetails }) {
		const { billApprovalRemark } = billDetails;

		await this.fill(this.remarkInput, billApprovalRemark);
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async validateBillId({ billId }) {
		await this.validateElementVisibility(sprintf(this.billHeaderText, billId));
	}

	async validateApproverFirstName({ approverUserDetails }) {
		const { firstName } = approverUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async submit({ billId, billDetails, approverUserDetails }) {
		await this.validateBillId({ billId });
		await this.validateApproverFirstName({ approverUserDetails });
		await this.fillRemark({ billDetails });
		await this.clickSubmitButton();
	}
}
