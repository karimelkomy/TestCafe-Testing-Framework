import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class ProductsList extends GenericElement {
	constructor() {
		super();
		this.actionsDropdown =
			'//p-card[.//span[@data-test-id="product-name-text" and text()=" %s "]]//button[@data-test-id="actions-dropdown"]';
		this.deleteProductButton = '//div[@data-test-id="actions-list"]//button[@data-test-id="delete-product-button"]';
		this.deleteButton = '//p-confirmdialog//button[@data-test-id="delete-button"]';
	}

	async clickActionsDropdown({ productName }) {
		await this.click(sprintf(this.actionsDropdown, productName));
	}

	async clickDeleteProductButton() {
		await this.click(this.deleteProductButton);
	}

	async clickDeleteButton() {
		await this.click(this.deleteButton);
	}

	async deleteProduct({ productDetails }) {
		const { productName } = productDetails;

		await this.clickActionsDropdown({ productName });
		await this.clickDeleteProductButton();
		await this.clickDeleteButton();
	}
}
