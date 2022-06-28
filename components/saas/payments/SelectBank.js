import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';
import { formatedNumber } from '../../../utilities/helpers';

export default class SelectBank extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.selectBankDropdown = '//p-dropdown[@data-test-id="select-bank-dropdown"]';
		this.firstBankDropdownItem = '//p-dropdownitem/li';
		this.selectedBillText =
			'//div[@data-test-id="payment-selected-table"]//span[@data-test-id="selected-bills-number-text" and text()=" (%s) "]';
		this.totalPaidText = '//div[@data-test-id="payment-selected-table"]//span[@data-test-id="total-paid-%s-text" and contains(., "%s")]';
		this.totalPendingText =
			'//div[@data-test-id="payment-selected-table"]//span[@data-test-id="total-pending-%s-text" and contains(., "%s")]';
		this.totalPayingNowText =
			'//div[@data-test-id="payment-selected-table"]//span[@data-test-id="total-paying-now-%s-text" and contains(., "%s")]';
	}

	async selectFirstBank() {
		await this.click(this.selectBankDropdown);
		await this.click(this.firstBankDropdownItem);
	}

	async validateSelectedBillsNumber() {
		await this.validateElementVisibility(sprintf(this.selectedBillText, '1'));
	}

	async validateTotalPaid({ totalPaid, organizationDetails }) {
		await this.validatePrice(this.totalPaidText, totalPaid, organizationDetails);
	}

	async validateTotalPending({ requestDetails, rfqDetails, organizationDetails, billDetails, productsDetails, markupDetails }) {
		const totalPending = rfqDetails
			? this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails })
			: billDetails.totalAdvanceAmount;

		await this.validatePrice(this.totalPendingText, totalPending, organizationDetails);
	}

	async validateTotalPayingNow({ requestDetails, rfqDetails, organizationDetails, billDetails, productsDetails, markupDetails }) {
		const totalPayingNow = rfqDetails
			? this.productsPrice.getTotalWithTaxAndShippingFeePrice({
					requestDetails,
					rfqDetails,
					productsDetails,
					markupDetails,
			  })
			: billDetails.totalAdvanceAmount;

		await this.validatePrice(this.totalPayingNowText, totalPayingNow, organizationDetails);
	}

	async submitBankAccount({ totalPaid, productsDetails, requestDetails, rfqDetails, organizationDetails, billDetails, markupDetails }) {
		if (!markupDetails) {
			await this.selectFirstBank();
		}

		await this.validateSelectedBillsNumber();
		await this.validateTotalPaid({ totalPaid, organizationDetails });
		await this.validateTotalPending({ requestDetails, rfqDetails, organizationDetails, billDetails, productsDetails, markupDetails });
		await this.validateTotalPayingNow({ requestDetails, rfqDetails, organizationDetails, billDetails, productsDetails, markupDetails });
	}

	async validateTotalExpensePending({ totalExpenseAmount, organizationDetails }) {
		await this.validatePrice(this.totalPendingText, totalExpenseAmount, organizationDetails);
	}

	async validateExpenseTotalPayingNow({ totalExpenseAmount, organizationDetails }) {
		await this.validatePrice(this.totalPayingNowText, totalExpenseAmount, organizationDetails);
	}

	async submitExpenseBankAccount({ totalPaid, billDetails, organizationDetails }) {
		const totalExpenseAmount = formatedNumber(
			billDetails.expenseItems.map((expenseItem) => expenseItem.expenseAmount).reduce((prev, next) => parseFloat(prev) + parseFloat(next))
		);

		await this.selectFirstBank();
		await this.validateSelectedBillsNumber();
		await this.validateTotalPaid({ totalPaid, organizationDetails });
		await this.validateTotalExpensePending({ totalExpenseAmount, organizationDetails });
		await this.validateExpenseTotalPayingNow({ totalExpenseAmount, organizationDetails });
	}

	async validate({ totalPaid, organizationDetails }) {
		await this.validateSelectedBillsNumber();
		await this.validateTotalPaid({ totalPaid, organizationDetails });
	}
}
