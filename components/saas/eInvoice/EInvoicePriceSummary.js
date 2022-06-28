import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';

export default class EInvoicePriceSummary extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.subtotalText =
			'//tfoot//tr[./td[text()=" Subtotal (Excluding VAT) "]]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
		this.shippingFeeSubtotalText =
			'//tr[.//span[contains(text(),"Shipping fee")]]/td[3]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
		this.shippingFeeTotalText =
			'//tr[.//span[contains(text(),"Shipping fee")]]/td[6]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
		this.taxText = '//tfoot//tr[./td[text()="VAT Subtotal"]]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
		this.totalText = '//tfoot//tr[./td[text()="Total Amount Due"]]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
	}

	async validateSubtotal({ requestDetails, organizationDetails, productsDetails, rfqDetails, markupDetails }) {
		const price = this.productsPrice.getSubTotalWithShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.subtotalText, price, organizationDetails);
	}

	async validateShippingFee({ organizationDetails, rfqDetails }) {
		const { productShippingFee, shippingFee } = rfqDetails;
		const shippingFeeValue = productShippingFee || shippingFee;

		await this.validatePrice(this.shippingFeeSubtotalText, shippingFeeValue, organizationDetails);
		await this.validatePrice(this.shippingFeeTotalText, shippingFeeValue, organizationDetails);
	}

	async validateTax({ requestDetails, organizationDetails, productsDetails, markupDetails, rfqDetails }) {
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const taxes = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validatePrice(this.taxText, taxes, organizationDetails);
	}

	async validateTotal({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const price = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.totalText, price, organizationDetails);
	}

	async validate({ productRequest }) {
		const { requestDetails, rfqDetails, productDetails, productsDetails, organizationDetails, markupDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		await this.validateSubtotal({ requestDetails, organizationDetails, productsDetails: productsDetailsValue, rfqDetails, markupDetails });
		await this.validateShippingFee({ organizationDetails, rfqDetails });
		await this.validateTax({ requestDetails, organizationDetails, productsDetails: productsDetailsValue, markupDetails, rfqDetails });
		await this.validateTotal({ organizationDetails, requestDetails, rfqDetails, productsDetails: productsDetailsValue, markupDetails });
	}
}
