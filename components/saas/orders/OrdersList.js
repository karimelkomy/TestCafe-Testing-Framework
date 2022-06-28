import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class OrdersList extends GenericElement {
	constructor() {
		super();
		this.requestTitleText = '//div[@row-index="0"]/div[@col-id="requestTitle"]//span[text()="%s"]';
		this.workspaceNameText = '//div[@row-index="0"]/div[@col-id="workspace"]//span[text()="%s"]';
		this.requestorNameText = '//div[@row-index="0"]/div[@col-id="requestor"]//span[text()="%s"]';
		this.locationNameText = '//div[@row-index="0"]/div[@col-id="locationName"]//span[text()="%s"]';
		this.firstOrderButton = '//div[@row-index="0"]/div[@col-id="pendingOfferId"]//button';
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

	async validatelocationName({ workspaceDetails, organizationLocation }) {
		const { location } = workspaceDetails;
		const locationDetails = organizationLocation || location;

		await this.validateElementVisibility(sprintf(this.locationNameText, locationDetails.name));
	}

	async validate({ requestDetails, workspaceDetails, requesterUserDetails, organizationLocation }) {
		await this.validateRequestTitle({ requestDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateRequestorFirstName({ requesterUserDetails });
		await this.validatelocationName({ workspaceDetails, organizationLocation });
	}

	async clickFirstOrderButton() {
		await this.click(this.firstOrderButton);
	}

	async selectFirstOrder({ requestDetails, workspaceDetails, requesterUserDetails, organizationLocation }) {
		await this.validate({ requestDetails, workspaceDetails, requesterUserDetails, organizationLocation });
		await this.clickFirstOrderButton();
	}
}
