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

	async validateTotalExpenseAmount({ reimbursementDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			reimbursementDetails.expenseItems
				.map((expenseItem) => expenseItem.expenseAmount)
				.reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);

		await this.validatePrice(this.totalExpenseAmountText, totalExpenseAmount, organizationDetails);
	}

	async validatePayee({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.payeeText, firstName));
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
	}

	async validateTotalExpenseItems({ reimbursementDetails }) {
		const { expenseItems } = reimbursementDetails;

		await this.validateElementVisibility(sprintf(this.totalExpenseItemsText, expenseItems.length));
	}

	async validateBillInfoBox({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails }) {
		await this.validateTotalExpenseAmount({ reimbursementDetails, organizationDetails });
		await this.validatePayee({ requesterUserDetails });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateTotalExpenseItems({ reimbursementDetails });
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.bill, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}
}
