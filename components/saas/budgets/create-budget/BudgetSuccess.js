import GenericElement from '../../../shared/core/GenericElement';
import { getNumberFromText } from '../../../../utilities/helpers';

export default class BudgetSuccess extends GenericElement {
	constructor() {
		super();
		this.successBudgetMessage = '//penny-budget-success//h4[@data-test-id="well-done-message"]';
		this.budgetIdText = '//penny-budget-success//span[contains(., "Budget #")]';
		this.goToBudgetsButton = '//button[@data-test-id="go-to-budgets-button"]';
	}

	async validateBudgetSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successBudgetMessage);
	}

	async getBudgetId() {
		const budgetText = await this.getText(this.budgetIdText);

		return getNumberFromText(budgetText);
	}

	async clickBudgetId() {
		await this.click(this.budgetIdText);
	}

	async clickGoToBudgetButton() {
		await this.click(this.goToBudgetsButton);
	}

	async submit() {
		await this.validateBudgetSubmittedSuccessfully();
		const createdBudgetId = await this.getBudgetId();
		await this.clickGoToBudgetButton();

		return createdBudgetId;
	}
}
