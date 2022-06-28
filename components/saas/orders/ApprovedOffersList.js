import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class ApprovedOffersList extends GenericElement {
	constructor() {
		super();
		this.vendorNameText = '//div[@row-index="0"]/div[@col-id="supplier"]//span[text()="%s"]';
		this.requestTitleText = '//div[@row-index="0"]/div[@col-id="requestTitle"]//span[text()="%s"]';
		this.deliveryLocationNameText = '//div[@row-index="0"]/div[@col-id="location"]//span[text()="%s"]';
		this.firstOfferButton = '//div[@row-index="0"]/div[@col-id="id"]//button';
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validatelDeliveryLocation({ workspaceDetails, organizationLocation }) {
		const locationDetails = organizationLocation || workspaceDetails.location;

		await this.validateElementVisibility(sprintf(this.deliveryLocationNameText, locationDetails.name));
	}

	async validate({ productRequest }) {
		const { requestDetails, workspaceDetails, vendorDetails, organizationLocation } = productRequest;

		await this.validateVendorName({ vendorDetails });
		await this.validateRequestTitle({ requestDetails });
		await this.validatelDeliveryLocation({ workspaceDetails, organizationLocation });
	}

	async clickFirstOfferButton() {
		await this.click(this.firstOfferButton);
	}

	async selectFirstOffer({ productRequest }) {
		await this.validate({ productRequest });
		await this.clickFirstOfferButton();
	}

	async selectFirstClientOffer({ productRequest }) {
		const { requestDetails, workspaceDetails, organizationLocation } = productRequest;

		await this.validateRequestTitle({ requestDetails });
		await this.validatelDeliveryLocation({ workspaceDetails, organizationLocation });
		await this.clickFirstOfferButton();
	}
}
