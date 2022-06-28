import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class AdvanceBill extends GenericElement {
	constructor() {
		super();
		this.billHeaderText = '//span[@data-test-id="bill-id-text" and contains(text(), "%s")]';
		this.totalAdvanceAmountText = '//span[@data-test-id="total-advance-amount-%s-text" and contains(., "%s")]';
		this.vendorText = '//h2[@data-test-id="vendor-text" and text()="%s"]';
		this.orderIdText = '//h2[@data-test-id="order-id-text" and text()="%s"]';
		this.billTotalText = '//span[@data-test-id="bill-total-%s-text" and contains(., "%s")]';
		this.submitButton = '//button[@data-test-id="submit-button" and contains(@class, "display-none")]';
		this.uploadInvoiceInput = '//penny-upload//input';
		this.uploadedInvoiceChip = '//div[contains(@class, "bill-invoice-content")][.//a[contains(@class, "file-name")]]';
		this.remarkInput = '//textarea[@data-test-id="comments-input"]';
		this.remarkText = '//div[@class = "comments-container"]//span[text()="%s"]';
	}

	async validateAdvanceBillId({ billId }) {
		await this.validateElementVisibility(sprintf(this.billHeaderText, billId));
	}

	async validateTotalAdvanceAmount({ organizationDetails, billDetails }) {
		const { totalAdvanceAmount } = billDetails;

		await this.validatePrice(this.totalAdvanceAmountText, totalAdvanceAmount, organizationDetails);
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorText, vendorName));
	}

	async validateOrderId({ billDetails }) {
		const { orderId } = billDetails;

		await this.validateElementVisibility(sprintf(this.orderIdText, orderId));
	}

	async validateBillTotal({ organizationDetails, billDetails }) {
		const { totalAdvanceAmount } = billDetails;

		await this.validatePrice(this.billTotalText, totalAdvanceAmount, organizationDetails);
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.bill, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}

	async fillRemark({ billDetails }) {
		const { remark } = billDetails;

		await this.fill(this.remarkInput, remark);
	}

	async validateRemark({ billDetails }) {
		const { remark } = billDetails;

		await this.validateElementVisibility(sprintf(this.remarkText, remark));
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async validate({ organizationDetails, vendorDetails, billId, billDetails }) {
		await this.validateAdvanceBillId({ billId });
		await this.validateTotalAdvanceAmount({ organizationDetails, billDetails });
		await this.validateVendorName({ vendorDetails });
		await this.validateOrderId({ billDetails });
		await this.validateBillTotal({ organizationDetails, billDetails });
	}

	async submit({ bill }) {
		const { organizationDetails, vendorDetails, billId, billDetails } = bill;

		await this.validate({ organizationDetails, vendorDetails, billId, billDetails });
		await this.uploadInvoice();
		await this.validateUploadedInvoice();
		await this.fillRemark({ billDetails });
		await this.clickSubmitButton();
	}

	async validateSubmitted({ bill }) {
		const { organizationDetails, vendorDetails, billId, billDetails } = bill;

		await this.validate({ organizationDetails, vendorDetails, billId, billDetails });
		await this.validateUploadedInvoice();
		await this.validateRemark({ billDetails });
	}
}
