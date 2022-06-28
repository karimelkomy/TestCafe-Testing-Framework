import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { formatedNumber } from '../../../utilities/helpers';

export default class PaymentExpenseTable extends GenericElement {
	constructor() {
		super();
		this.billIdText = '//p-table//td[2]/a[text()=" #%s"]';
		this.workspaceText = '//p-table//td[@data-test-id="workspace-text" and text()="%s"]';
		this.totalText = '//span[@data-test-id="total-%s-text" and contains(., "%s")]';
		this.paidText = '//span[@data-test-id="paid-%s-text" and contains(., "%s")]';
	}

	async validateBillId({ billId }) {
		await this.validateElementVisibility(sprintf(this.billIdText, billId));
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
	}

	async validateTotal({ billDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			billDetails.expenseItems.map((expenseItem) => expenseItem.expenseAmount).reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);

		await this.validatePrice(this.totalText, totalExpenseAmount, organizationDetails);
	}

	async validatePaid({ totalPaid, organizationDetails }) {
		await this.validatePrice(this.paidText, totalPaid, organizationDetails);
	}

	async validatePaymentTable({ billId, totalPaid, billDetails, workspaceDetails, organizationDetails }) {
		await this.validateBillId({ billId });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateTotal({ billDetails, organizationDetails });
		await this.validatePaid({ totalPaid, organizationDetails });
	}
}
