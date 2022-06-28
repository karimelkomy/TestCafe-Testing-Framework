import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { formatedNumber, removeZeroFromEnd } from '../../../utilities/helpers';
import ProductsPrice from '../shared/ProductsPrice';

export default class ReceivedPaymentsList extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.paymentButton = '//div[@row-index="0"]/div[@col-id="paymentId"]//button';
		this.clientNameText = '//div[@row-index="0"]/div[@col-id="orgName"]//span[text()="%s"]';
		this.customerFirstNameText = '//div[@row-index="0"]/div[@col-id="customer"]//span[text()="%s"]';
		this.paidAmountText = '//div[@row-index="0"]/div[@col-id="paid"]//span[text()="%s"]';
	}

	async clickPaymentButton() {
		await this.click(this.paymentButton);
	}

	async validateClientName({ clientDetails }) {
		const { clientName } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientNameText, clientName));
	}

	async validateCustomerFirstName({ clientPaymentRequesterUserDetails }) {
		const { firstName } = clientPaymentRequesterUserDetails;

		await this.validateElementVisibility(sprintf(this.customerFirstNameText, firstName));
	}

	async validatePaidAmount({ requestDetails, rfqDetails, productsDetailsValue, organizationDetails, markupDetails }) {
		const { currencyCode } = organizationDetails;
		const paidAmount = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails: productsDetailsValue,
			markupDetails,
		});

		await this.validateElementVisibility(sprintf(this.paidAmountText, `${currencyCode} ${removeZeroFromEnd(formatedNumber(paidAmount))}`));
	}

	async submit({ productRequest }) {
		const {
			clientDetails,
			clientPaymentRequesterUserDetails,
			requestDetails,
			rfqDetails,
			productDetails,
			productsDetails,
			organizationDetails,
			markupDetails,
		} = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		await this.validateClientName({ clientDetails });
		await this.validateCustomerFirstName({ clientPaymentRequesterUserDetails });
		await this.validatePaidAmount({ requestDetails, rfqDetails, productsDetailsValue, organizationDetails, markupDetails });
		await this.clickPaymentButton();
	}
}
