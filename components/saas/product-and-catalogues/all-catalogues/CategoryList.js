import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class CategoryList extends GenericElement {
	constructor() {
		super();
		this.categoryItem = '//div[@data-test-id="catalog-name-text" and text()=" %s "]';
		this.actionsDropdown = '//div[contains(@class, "display-none")]//button[@data-test-id="actions-button"]';
		this.deleteCatalogueButton = '//div[contains(@class, "display-none")]//button[@data-test-id="delete-catalog-button"]';
		this.deleteButton = '//p-confirmdialog//button[@data-test-id="delete-button"]';
	}

	async selectCategory({ productDetails }) {
		const { categoryName } = productDetails;

		await this.click(sprintf(this.categoryItem, categoryName));
	}

	async clickActionsDropdown() {
		await this.click(this.actionsDropdown);
	}

	async clickDeleteCatalogueButton() {
		await this.click(this.deleteCatalogueButton);
	}

	async clickDeleteButton() {
		await this.click(this.deleteButton);
	}

	async deleteCatalogue() {
		await this.clickActionsDropdown();
		await this.clickDeleteCatalogueButton();
		await this.clickDeleteButton();
	}
}
