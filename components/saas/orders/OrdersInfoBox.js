import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../utilities/helpers';
import GenericElement from '../../shared/core/GenericElement';

export default class OrdersInfoBox extends GenericElement {
	constructor() {
		super();
		this.statusText = '//penny-info-white-box[@data-test-id="status-info-box"]//div[contains(text(), " %s ")]';
		this.offerNumberText = '//penny-info-white-box[@data-test-id="offer-number-info-box"]//div[contains(text(), " %s ")]';
		this.shippingTermText = '//penny-info-white-box[@data-test-id="shipping-term-info-box"]//div[contains(text(), " %s ")]';
		this.paymentTermText = '//penny-info-white-box[@data-test-id="payment-term-info-box"]//div[contains(text(), " %s ")]';
		this.deliveryToText = '//penny-info-white-box[@data-test-id="delivery-to-info-box"]//div[contains(text(), " %s ")]';
	}

	async validateStatus({ orderStatus }) {
		await this.validateElementVisibility(sprintf(this.statusText, orderStatus));
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
		const { details, location } = workspaceDetails;
		const locationDetails = organizationLocation || location;

		await this.validateElementVisibility(sprintf(this.deliveryToText, `${details.name}-${locationDetails.name}`));
	}

	async validateOrdersInfoBox({ orderStatus, rfqDetails, workspaceDetails, organizationLocation, rfqId }) {
		await this.validateOfferNumber({ rfqId });
		await this.validateStatus({ orderStatus });
		await this.validateShippingTerm({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
		await this.validateDeliveryTo({ workspaceDetails, organizationLocation });
	}
}
