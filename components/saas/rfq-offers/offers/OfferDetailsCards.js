import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ProductsPrice from '../../shared/ProductsPrice';
import { formatedNumber } from '../../../../utilities/helpers';

export default class OfferDetailsCards extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.elementXP =
			'//penny-rfq-details-table-product-list[@data-test-id="rfq-details-table-product-list"]//div[contains(@class, "vendor-details-title")][.//span[@data-test-id="id-vendor-name-text" and .="%s"]]';
		this.shippingFeeText = `${this.elementXP}//span[@data-test-id="shipping-fee-%s-text" and contains(., "%s")]`;
		this.deliveryTermText = `${this.elementXP}//div[@data-test-id="shipping-term-text" and contains(text(), "%s")]`;
		this.paymentTermText = `${this.elementXP}//div[@data-test-id="payment-term-text" and contains(text(), "%s")]`;
		this.totalWithShippingText = `(${this.elementXP}//span[@data-test-id="total-%s-text" and contains(., "%s")])[1]`;
		this.plusMinusButton = `${this.elementXP}//i[@data-test-id="plus-minus-button"]`;
	}

	async validateShippingFee({ rfqDetails, currencyCode, vendorName }) {
		const { shippingFee } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.shippingFeeText, vendorName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.shippingFeeText, vendorName, 'price', formatedNumber(shippingFee)));
	}

	async validateDeliveryTerm({ rfqDetails, vendorName }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.deliveryTermText, vendorName, shippingTerm));
	}

	async validateEta({ rfqDetails, vendorName }) {
		const { ETA, ETAUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.deliveryTermText, vendorName, `${formatedNumber(ETA, 0)} ${ETAUnit}`));
	}

	async validatePaymentTerm({ rfqDetails, vendorName }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.paymentTermText, vendorName, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateTotalWithShipping({ currencyCode, requestDetails, rfqDetails, productsDetails, vendorName, markupDetails }) {
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.validateElementVisibility(sprintf(this.totalWithShippingText, vendorName, 'currency', currencyCode));
		await this.validateElementVisibility(
			sprintf(this.totalWithShippingText, vendorName, 'price', formatedNumber(totalWithTaxAndShippingFeePrice))
		);
	}

	async validate({ requestDetails, rfqDetails, organizationDetails, productsDetails, vendorDetails, markupDetails }) {
		const { vendorName } = vendorDetails;
		const { currencyCode } = organizationDetails;

		await this.openTableDetails({ vendorName });

		await this.validateShippingFee({ rfqDetails, currencyCode, vendorName });
		await this.validateDeliveryTerm({ rfqDetails, vendorName });
		await this.validateEta({ rfqDetails, vendorName });
		// await this.validatePaymentTerm({ rfqDetails, vendorName }); // BUG: payment term removed
		await this.validateTotalWithShipping({ currencyCode, requestDetails, rfqDetails, productsDetails, vendorName, markupDetails });
	}

	async openTableDetails({ vendorName }) {
		await this.click(sprintf(this.plusMinusButton, vendorName));
	}
}
