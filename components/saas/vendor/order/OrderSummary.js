import GenericElement from '../../../shared/core/GenericElement';
import ProductsPrice from '../../shared/ProductsPrice';

export default class OrderSummary extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.subtotalText = '//div[@data-test-id="price-summary-box"]//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]';
		this.taxText = '//div[@data-test-id="price-summary-box"]//span[@data-test-id="tax-%s-text" and contains(., "%s")]';
		this.shippingFeeText = '//div[@data-test-id="price-summary-box"]//span[@data-test-id="shipping-fee-%s-text" and contains(., "%s")]';
		this.totalText = '//div[@data-test-id="price-summary-box"]//span[@data-test-id="total-%s-text" and contains(., "%s")]';
	}

	async validateSubtotal({ productsDetails, organizationDetails, requestDetails, rfqDetails }) {
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails });

		await this.validatePrice(this.subtotalText, subTotal, organizationDetails);
	}

	async validateTax({ productsDetails, organizationDetails, requestDetails, rfqDetails }) {
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails });
		const taxValue = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validatePrice(this.taxText, taxValue, organizationDetails);
	}

	async validateShippingFee({ organizationDetails, rfqDetails }) {
		const { shippingFee } = rfqDetails;

		await this.validatePrice(this.shippingFeeText, shippingFee, organizationDetails);
	}

	async validateTotalWithShippingFee({ productsDetails, organizationDetails, requestDetails, rfqDetails }) {
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
		});

		await this.validatePrice(this.totalText, totalWithTaxAndShippingFeePrice, organizationDetails);
	}

	async validateSummary({ productRequest }) {
		const { organizationDetails, requestDetails, rfqDetails, productsDetails } = productRequest;

		await this.validateSubtotal({ productsDetails, organizationDetails, requestDetails, rfqDetails });
		await this.validateTax({ productsDetails, organizationDetails, requestDetails, rfqDetails });
		await this.validateShippingFee({ organizationDetails, rfqDetails });
		await this.validateTotalWithShippingFee({ productsDetails, organizationDetails, requestDetails, rfqDetails });
	}
}
