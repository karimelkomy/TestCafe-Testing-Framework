import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';
import { formatedNumber } from '../../../../utilities/helpers';

export default class ReimbursementInfo extends GenericElement {
	constructor() {
		super();
		this.requestTitleInput = '//input[@data-test-id="request-title-input"]';
		this.requestPriorityButton = '//p-radiobutton[.="%s"]//div[@role="radio"]';
		this.selectWorkspaceDropdown = '//p-dropdown[@data-test-id="select-workspace-dropdown"]';
		this.selectWorkspaceDropdownItem = '//li[.//span[text()="%s"]]';
		this.expenseTitleInput = '//input[@id="expense-name"]';
		this.merchantInput = '//input[@id="vendor-name"]';
		this.amountInput = '//input[@name="amount"]';
		this.addNoteInput = '//textarea[@data-test-id="add-note-input"]';
		this.uploadDocumentInput = '//input[@type="file"]';
		this.uploadedDocumentChip = '//a[contains(@class, "file-name")]';
		this.addExpenseButton = '//button[@data-test-id="add-expense-button"]';
		this.expenseAmountText = '//p-card[.//h2[text()="%s"]]//span[@data-test-id="total-price-%s-text" and contains(. ,"%s")]';
		this.expenseTitleText = '//p-card//h2[text()="%s"]';
		this.merchantText = '//p-card[.//h2[text()="%s"]]//div[@data-test-id="vendor-name-text" and text()="%s"]';
		this.expenseCommentText = '//p-card[.//h2[text()="%s"]]//div[@data-test-id="expense-description-text" and text()=" %s "]';
		this.showDocumentButton = '//p-card[.//h2[text()="%s"]]//button[@data-test-id="show-documents-button"]';
		this.totalExpensesText = '//span[@data-test-id="total-added-expenses-%s-text" and contains(. ,"%s")]';
		this.submitExpenseButton = '//button[@data-test-id="submit-expense-button"]';
	}

	async fillRequestTitle({ reimbursementDetails }) {
		const { requestTitle } = reimbursementDetails;

		await this.fill(this.requestTitleInput, requestTitle);
	}

	async selectRequestPriority({ reimbursementDetails }) {
		const { requestPriority } = reimbursementDetails;

		await this.click(sprintf(this.requestPriorityButton, requestPriority));
	}

	async selectWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.click(this.selectWorkspaceDropdown);
		await this.click(sprintf(this.selectWorkspaceDropdownItem, details.name));
	}

	async fillExpenseTitle({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.fill(this.expenseTitleInput, expenseTitle);
	}

	async fillMerchant({ expenseItem }) {
		const { merchantName } = expenseItem;

		await this.fill(this.merchantInput, merchantName);
	}

	async fillExpenseAmount({ expenseItem }) {
		const { expenseAmount } = expenseItem;

		await this.fill(this.amountInput, formatedNumber(expenseAmount));
	}

	async fillExpenseComment({ expenseItem }) {
		const { expenseComment } = expenseItem;

		await this.fill(this.addNoteInput, expenseComment);
	}

	async uploadDocument() {
		await this.uploadFile(imagePath.receipt, this.uploadDocumentInput);
		await this.validateElementVisibility(this.uploadedDocumentChip);
	}

	async clickAddExpenseButton() {
		await this.click(this.addExpenseButton);
	}

	async validateExpenseTitle({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseTitleText, expenseTitle));
	}

	async validateMerchantName({ expenseItem }) {
		const { expenseTitle, merchantName } = expenseItem;

		await this.validateElementVisibility(sprintf(this.merchantText, expenseTitle, merchantName));
	}

	async validateExpenseComment({ expenseItem }) {
		const { expenseTitle, expenseComment } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseCommentText, expenseTitle, expenseComment));
	}

	async validateDocument({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.showDocumentButton, expenseTitle));
	}

	async validateExpenseAmount({ expenseItem, organizationDetails }) {
		const { expenseTitle, expenseAmount } = expenseItem;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.expenseAmountText, expenseTitle, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.expenseAmountText, expenseTitle, 'price', formatedNumber(expenseAmount)));
	}

	async validateTotalExpenses({ totalExpenseAmount, organizationDetails }) {
		await this.validatePrice(this.totalExpensesText, totalExpenseAmount, organizationDetails);
	}

	async clickSubmitExpensesButton() {
		await this.click(this.submitExpenseButton);
	}

	async validateAddedExpense({ expenseItem, organizationDetails }) {
		// TODO: validate date
		await this.validateExpenseTitle({ expenseItem });
		await this.validateMerchantName({ expenseItem });
		await this.validateExpenseComment({ expenseItem });
		await this.validateDocument({ expenseItem });
		await this.validateExpenseAmount({ expenseItem, organizationDetails });
	}

	async submitAddedExpenses({ reimbursementDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			reimbursementDetails.expenseItems
				.map((expenseItem) => expenseItem.expenseAmount)
				.reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);

		await this.validateTotalExpenses({ totalExpenseAmount, organizationDetails });
		await this.clickSubmitExpensesButton();
	}

	async submit({ reimbursementRequest }) {
		const { workspaceDetails, reimbursementDetails, organizationDetails } = reimbursementRequest;

		await this.fillRequestTitle({ reimbursementDetails });
		await this.selectWorkspace({ workspaceDetails });
		// await this.selectRequestPriority({ reimbursementDetails }); // BUG: request priority is not showing in gaiat org and request priorty is not showing anywhere after selection in gaiat org

		for (let expenseItem of reimbursementDetails.expenseItems) {
			await this.fillExpenseTitle({ expenseItem });
			await this.fillMerchant({ expenseItem });
			await this.fillExpenseAmount({ expenseItem });
			await this.fillExpenseComment({ expenseItem });
			await this.uploadDocument();
			await this.clickAddExpenseButton();
			await this.validateAddedExpense({ expenseItem, organizationDetails });
		}

		await this.submitAddedExpenses({ reimbursementDetails, organizationDetails });
	}
}
