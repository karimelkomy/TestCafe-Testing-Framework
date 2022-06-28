import GenericElement from '../../../shared/core/GenericElement';
import BudgetInfo from './BudgetInfo';
import ExpenseAccounts from '../create-budget/expense-accounts/ExpenseAccounts';
import WorkspaceLimits from './WorkspaceLimits';

export default class CreateBudget extends GenericElement {
	constructor() {
		super();
		this.budgetInfo = new BudgetInfo();
		this.expenseAccounts = new ExpenseAccounts();
		this.workspaceLimits = new WorkspaceLimits();
		this.createBudgetButton = '//button[@data-test-id="create-budget-button"]';
	}

	async clickCreateBudgetButton() {
		await this.click(this.createBudgetButton);
	}

	async submitBudget({ budget }) {
		const { budgetDetails, organizationDetails } = budget;

		await this.clickCreateBudgetButton();

		await this.budgetInfo.submit({ budgetDetails });
		await this.expenseAccounts.submit({ budgetDetails, organizationDetails });
		await this.workspaceLimits.submit();
	}
}
