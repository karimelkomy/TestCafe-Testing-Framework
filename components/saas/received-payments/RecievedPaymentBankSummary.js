import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';

export default class RecievedPaymentBankSummary extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.selectedBillText =
			'//div[@data-test-id="payment-selected-table"]//span[@data-test-id="selected-bills-number-text" and text()=" (%s) "]';

		this.totalPaidText = '//div[@data-test-id="payment-selected-table"]//span[@data-test-id="total-paid-%s-text" and contains(., "%s")]';
		this.totalPendingText =
			'//div[@data-test-id="payment-selected-table"]//span[@data-test-id="total-pending-%s-text" and contains(., "%s")]';
		this.totalPayingNowText =
			'//div[@data-test-id="payment-selected-table"]//span[@data-test-id="total-paying-now-%s-text" and contains(., "%s")]';
	}

	async validateSelectedBillsNumber() {
		await this.validateElementVisibility(sprintf(this.selectedBillText, '1'));
	}

	async validateTotalPaid({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const totalPaid = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.totalPaidText, totalPaid, organizationDetails);
	}

	async validate({ productRequest }) {
		const { requestDetails, rfqDetails, productsDetails, productDetails, organizationDetails, markupDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		await this.validateSelectedBillsNumber();
		await this.validateTotalPaid({ organizationDetails, requestDetails, rfqDetails, productsDetails: productsDetailsValue, markupDetails });
	}
}
