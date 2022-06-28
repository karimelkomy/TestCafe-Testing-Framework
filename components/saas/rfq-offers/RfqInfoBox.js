import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class RfqInfoBox extends GenericElement {
	constructor() {
		super();
		this.workspaceLabel = '//div[@data-test-id="workspace-value"]/span[text()="%s"]';
		this.requestTypeLabel = '//div[@data-test-id="request-type-value"]/span[text()="%s"]';
		this.deliveryToLabel = '//div[@data-test-id="delivery-to-value"]//span[text()="%s"]';
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceLabel, details.name));
	}

	async validateDeliveryTo({ locationDetails }) {
		const { name } = locationDetails;

		await this.validateElementVisibility(sprintf(this.deliveryToLabel, name));
	}

	async validateRequestType({ requestDetails }) {
		const { requestType } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTypeLabel, requestType));
	}

	async validateRfqDetails({ productRequest }) {
		const { workspaceDetails, organizationLocation, requestDetails } = productRequest;
		const locationDetails = organizationLocation || workspaceDetails.location;

		await this.validateWorkspace({ workspaceDetails });
		await this.validateDeliveryTo({ locationDetails });
		await this.validateRequestType({ requestDetails });
	}
}
