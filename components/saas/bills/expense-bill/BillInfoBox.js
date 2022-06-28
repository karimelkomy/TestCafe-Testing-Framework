import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../../utilities/helpers';
import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class BillInfoBox extends GenericElement {
	constructor() {
		super();
		this.totalExpenseAmountText = '//span[@data-test-id = "total-expense-amount-%s-text" and contains(. ,"%s")]';
		this.payeeText = '//h2[@data-test-id="payee-text" and text()=" %s "]';
		this.workspaceText = '//h2[@data-test-id="workspace-text" and text()="%s"]';
		this.totalExpenseItemsText = '//h2[@data-test-id="total-expense-items-text" and text()="%s"]';
		this.uploadInvoiceInput = '//penny-upload//input';
		this.uploadedInvoiceChip = '//div[contains(@class, "bill-invoice-content")][.//a[contains(@class, "file-name")]]';
	}

	async validateTotalExpenseAmount({ billDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			billDetails.expenseItems.map((expenseItem) => expenseItem.expenseAmount).reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);

		await this.validatePrice(this.totalExpenseAmountText, totalExpenseAmount, organizationDetails);
	}

	async validatePayee({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.payeeText, vendorName));
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
	}

	async validateTotalExpenseItems({ billDetails }) {
		const totalExpenseItems = billDetails.expenseItems.length;

		await this.validateElementVisibility(sprintf(this.totalExpenseItemsText, totalExpenseItems));
	}

	async validateBillInfoBox({ bill }) {
		const { billDetails, workspaceDetails, vendorDetails, organizationDetails } = bill;

		await this.validateTotalExpenseAmount({ billDetails, organizationDetails });
		await this.validatePayee({ vendorDetails });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateTotalExpenseItems({ billDetails });
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.bill, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}
}
