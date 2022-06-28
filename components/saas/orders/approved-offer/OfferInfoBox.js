import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../../utilities/helpers';
import GenericElement from '../../../shared/core/GenericElement';

export default class OfferInfoBox extends GenericElement {
	constructor() {
		super();
		this.statusText = '//div[./span[text()="Status"]]/h5[text()="%s"]';
		this.offerNumberText = '//div[./span[text()="Offer Number"]]/h5[text()="%s"]';
		this.shippingTermText = '//div[./span[text()="Shipping Term"]]/h5[text()="%s"]';
		this.paymentTermText = '//div[./span[text()="Payment Term"]]/h5[text()="%s"]';
		this.deliveryToText = '//div[./span[text()="Delivery To"]]/h5[text()="%s"]';
	}

	async validateStatus({ offerStatus }) {
		await this.validateElementVisibility(sprintf(this.statusText, offerStatus));
	}

	async validateOfferNumber({ rfqId }) {
		if (rfqId) {
			await this.validateElementVisibility(sprintf(this.offerNumberText, rfqId));
		}
	}

	async validateShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.shippingTermText, shippingTerm));
	}

	async validatePaymentTerm({ rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateDeliveryTo({ workspaceDetails, organizationLocation }) {
		const locationDetails = organizationLocation || workspaceDetails.location;

		await this.validateElementVisibility(sprintf(this.deliveryToText, locationDetails.name));
	}

	async validate({ productRequest }) {
		const { rfqDetails, workspaceDetails, rfqId, organizationLocation, offerStatus } = productRequest;

		await this.validateOfferNumber({ rfqId });
		await this.validateStatus({ offerStatus });
		await this.validateShippingTerm({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
		await this.validateDeliveryTo({ workspaceDetails, organizationLocation });
	}

	async validateClient({ productRequest }) {
		const { rfqDetails, workspaceDetails, rfqId, organizationLocation, offerStatus } = productRequest;

		await this.validateStatus({ offerStatus });
		await this.validateShippingTerm({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
		await this.validateDeliveryTo({ workspaceDetails, organizationLocation });
	}
}
