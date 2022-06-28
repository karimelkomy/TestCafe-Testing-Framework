import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';
import { formatedNumber } from '../../../utilities/helpers';

export default class InvoicePriceSummary extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.elementXP = '//div[contains(@class, "pointer-none")]';
		this.subtotalText = `${this.elementXP}//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]`;
		this.taxText = `${this.elementXP}//div[./div[contains(text(), "VAT")]]//span[contains(., "%s")]`;
		this.totalText = `${this.elementXP}//div[./div[text()= "Total"]]//span[contains(., "%s")]`;
	}

	async validateSubtotal({ requestDetails, organizationDetails, productsDetails, rfqDetails, markupDetails }) {
		const price = this.productsPrice.getSubTotalWithShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.subtotalText, price, organizationDetails);
	}

	async validateTax({ requestDetails, currencyCode, productsDetails, markupDetails, rfqDetails }) {
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const taxes = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validateElementVisibility(sprintf(this.taxText, currencyCode));
		await this.validateElementVisibility(sprintf(this.taxText, formatedNumber(taxes)));
	}

	async validateTotal({ currencyCode, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const price = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validateElementVisibility(sprintf(this.totalText, currencyCode));
		await this.validateElementVisibility(sprintf(this.totalText, formatedNumber(price)));
	}

	async validateSummary({ productRequest }) {
		const { requestDetails, rfqDetails, productDetails, productsDetails, organizationDetails, markupDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		const { currencyCode } = organizationDetails;

		await this.validateSubtotal({ requestDetails, organizationDetails, productsDetails: productsDetailsValue, rfqDetails, markupDetails });
		await this.validateTax({ requestDetails, currencyCode, productsDetails: productsDetailsValue, markupDetails, rfqDetails });
		await this.validateTotal({ currencyCode, requestDetails, rfqDetails, productsDetails: productsDetailsValue, markupDetails });
	}
}
