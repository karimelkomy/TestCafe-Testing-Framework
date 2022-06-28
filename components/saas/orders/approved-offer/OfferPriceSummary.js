import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ProductsPrice from '../../shared/ProductsPrice';
import { formatedNumber } from '../../../../utilities/helpers';

export default class OfferPriceSummary extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.elementXP = '//penny-total-breakdown';
		this.subtotalText = `${this.elementXP}//div[@class="container"][./div[text()="Subtotal"]]//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]`;
		this.taxText = `${this.elementXP}//div[./div[contains(text(),"VAT")]]//span[contains(., "%s")]`;
		this.shippingFeeSubtotalText =
			'//tr[.//span[text()="Shipping Fee"]]/td[3]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
		this.shippingFeeTotalText =
			'//tr[.//span[text()="Shipping Fee"]]/td[5]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]';
		this.totalText = `${this.elementXP}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
	}

	async validateSubtotal({ productsDetails, organizationDetails, requestDetails, rfqDetails, markupDetails }) {
		const subTotal = this.productsPrice.getSubTotalWithShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.subtotalText, subTotal, organizationDetails);
	}

	async validateTax({ productsDetails, organizationDetails, requestDetails, rfqDetails, markupDetails }) {
		const { currencyCode } = organizationDetails;
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const taxValue = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validateElementVisibility(sprintf(this.taxText, currencyCode));
		await this.validateElementVisibility(sprintf(this.taxText, formatedNumber(taxValue)));
	}

	async validateShippingFee({ organizationDetails, rfqDetails }) {
		const { productShippingFee, shippingFee } = rfqDetails;
		const shippingFeeValue = productShippingFee || shippingFee;

		await this.validatePrice(this.shippingFeeSubtotalText, shippingFeeValue, organizationDetails);
		await this.validatePrice(this.shippingFeeTotalText, shippingFeeValue, organizationDetails);
	}

	async validateTotalWithShippingFee({ productsDetails, organizationDetails, requestDetails, rfqDetails, markupDetails }) {
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.validatePrice(this.totalText, totalWithTaxAndShippingFeePrice, organizationDetails);
	}

	async validate({ productRequest }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails } = productRequest;

		await this.validateSubtotal({ productsDetails, organizationDetails, requestDetails, rfqDetails });
		await this.validateShippingFee({ organizationDetails, rfqDetails });
		await this.validateTax({ productsDetails, organizationDetails, requestDetails, rfqDetails });
		await this.validateTotalWithShippingFee({ productsDetails, organizationDetails, requestDetails, rfqDetails });
	}

	async validateClient({ productRequest }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails } = productRequest;

		await this.validateSubtotal({ productsDetails, organizationDetails, requestDetails, rfqDetails, markupDetails });
		await this.validateShippingFee({ organizationDetails, rfqDetails });
		await this.validateTax({ productsDetails, organizationDetails, requestDetails, rfqDetails, markupDetails });
		await this.validateTotalWithShippingFee({ productsDetails, organizationDetails, requestDetails, rfqDetails, markupDetails });
	}
}
