import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class BillExpenseTable extends GenericElement {
	constructor() {
		super();
		this.element = '//p-table//tr[.//span[@data-test-id="name-text" and text()="%s"]]';
		this.expenseNameText = `${this.element}//span[@data-test-id="name-text" and text()="%s"]`;
		this.payeeText = `${this.element}//td[@data-test-id="vendor-text"]/span[text()="%s"]`;
		this.remarksText = `${this.element}//td[@data-test-id="description-text" and contains(., "%s")]`;
		this.uploadedAttachmentsChip = `${this.element}//a[contains(@class, "file-name")]`;
		this.totalText = `${this.element}//td[5]//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
	}

	async validateExpenseName({ expenseTitle }) {
		await this.validateElementVisibility(sprintf(this.expenseNameText, expenseTitle, expenseTitle));
	}

	async validateRemarks({ expenseTitle, expenseComment }) {
		await this.validateElementVisibility(sprintf(this.remarksText, expenseTitle, expenseComment));
	}

	async validateAttachmentChip({ expenseTitle }) {
		await this.validateElementVisibility(sprintf(this.uploadedAttachmentsChip, expenseTitle));
	}

	async validateTotal({ expenseTitle, expenseAmount, organizationDetails }) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.totalText, expenseTitle, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.totalText, expenseTitle, 'price', formatedNumber(expenseAmount)));
	}

	async validateExpenseTable({ reimbursementDetails, organizationDetails }) {
		const { expenseItems } = reimbursementDetails;

		for (let expenseItem of expenseItems) {
			const { expenseTitle, expenseAmount, expenseComment } = expenseItem;

			// TODO: validate date
			await this.validateExpenseName({ expenseTitle });
			await this.validateRemarks({ expenseTitle, expenseComment });
			await this.validateAttachmentChip({ expenseTitle });
			await this.validateTotal({ expenseTitle, expenseAmount, organizationDetails });
		}
	}
}
