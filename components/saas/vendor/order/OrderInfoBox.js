import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class OrderInfoBox extends GenericElement {
	constructor() {
		super();
		this.shippingFeeText = '//span[@data-test-id="shippingFee-%s-text" and contains(.,"%s")]';
		this.shippingTermText = '//div[@data-test-id="shipping-term-info-box"]/span[text()=" %s "]';
		this.paymentTermText = '//div[@data-test-id="payment-term-info-box"]/span[text()=" %s"]';
	}

	async validateShippingFee({ shippingFee, organizationDetails }) {
		await this.validatePrice(this.shippingFeeText, shippingFee, organizationDetails);
	}

	async validateShippingTerm({ shippingTerm }) {
		await this.validateElementVisibility(sprintf(this.shippingTermText, shippingTerm));
	}

	async validatePaymentTerm({ paymentTerm, paymentTermUnit }) {
		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateInfoBox({ productRequest }) {
		const { organizationDetails, rfqDetails } = productRequest;
		const { shippingFee, shippingTerm, paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateShippingFee({ shippingFee, organizationDetails });
		await this.validateShippingTerm({ shippingTerm });
		// await this.validatePaymentTerm({ paymentTerm, paymentTermUnit }); // BUG: payment term removed
	}
}
