import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class BillExpenseTable extends GenericElement {
	constructor() {
		super();
		this.element = '//p-table//tr[.//span[@data-test-id="name-text" and text()="%s"]]';
		this.expenseNameText = `${this.element}//span[@data-test-id="name-text" and text()="%s"]`;
		this.remarksText = `${this.element}//td[@data-test-id="description-text" and contains(., "%s")]`;
		this.uploadedAttachmentsChip = `${this.element}//a[contains(@class, "file-name")]`;
		this.totalText = `${this.element}//td[5]//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
	}

	async validateExpenseName({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.expenseNameText, expenseTitle, expenseTitle));
	}

	async validateRemarks({ expenseItem }) {
		const { expenseTitle, expenseComment } = expenseItem;

		await this.validateElementVisibility(sprintf(this.remarksText, expenseTitle, expenseComment));
	}

	async validateAttachmentChip({ expenseItem }) {
		const { expenseTitle } = expenseItem;

		await this.validateElementVisibility(sprintf(this.uploadedAttachmentsChip, expenseTitle));
	}

	async validateTotal({ expenseItem, organizationDetails }) {
		const { expenseTitle, expenseAmount } = expenseItem;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.totalText, expenseTitle, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.totalText, expenseTitle, 'price', formatedNumber(expenseAmount)));
	}

	async validateExpenseTable({ bill }) {
		const { billDetails, organizationDetails } = bill;
		const { expenseItems } = billDetails;

		// TODO: validate date
		for (let expenseItem of expenseItems) {
			await this.validateExpenseName({ expenseItem });
			await this.validateRemarks({ expenseItem });
			await this.validateAttachmentChip({ expenseItem });
			await this.validateTotal({ expenseItem, organizationDetails });
		}
	}
}
