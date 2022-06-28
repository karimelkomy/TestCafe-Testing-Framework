import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';

export default class ReceivedPaymentTable extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.billIdText = '//a[@data-test-id="bill-id-text" and text()=" #%s"]';
		this.workspaceText = '//td[@data-test-id="workspace-text" and text()="%s"]';
		this.totalText = '//span[@data-test-id="total-%s-text" and contains(., "%s")]';
		this.paidText = '//span[@data-test-id="paid-%s-text" and contains(., "%s")]';
	}

	async validateBillId({ clientBillId }) {
		await this.validateElementVisibility(sprintf(this.billIdText, clientBillId));
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
	}

	async validateTotal({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const totalPrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.validatePrice(this.totalText, totalPrice, organizationDetails);
	}

	async validatePaid({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const paidPrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validatePrice(this.paidText, paidPrice, organizationDetails);
	}

	async validatePaymentTable({ productRequest }) {
		const {
			clientBillId,
			requestDetails,
			rfqDetails,
			productDetails,
			productsDetails,
			workspaceDetails,
			organizationDetails,
			markupDetails,
		} = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		await this.validateBillId({ clientBillId });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateTotal({ organizationDetails, requestDetails, rfqDetails, productsDetails: productsDetailsValue, markupDetails });
		await this.validatePaid({ organizationDetails, requestDetails, rfqDetails, productsDetails: productsDetailsValue, markupDetails });
	}
}
