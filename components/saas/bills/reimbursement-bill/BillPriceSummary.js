import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class BillPriceSummary extends GenericElement {
	constructor() {
		super();
		this.billSubTotalAmount = '//span[@data-test-id="bill-sub-total-%s-text" and contains(., "%s")]';
		this.billTotalAmount = '//span[@data-test-id="bill-total-%s-text" and contains(., "%s")]';
	}

	async validateBillSubTotal({ totalExpenseAmount, organizationDetails }) {
		await this.validatePrice(this.billSubTotalAmount, totalExpenseAmount, organizationDetails);
	}

	async validateBillTotal({ totalExpenseAmount, organizationDetails }) {
		await this.validatePrice(this.billTotalAmount, totalExpenseAmount, organizationDetails);
	}

	async validateSummary({ reimbursementDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			reimbursementDetails.expenseItems
				.map((expenseItem) => expenseItem.expenseAmount)
				.reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);

		await this.validateBillSubTotal({ totalExpenseAmount, organizationDetails });
		await this.validateBillTotal({ totalExpenseAmount, organizationDetails });
	}
}
