import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class RequestorRemark extends GenericElement {
	constructor() {
		super();
		this.requestorRemark = '//p-editor[@data-test-id="request-remarks-text"]//p[text()="%s"]';
		this.requestorNameText = '//div[./h2[text()="Requestor Remarks"]]/penny-profile-badge//span[text()="%s"]';
	}

	async validateRequestorRemark({ requestInfoRemark }) {
		await this.validateElementVisibility(sprintf(this.requestorRemark, requestInfoRemark));
	}

	async validateRequestorFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async validate({ productRequest }) {
		const { requestDetails, requesterUserDetails } = productRequest;
		const { requestInfoRemark } = requestDetails;

		// TODO: check if remark added during sourcing should appear in buyer RFQ
		if (requestInfoRemark) {
			await this.validateRequestorRemark({ requestInfoRemark });
			await this.validateRequestorFirstName({ requesterUserDetails });
		}
	}
}
