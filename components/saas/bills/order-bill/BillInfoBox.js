import { sprintf } from 'sprintf-js';
import ProductsPrice from '../../shared/ProductsPrice';
import GenericElement from '../../../shared/core/GenericElement';
import TotalPaid from '../../../../data/saas/constants/totalPaid';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class BillInfoBox extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.totalExpenseAmountText = '//span[@data-test-id="total-expense-amount-%s-text" and contains(., "%s")]';
		this.totalPaidText = '//span[@data-test-id="total-paid-%s-text" and contains(., "%s")]';
		this.billDueText = '//span[@data-test-id="bill-due-%s-text" and contains(., "%s")]';
		this.shippingFeeText = '//div[@data-test-id="info-boxes"]//span[@data-test-id="shipping-fee-%s-text" and contains(., "%s")]';
		this.paymentTermText = '//penny-info-box[@data-test-id="payment-term-info-box"]//div[contains(text(), "%s")]';
		this.deliveryToText = '//h2[@data-test-id="delivery-to-text" and contains(., "%s")]';
		this.uploadInvoiceInput = '//penny-upload//input';
		this.uploadedInvoiceChip = '//div[contains(@class, "bill-invoice-content")][.//a[contains(@class, "file-name")]]';
	}

	async validateTotalExpenseAmount({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		let totalExpenseAmountPrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.validatePrice(this.totalExpenseAmountText, totalExpenseAmountPrice, organizationDetails);
	}

	async validateShippingFee({ organizationDetails, rfqDetails }) {
		const { productShippingFee, shippingFee } = rfqDetails;
		const shippingFeeValue = productShippingFee || shippingFee;

		await this.validatePrice(this.shippingFeeText, shippingFeeValue, organizationDetails);
	}

	async validateTotalPaid({ organizationDetails, totalPaid }) {
		await this.validatePrice(this.totalPaidText, totalPaid, organizationDetails);
	}

	async validateBillDue({ organizationDetails, billDue }) {
		await this.validatePrice(this.billDueText, billDue, organizationDetails);
	}

	async validateDeliveryTo({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.deliveryToText, details.name));
	}

	async validateBillInfoBox({ requestDetails, rfqDetails, workspaceDetails, organizationDetails, productsDetails, markupDetails }) {
		await this.validateTotalExpenseAmount({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
		await this.validateShippingFee({ organizationDetails, rfqDetails });
		await this.validateDeliveryTo({ workspaceDetails });
	}

	async submit({ requestDetails, rfqDetails, workspaceDetails, organizationDetails, productsDetails }) {
		await this.validateBillInfoBox({ requestDetails, rfqDetails, workspaceDetails, organizationDetails, productsDetails });
		await this.uploadInvoice();
		await this.validateUploadedInvoice();
	}

	async validateSubmitted({ requestDetails, rfqDetails, workspaceDetails, organizationDetails, productsDetails, markupDetails }) {
		const billDue = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validateTotalExpenseAmount({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
		await this.validateTotalPaid({ organizationDetails, totalPaid: TotalPaid.INITIAL });
		await this.validateBillDue({ organizationDetails, billDue });
		await this.validateDeliveryTo({ workspaceDetails });
		await this.validateUploadedInvoice();
	}

	async validatePaidBillInfoBox({ requestDetails, rfqDetails, workspaceDetails, organizationDetails, productsDetails, markupDetails }) {
		const totalPaid = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validateTotalExpenseAmount({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
		await this.validateTotalPaid({ organizationDetails, totalPaid });
		await this.validateBillDue({ organizationDetails, billDue: TotalPaid.INITIAL });
		await this.validateDeliveryTo({ workspaceDetails });
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.bill, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}
}
