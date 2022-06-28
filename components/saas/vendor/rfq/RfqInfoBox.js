import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';
import PaymentTermMode from '../../../../data/saas/constants/PaymentTermMode';

export default class RfqInfoBox extends GenericElement {
	constructor() {
		super();
		this.shippingFeeInput = '//p-inputnumber[@data-test-id="shipping-fee-input"]//input';
		this.shippingFeeText = '//div[contains(@class, "other-rfq-details")]//span[@data-test-id="shipping-fee-%s-text" and contains(., "%s")]';
		this.negotiatedShippingFeeText =
			'//div[./div[text()="Negotiated Shipping Fees"]]//span[@data-test-id="negotiated-shipping-fee-%s-text" and contains(., "%s")]';
		this.acceptNegotiatedShippingFeeButton = '//div[./div[text()="Negotiated Shipping Fees"]]//span[text()="ACCEPT"]';
		this.shippingTermDropdown = '//p-dropdown[@data-test-id="shipping-term-dropdown"]';
		this.shippingTermDropdownItem = '//p-dropdownitem/li[contains(@aria-label, "%s")]';
		this.negotiatedShippingTermText = '//div[./div[text()="Negotiated Shipping Term"] and contains(., "%s")]';
		this.acceptNegotiatedShippingTermButton = '//div[./div[text()="Negotiated Shipping Term"]]//span[text()="ACCEPT"]';
		this.shippingTermText = '//div[contains(@class, "other-rfq-details")]//div[./div[text()="Shipping Term"]]//div[contains(text(), "%s")]';
		this.paymentTermInput = '//p-inputnumber[@data-test-id="payment-term-input"]//input';
		this.paymentTermDropdown = '//p-dropdown[@placeholder="SELECT PAYMENT TERM"]';
		this.paymentTermDropdownItem = '//p-dropdownitem/li[.="%s"]';
		this.paymentTermInputValue = `${this.paymentTermInput}[@aria-valuenow="%s"]`;
		this.paymentTermText = '//div[contains(@class, "other-rfq-details")]/div[contains(., "%s")]';
		this.negotiatedPaymentTermText = '//div[./div[text()="Negotiated Payment Term"] and contains(., "%s")]';
		this.acceptNegotiatedPaymentTermButton = '//div[./div[text()="Negotiated Payment Term"]]//span[text()="ACCEPT"]';
	}

	async fillShippingFee({ rfqDetails }) {
		const { shippingFee } = rfqDetails;

		await this.fill(this.shippingFeeInput, formatedNumber(shippingFee));
	}

	async validateShippingFee({ rfqDetails, organizationDetails }) {
		const { shippingFee } = rfqDetails;

		await this.validatePrice(this.shippingFeeText, shippingFee, organizationDetails);
	}

	async validateNegotiatedShippingFee({ rfqDetails, organizationDetails }) {
		const { shippingFee } = rfqDetails;

		await this.validatePrice(this.negotiatedShippingFeeText, shippingFee, organizationDetails);
	}

	async acceptNegotiatedShippingFee() {
		await this.click(this.acceptNegotiatedShippingFeeButton);
	}

	async selectShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.click(this.shippingTermDropdown);
		await this.click(sprintf(this.shippingTermDropdownItem, shippingTerm));
	}

	async validateShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.shippingTermText, shippingTerm));
	}

	async validateNegotiatedShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.negotiatedShippingTermText, shippingTerm));
	}

	async acceptNegotiatedShippingTerm() {
		await this.click(this.acceptNegotiatedShippingTermButton);
	}

	async fillPaymentTerm({ paymentTermMode, rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		if (paymentTermMode === PaymentTermMode.LIST) {
			await this.click(this.paymentTermDropdown);
			await this.click(sprintf(this.paymentTermDropdownItem, `${paymentTerm} ${paymentTermUnit}`));
		} else {
			await this.fill(this.paymentTermInput, formatedNumber(paymentTerm, 0));
		}
	}

	async validatePaymentTerm({ rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)}  ${paymentTermUnit}`));
	}

	async validateNegotiatedPaymentTerm({ rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.negotiatedPaymentTermText, `${formatedNumber(paymentTerm, 0)}`));
		await this.validateElementVisibility(sprintf(this.negotiatedPaymentTermText, `${paymentTermUnit}`));
	}

	async acceptNegotiatedPaymentTerm() {
		await this.click(this.acceptNegotiatedPaymentTermButton);
	}

	async submitInfoBox({ paymentTermMode, rfqDetails }) {
		await this.fillShippingFee({ rfqDetails });
		await this.selectShippingTerm({ rfqDetails });
		// await this.fillPaymentTerm({ paymentTermMode, rfqDetails }); // BUG: payment term removed
	}

	async validateInfoBox({ rfqDetails, organizationDetails }) {
		await this.validateShippingFee({ rfqDetails, organizationDetails });
		await this.validateShippingTerm({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
	}

	async submitNegotiation({ rfqDetails, organizationDetails }) {
		await this.validateNegotiatedShippingTerm({ rfqDetails });
		await this.acceptNegotiatedShippingTerm();
		await this.validateNegotiatedShippingFee({ rfqDetails, organizationDetails });
		await this.acceptNegotiatedShippingFee();
		// await this.validateNegotiatedPaymentTerm({ rfqDetails }); // BUG: payment term removed
		// await this.acceptNegotiatedPaymentTerm(); // BUG: payment term removed
	}
}
