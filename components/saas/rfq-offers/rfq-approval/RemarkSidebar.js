import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RemarkSidebar extends GenericElement {
	constructor() {
		super();
		this.element = '//div[contains(@class, "p-sidebar-active")]';
		this.remarkInput = `${this.element}//textarea[@data-test-id="remarks-reason-input"]`;
		this.submitButton = `${this.element}//button[@data-test-id="action-button"]`;
		this.rfqHeaderText = `${this.element}//h1[@data-test-id="request-header" and contains(text(), "%s")]`;
		this.rfqTitleText = `${this.element}//h3[@data-test-id="request-title-text" and contains(text(), "%s")]`;
		this.profileBadgeText = `${this.element}//penny-profile-badge//span[contains(text(),"%s")]`;
	}

	async fillRemark({ rfqDetails }) {
		const { rfqApprovalRemark } = rfqDetails;

		await this.fill(this.remarkInput, rfqApprovalRemark);
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async validateRfqId({ rfqId }) {
		if (rfqId) {
			await this.validateElementVisibility(sprintf(this.rfqHeaderText, rfqId));
		}
	}

	async validateApproverFirstName({ approverUserDetails }) {
		const { firstName } = approverUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async submit({ rfqId, rfqDetails, approverUserDetails }) {
		await this.validateRfqId({ rfqId });
		await this.validateApproverFirstName({ approverUserDetails });
		await this.fillRemark({ rfqDetails });
		await this.clickSubmitButton();
	}
}
