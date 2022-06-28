import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class GdnsList extends GenericElement {
	constructor() {
		super();
		this.requestTitleText = '//div[@row-index="0"]/div[@col-id="requestTitle"]//span[text()="%s"]';
		this.workspaceNameText = '//div[@row-index="0"]/div[@col-id="workspace"]//span[text()="%s"]';
		this.requestorNameText = '//div[@row-index="0"]/div[@col-id="requestor"]//span[text()="%s"]';
		this.firstGdnButton = '//div[@row-index="0"]/div[@col-id="clientOrderId"]//button';
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateWorkspaceName({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceNameText, details.name));
	}

	async validateRequestorFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async clickFirstGdnButton() {
		await this.click(this.firstGdnButton);
	}

	async validate({ productRequest }) {
		const { requestDetails, workspaceDetails, requesterUserDetails } = productRequest;

		await this.validateRequestTitle({ requestDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateRequestorFirstName({ requesterUserDetails });
	}

	async selectFirstGdn({ productRequest }) {
		await this.validate({ productRequest });
		await this.clickFirstGdnButton();
	}
}
