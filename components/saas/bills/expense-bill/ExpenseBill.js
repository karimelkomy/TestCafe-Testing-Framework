import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class ExpenseBill extends GenericElement {
	constructor() {
		super();
		this.vendorDropDown = '//p-dropdown[@data-test-id="vendor-dropdown"]';
		this.workspaceDropDown = '//p-dropdown[@data-test-id="select-workspace-dropdown"]';
		this.DropDownItem = '//p-dropdownitem/li[.="%s"]';
		this.expenseTitleInput = '//input[@data-test-id="title-input"]';
		this.expenseAmountInput = '//p-inputnumber[@data-test-id="price-input"]';
		this.addNoteInput = '//textarea[@data-test-id="add-note-input"]';
		this.expenseTotal = '//span[@data-test-id="total-expenses-price-text"]';
		this.uploadDocumentInput = '//penny-upload//input';
		this.addExpenseButton = '//button[@data-test-id="add-expense-button"]';
		this.expenseAmountText = '//p-card[.//h2[text()="%s"]]//span[@data-test-id="expense-%s-text"]';
		this.expenseTitleText = '//p-card//h2[text()="%s"]';
		this.expenseCommentText = '//p-card[.//h2[text()="%s"]]//div[text()=" %s "]';
		this.showDocumentButton = '//p-card[.//h2[text()="%s"]]//button[@data-test-id="show-documents-button"]';
		this.totalExpensesText = '//span[@data-test-id="total-expenses-%s-text"]';
		this.submitExpensesButton = '//button[@data-test-id="submit-expenses-button"]';
	}

	async selectVendor({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.click(this.vendorDropDown);
		await this.click(sprintf(this.DropDownItem, vendorName));
	}

	async selectWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.click(this.workspaceDropDown);
		await this.click(sprintf(this.DropDownItem, details.name));
	}

	async fillTitle({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.fill(this.expenseTitleInput, expenseTitle);
	}

	async fillExpenseAmount({ expenseItem }) {
		const { expenseAmount } = expenseItem;

		await this.fill(this.expenseAmountInput, formatedNumber(expenseAmount));
	}

	async fillExpenseComment({ expenseItem }) {
		const { expenseComment } = expenseItem;

		await this.fill(this.addNoteInput, expenseComment);
	}

	async uploadDocument() {
		await this.uploadFile(imagePath.receipt, this.uploadDocumentInput);
	}

	async clickAddExpenseButton() {
		await this.click(this.addExpenseButton);
	}

	async validateExpenseTitle({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseTitleText, expenseTitle));
	}

	async validateExpenseComment({ expenseItem }) {
		const { expenseTitle, expenseComment } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseCommentText, expenseTitle, expenseComment));
	}

	async validateDocument({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.showDocumentButton, expenseTitle));
	}

	async validateExpenseAmount({ expenseItem, currencyCode }) {
		const { expenseTitle, expenseAmount } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseAmountText, expenseTitle, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.expenseAmountText, expenseTitle, 'price', formatedNumber(expenseAmount)));
	}

	async validateTotalExpenses({ expenseItems, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			expenseItems.map((expenseItem) => expenseItem.expenseAmount).reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);
		const { expenseAmount } = totalExpenseAmount;

		await this.validatePrice(this.totalExpensesText, expenseAmount, organizationDetails);
	}

	async validateAddedExpense({ expenseItem, organizationDetails }) {
		// TODO: validate date
		await this.validateExpenseTitle({ expenseItem });
		await this.validateExpenseComment({ expenseItem });
		await this.validateDocument({ expenseItem });
		await this.validateExpenseAmount({ expenseItem, organizationDetails });
	}

	async clickSubmitExpensesButton() {
		await this.click(this.submitExpensesButton);
	}

	async submitAddedExpense({ expenseItems, organizationDetails }) {
		await this.validateTotalExpenses({ expenseItems, organizationDetails });
		await this.clickSubmitExpensesButton();
	}

	async create({ bill }) {
		const { billDetails, workspaceDetails, vendorDetails, organizationDetails } = bill;
		const { expenseItems } = billDetails;

		// TODO: validate date
		await this.selectVendor({ vendorDetails });
		await this.selectWorkspace({ workspaceDetails });

		for (let expenseItem of expenseItems) {
			await this.fillTitle({ expenseItem });
			await this.fillExpenseAmount({ expenseItem });
			await this.fillExpenseComment({ expenseItem });
			await this.uploadDocument();
			await this.clickAddExpenseButton();
			await this.validateAddedExpense({ expenseItem, organizationDetails });
		}

		await this.submitAddedExpense({ expenseItems, organizationDetails });
	}
}
