import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';
import ProductsPrice from '../../shared/ProductsPrice';

export default class RfqSubmission extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.element = '//penny-vendor-rfq-total';
		this.subtotalText = `${this.element}//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]`;
		this.taxText = `${this.element}//div[./div[contains(text(),"VAT")]]//span[contains(., "%s")]`;
		this.totalText = `${this.element}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
		this.shippingTermText = `${this.element}//div[text()="Shipping Term"]/following-sibling::div[text()="%s"]`;
		this.paymentTermText = `${this.element}//div[text()="Payment Term"]/following-sibling::div[text()="%s"]`;
		this.sendOfferButton = '//button[@data-test-id="submit-offer-button"]';
		this.successMessage = '//p-toastitem//div[contains(text(), "Success")]';
		this.confirmButton = '//button[@label="CONFIRM"]';
	}

	async validateShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.shippingTermText, shippingTerm));
	}

	async validatePaymentTerm({ rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(
			sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit.toUpperCase()}`)
		);
	}

	async validateSubtotal({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const subTotal = this.productsPrice.getSubTotalWithShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.subtotalText, subTotal, organizationDetails);
	}

	async validateTax({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const { currencyCode } = organizationDetails;
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const taxValue = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validateElementVisibility(sprintf(this.taxText, currencyCode));
		await this.validateElementVisibility(sprintf(this.taxText, formatedNumber(taxValue)));
	}

	async validateTotalWithShippingFee({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		let totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.validatePrice(this.totalText, totalWithTaxAndShippingFeePrice, organizationDetails);
	}

	async validatePriceSummary({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		await this.validateSubtotal({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
		await this.validateTax({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
		await this.validateTotalWithShippingFee({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
	}

	async clickSendOfferButton() {
		await this.click(this.sendOfferButton);
	}

	async clickConfirmButton() {
		await this.click(this.confirmButton);
	}

	async validateSubmissionPopup({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails }) {
		await this.validateShippingTerm({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
		await this.validatePriceSummary({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
	}

	async submitOffer({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails }) {
		await this.clickSendOfferButton();
		await this.validateSubmissionPopup({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails });
		await this.clickConfirmButton();
	}
}
