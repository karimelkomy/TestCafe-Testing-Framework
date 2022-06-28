import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ProductsPrice from '../../shared/ProductsPrice';
import { formatedNumber } from '../../../../utilities/helpers';

export default class PendingOfferDetailsCards extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.elementXP =
			'//penny-rfq-details-table-product-list[@data-test-id="rfq-details-table-product-list"]//div[contains(@class, "vendor-details-title")]';
		this.shippingFeeText = `${this.elementXP}//span[@data-test-id="shipping-fee-%s-text" and contains(., "%s")]`;
		this.deliveryTermText = `${this.elementXP}//div[@data-test-id="shipping-term-text" and contains(text(), "%s")]`;
		this.paymentTermText = `${this.elementXP}//div[@data-test-id="payment-term-text" and contains(text(), "%s")]`;
		this.totalWithShippingText = `(${this.elementXP}//span[@data-test-id="total-%s-text" and contains(., "%s")])[1]`;
	}

	async validateShippingFee({ rfqDetails, organizationDetails }) {
		const { shippingFee } = rfqDetails;

		await this.validatePrice(this.shippingFeeText, shippingFee, organizationDetails);
	}

	async validateDeliveryTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.deliveryTermText, shippingTerm));
	}

	async validateEta({ rfqDetails }) {
		const { ETA, ETAUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.deliveryTermText, `${formatedNumber(ETA, 0)} ${ETAUnit}`));
	}

	async validatePaymentTerm({ rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateTotalWithShipping({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.validatePrice(this.totalWithShippingText, totalWithTaxAndShippingFeePrice, organizationDetails);
	}

	async validate({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails }) {
		await this.validateShippingFee({ rfqDetails, organizationDetails });
		await this.validateDeliveryTerm({ rfqDetails });
		await this.validateEta({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
		await this.validateTotalWithShipping({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
	}
}
