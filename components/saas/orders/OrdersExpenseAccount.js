import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductsPrice from '../shared/ProductsPrice';
import { formatedNumber } from '../../../utilities/helpers';

export default class OrdersExpenseAccount extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.productRow =
			'//p-table[@data-test-id="product-and-service-table"]//tr[@data-test-id="product-row"][.//div[contains(text(), "%s")]]';
		this.selectTotalExpenseAccountDropdown = `${this.productRow}//p-dropdown[@data-test-id="select-expense-account-dropdown"]`;
		this.selectShippingFeeExpenseAccountDropdown =
			'//div[@data-test-id="product-taxes-summary"]//p-dropdown[@data-test-id="select-expense-account-dropdown"]';
		this.shippingFeeExpenseAccountCurrencyText =
			'(//div[@data-test-id="product-taxes-summary"]//span[@data-test-id="balance-currency-text" and text()="%s"])[2]';
		this.selectExpenseAccountDropdownItem = '//p-dropdownitem/li[contains(@aria-label, "%s")]';
		this.expenseAccountBalanceText = `(${this.productRow}//span[@data-test-id="balance-%s-text" and contains(., "%s")])[2]`;
		this.workspaceBalanceText =
			'(//div[@data-test-id="workspace-limit-summary"]//span[@data-test-id="balance-%s-text" and contains(., "%s")])[2]';
	}

	async selectTotalExpenseAccount({ productName, expenseAccount }) {
		await this.click(sprintf(this.selectTotalExpenseAccountDropdown, productName));
		await this.click(sprintf(this.selectExpenseAccountDropdownItem, expenseAccount));
	}

	async selectShippingFeeExpenseAccount({ expenseAccount, organizationDetails }) {
		const { currencyCode } = organizationDetails;

		await this.click(this.selectShippingFeeExpenseAccountDropdown);
		await this.click(sprintf(this.selectExpenseAccountDropdownItem, expenseAccount));
		await this.validateElementVisibility(sprintf(this.shippingFeeExpenseAccountCurrencyText, currencyCode));
	}

	async selectExpenseAccounts({ productsDetails, budgetDetails, organizationDetails }) {
		const { expenseAccount } = budgetDetails;

		for (const productDetails of productsDetails) {
			const { productName } = productDetails;

			await this.selectTotalExpenseAccount({ productName, expenseAccount });
		}

		await this.selectShippingFeeExpenseAccount({ expenseAccount, organizationDetails });
	}

	async calculateNewBudgetDetails({ productsDetails, budgetDetails, requestDetails, rfqDetails }) {
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
		});

		budgetDetails.bookedAmount += totalWithTaxAndShippingFeePrice;
		budgetDetails.balanceAmount -= totalWithTaxAndShippingFeePrice;

		return budgetDetails;
	}

	async validateExpenseAccountBalance({ productsDetails, balanceAmount, organizationDetails }) {
		const { currencyCode } = organizationDetails;

		for (const productDetails of productsDetails) {
			const { productName } = productDetails;

			await this.validateElementVisibility(sprintf(this.expenseAccountBalanceText, productName, 'currency', currencyCode));
			await this.validateElementVisibility(sprintf(this.expenseAccountBalanceText, productName, 'price', formatedNumber(balanceAmount)));
		}
	}

	async validateWorkspaceBalance({ balanceAmount, organizationDetails }) {
		await this.validatePrice(this.workspaceBalanceText, balanceAmount, organizationDetails);
	}

	async validate({ productsDetails, budgetDetails, organizationDetails }) {
		const { balanceAmount } = budgetDetails;

		await this.validateExpenseAccountBalance({ productsDetails, balanceAmount, organizationDetails });
		await this.validateWorkspaceBalance({ balanceAmount, organizationDetails });
	}
}
