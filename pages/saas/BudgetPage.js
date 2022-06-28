import CreateBudget from '../../components/saas/budgets/create-budget/CreateBudget';
import BudgetDetails from '../../components/saas/budgets/budget-details/BudgetDetails';
import BudgetView from '../../components/saas/budgets/budget-details/BudgetView';
import BudgetSuccess from '../../components/saas/budgets/create-budget/BudgetSuccess';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class BudgetPage {
	constructor() {
		this.createBudget = new CreateBudget();
		this.budgetDetails = new BudgetDetails();
		this.budgetView = new BudgetView();
		this.budgetSuccess = new BudgetSuccess();
		this.modulesSideBar = new ModulesSideBar();
	}

	async validateBudgetDetails({ budget }) {
		await this.modulesSideBar.clickBudgetsLink();

		await this.budgetDetails.validate({ budget });
	}

	async getBudgetDetails({ budget }) {
		await this.modulesSideBar.clickBudgetsLink();

		const newBudgetDetails = await this.budgetView.getBudget({ budget });

		budget.updateBudget(newBudgetDetails);
	}

	async createNewBudget({ budget }) {
		await this.modulesSideBar.clickBudgetsLink();
		await this.createBudget.submitBudget({ budget });
		await this.budgetSuccess.submit();
	}
}
