import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';
import { urls } from '../../../data/saas/constants/urls';

export default class PaymentTable extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.billIdText = '//a[@data-test-id="bill-id-text" and text()=" #%s"]';
		this.workspaceText = '//td[@data-test-id="workspace-text" and text()="%s"]';
		this.totalText = '//span[@data-test-id="total-%s-text" and contains(., "%s")]';
		this.paidText = '//span[@data-test-id="paid-%s-text" and contains(., "%s")]';
	}

	async getBillUrl(billId) {
		return urls.buyer + (await this.getAttributeValue(sprintf(this.billIdText, billId), 'href'));
	}

	async validateBillId({ billId }) {
		await this.validateElementVisibility(sprintf(this.billIdText, billId));
	}

	async validateWorkspace({ workspaceDetails }) {
		if (workspaceDetails) {
			const { details } = workspaceDetails;

			await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
		}
	}

	async validateTotal({ productsDetails, requestDetails, rfqDetails, organizationDetails, billDetails, markupDetails }) {
		const totalPrice = rfqDetails
			? this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails })
			: billDetails.totalAdvanceAmount;

		await this.validatePrice(this.totalText, totalPrice, organizationDetails);
	}

	async validatePaid({ totalPaid, organizationDetails }) {
		await this.validatePrice(this.paidText, totalPaid, organizationDetails);
	}

	async validatePaymentTable({
		billId,
		totalPaid,
		productsDetails,
		workspaceDetails,
		requestDetails,
		rfqDetails,
		organizationDetails,
		billDetails,
		markupDetails,
	}) {
		await this.validateBillId({ billId });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateTotal({ productsDetails, requestDetails, rfqDetails, organizationDetails, billDetails, markupDetails });
		await this.validatePaid({ totalPaid, organizationDetails });
	}
}
