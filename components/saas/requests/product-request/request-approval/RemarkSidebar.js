import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class RemarkSidebar extends GenericElement {
	constructor() {
		super();
		this.element = '//div[contains(@class, "p-sidebar-active")]';
		this.remarkInput = `${this.element}//textarea[@data-test-id="remarks-reason-input"]`;
		this.submitButton = `${this.element}//button[@data-test-id="action-button"]`;
		this.requestHeaderText = `${this.element}//h1[@data-test-id="request-header" and contains(text(), "%s")]`;
		this.requestTitleText = `${this.element}//h3[@data-test-id="request-title-text" and contains(text(), "%s")]`;
		this.profileBadgeText = `${this.element}//penny-profile-badge//span[text()="%s"]`;
	}

	async fillRemark({ requestDetails }) {
		const { requestApprovalRemark } = requestDetails;

		await this.fill(this.remarkInput, requestApprovalRemark);
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async validateRequestId({ requestId }) {
		await this.validateElementVisibility(sprintf(this.requestHeaderText, requestId));
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateRequesterFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async submit({ requestId, requestDetails, requesterUserDetails }) {
		await this.validateRequestId({ requestId });
		await this.validateRequesterFirstName({ requesterUserDetails });
		await this.validateRequestTitle({ requestDetails });
		await this.fillRemark({ requestDetails });
		await this.clickSubmitButton();
	}
}
