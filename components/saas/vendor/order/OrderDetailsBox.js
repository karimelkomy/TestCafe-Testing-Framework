import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class OrderDetailsBox extends GenericElement {
	constructor() {
		super();
		this.orderIdText = '//h1[@data-test-id="order-header" and text()=" Order #%s "]';
		this.locationNameText = '//div[contains(@class, "display-none")]//div[@data-test-id="delivery-to-text"]/div[text()="%s"]';
		this.locationAddressText =
			'//div[contains(@class, "display-none")]//div[@data-test-id="delivery-to-text"]//span[contains(text(), "%s")]';
		this.locationGoogleLink = '//div[contains(@class, "display-none")]//div[@data-test-id="delivery-to-text"]//a[contains(@href, "%s")]';
	}

	async validateDeliveryLocation({ locationDetails }) {
		const { name, type, street, city, country, postalCode, googleMapsLink } = locationDetails;

		await this.validateElementVisibility(sprintf(this.locationNameText, name));
		await this.validateElementVisibility(sprintf(this.locationAddressText, type));
		await this.validateElementVisibility(sprintf(this.locationAddressText, street));
		await this.validateElementVisibility(sprintf(this.locationAddressText, city));
		await this.validateElementVisibility(sprintf(this.locationAddressText, country));
		await this.validateElementVisibility(sprintf(this.locationAddressText, postalCode));
		await this.validateElementVisibility(sprintf(this.locationGoogleLink, googleMapsLink));
	}

	async validateOrderId({ orderId }) {
		await this.validateElementVisibility(sprintf(this.orderIdText, orderId));
	}

	async validate({ productRequest }) {
		const { orderId, workspaceDetails, organizationLocation } = productRequest;
		const locationDetails = organizationLocation || workspaceDetails.location;

		// TODO: Validate date created, expired and delivery date
		await this.validateOrderId({ orderId });
		await this.validateDeliveryLocation({ locationDetails });
	}
}
