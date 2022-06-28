import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class BudgetDetails extends GenericElement {
	constructor() {
		super();
		this.noActiveBudgetText = '//h2[@data-test-id="active-budget-label"]';
		this.budgetNameValueText = '//penny-budget-detail/div/div/div/h1[contains(text(), "%s")]';
		this.totalBudgetText = '//span[@data-test-id="total-budget-%s-text" and contains(., "%s")]';
		this.totalBudgetRemainingText = '//span[@data-test-id="total-budget-remaining-%s-text" and contains(., "%s")]';
		this.totalSpentText = '//span[@data-test-id="total-spent-%s-text" and contains(., "%s")]';
	}

	async validateBudgetName({ budgetDetails }) {
		const { budgetName } = budgetDetails;

		await this.validateElementVisibility(sprintf(this.budgetNameValueText, budgetName));
	}

	async validateTotalBudget({ budgetDetails, organizationDetails }) {
		const { budgetAmount } = budgetDetails;

		await this.validatePrice(this.totalBudgetText, budgetAmount, organizationDetails);
	}

	async validateTotalBudgetRemaining({ budgetDetails, organizationDetails }) {
		const { balanceAmount } = budgetDetails;

		await this.validatePrice(this.totalBudgetRemainingText, balanceAmount, organizationDetails);
	}

	async validateTotalSpent({ budgetDetails, organizationDetails }) {
		const { spentAmount } = budgetDetails;

		await this.validatePrice(this.totalSpentText, spentAmount, organizationDetails);
	}

	async validate({ budget }) {
		const { budgetDetails, organizationDetails } = budget;

		await this.validateBudgetName({ budgetDetails });
		await this.validateTotalBudget({ budgetDetails, organizationDetails });
		await this.validateTotalBudgetRemaining({ budgetDetails, organizationDetails });
		await this.validateTotalSpent({ budgetDetails, organizationDetails });
	}
}
