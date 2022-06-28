import { sprintf } from 'sprintf-js';
import { getNumberFromText } from '../../../utilities/helpers';
import GenericElement from '../../shared/core/GenericElement';

export default class RfqHeader extends GenericElement {
	constructor() {
		super();
		this.requestHeaderText = '//penny-rfq-request-detail/div//h1[@data-test-id="request-header"][./span]';
		this.requestPriorityText = '//penny-rfq-request-detail//h1[@data-test-id="request-header"]/following-sibling::div/span[text()="%s"]';
		this.requestTitleText =
			'//penny-rfq-request-detail//div[contains(@class, "rfq-top-section")]//h3[@data-test-id="request-title-text" and contains(text(), "%s")]';
		this.profileBadgeText = '//div[contains(@class, "timeline-button")]//penny-profile-badge//span[text()="%s"]';
	}

	async getRequestId() {
		const rfqTitleText = await this.getText(this.requestHeaderText);

		return getNumberFromText(rfqTitleText);
	}

	async validateRequestPriority({ requestDetails }) {
		const { requestPriority } = requestDetails;

		if (requestPriority) {
			await this.validateElementVisibility(sprintf(this.requestPriorityText, requestPriority));
		}
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateRequesterFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async validateRfqHeader({ productRequest }) {
		const { requestDetails, requesterUserDetails } = productRequest;

		await this.validateRequestPriority({ requestDetails });
		await this.validateRequestTitle({ requestDetails });
		await this.validateRequesterFirstName({ requesterUserDetails });
	}
}
