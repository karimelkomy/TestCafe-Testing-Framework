import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class ReimbursementReviewAndSubmit extends GenericElement {
	constructor() {
		super();
		this.requestTitleText = '//penny-review-submit-expense//h3[@class="title-text" and contains(text(), "%s")]';
		this.workspaceText = '//div[@data-test-id="workspace-value" and .= "%s"]';
		this.requestTypeText = '//div[@data-test-id="request-type-value" and .= "%s"]';
		this.totalExpensesAmountText = '//div[@data-test-id="total-expenses-value" and .= "%s"]';
		this.totalExpensesItemsText = '//div[@data-test-id="total-expense-items-value" and .= "%s"]';
		this.expenseTitleText = '//div[contains(@class, "review-data")]//span[text()="%s"]';
		this.vendorNameText =
			'//div[contains(@class, "review-data")][.//span[text()="%s"]]//span[@data-test-id="vendor-name-text" and text()="%s"]';
		this.expenseAmountText =
			'//div[contains(@class, "review-data")][.//span[text()="%s"]]//span[@data-test-id="amount-%s-text" and contains(. ,"%s")]';
		this.remarksText = '//div[contains(@class, "review-data")][.//span[text()="%s"]]//span[@data-test-id="remark-text"and text()="%s"]';
		this.attachmentChip =
			'//div[contains(@class, "review-data")][.//span[text()="%s"]]//div[.//span[text()="Attachments"]]/div[./a[@href]]';
		this.submitRequestButton = '//button[@data-test-id="submit-request-button"]';
	}

	async validateRequestTitle({ reimbursementDetails }) {
		const { requestTitle } = reimbursementDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateRequestType({ reimbursementDetails }) {
		const { requestType } = reimbursementDetails;

		await this.validateElementVisibility(sprintf(this.requestTypeText, requestType));
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
	}

	async validateTotalExpenses({ reimbursementDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			reimbursementDetails.expenseItems
				.map((expenseItem) => expenseItem.expenseAmount)
				.reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.totalExpensesAmountText, `${currencyCode} ${totalExpenseAmount}`));
	}

	async validateTotalExpensesItems({ reimbursementDetails }) {
		const totalExpenseItems = reimbursementDetails.expenseItems.length;

		await this.validateElementVisibility(sprintf(this.totalExpensesItemsText, totalExpenseItems));
	}

	async validateExpenseTitle({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseTitleText, expenseTitle));
	}

	async validateMerchantName({ expenseItem }) {
		const { expenseTitle, merchantName } = expenseItem;

		await this.validateElementVisibility(sprintf(this.vendorNameText, expenseTitle, merchantName));
	}

	async validateExpenseAmount({ expenseItem, organizationDetails }) {
		const { expenseTitle, expenseAmount } = expenseItem;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.expenseAmountText, expenseTitle, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.expenseAmountText, expenseTitle, 'price', formatedNumber(expenseAmount)));
	}

	async validateExpenseRemark({ expenseItem }) {
		const { expenseTitle, expenseComment } = expenseItem;

		await this.validateElementVisibility(sprintf(this.remarksText, expenseTitle, expenseComment));
	}

	async validateAttachment({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.attachmentChip, expenseTitle));
	}

	async clickSubmitRequestButton() {
		await this.click(this.submitRequestButton);
	}

	async validate({ reimbursementRequest }) {
		const { workspaceDetails, reimbursementDetails, organizationDetails } = reimbursementRequest;

		// TODO: validate date
		await this.validateRequestTitle({ reimbursementDetails });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateRequestType({ reimbursementDetails });
		await this.validateTotalExpenses({ reimbursementDetails, organizationDetails });
		await this.validateTotalExpensesItems({ reimbursementDetails });

		for (let expenseItem of reimbursementDetails.expenseItems) {
			await this.validateExpenseTitle({ expenseItem });
			await this.validateMerchantName({ expenseItem });
			await this.validateExpenseAmount({ expenseItem, organizationDetails });
			await this.validateExpenseRemark({ expenseItem });
			await this.validateAttachment({ expenseItem });
		}
	}

	async submit({ reimbursementRequest }) {
		await this.validate({ reimbursementRequest });
		await this.clickSubmitRequestButton();
	}
}
