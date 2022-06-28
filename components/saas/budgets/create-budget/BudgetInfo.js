import GenericElement from '../../../shared/core/GenericElement';
import { selectDate, getTodayDate, getNextYearDate } from '../../../../utilities/helpers';

export default class BudgetInfo extends GenericElement {
	constructor() {
		super();
		this.budgetNameInput = '//penny-budget-info//input[@id="name"]';
		this.startDateDropdown = '//penny-budget-info//input[@name="budgetStartDate"]';
		this.endDateDropdown = '//penny-budget-info//input[@name="budgetEndDate"]';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async fillBudgetName({ budgetDetails }) {
		const { budgetName } = budgetDetails;

		await this.fill(this.budgetNameInput, budgetName);
	}

	async selectStartDate() {
		const { day, month, year } = await getTodayDate();

		await this.click(this.startDateDropdown);

		await selectDate(day, month, year);
	}

	async selectEndDate() {
		const { nextDay, nextMonth, nextYear } = await getNextYearDate();

		await this.click(this.endDateDropdown);

		await selectDate(nextDay, nextMonth, nextYear);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submit({ budgetDetails }) {
		// TODO: add remark and validate on it
		await this.fillBudgetName({ budgetDetails });
		await this.selectStartDate();
		await this.selectEndDate();
		await this.clickSaveAndContinueButton();
	}
}
