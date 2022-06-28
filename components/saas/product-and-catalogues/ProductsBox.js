import GenericElement from '../../shared/core/GenericElement';

export default class ProductsBox extends GenericElement {
	constructor() {
		super();
		this.createProductButton = '//button[@data-test-id="create-product-service-button"]';
		this.showAllProductsButton = '//button[@data-test-id="show-all-products-button"]';
	}

	async clickCreateProductButton() {
		await this.click(this.createProductButton);
	}

	async clickShowAllProductsButton() {
		await this.click(this.showAllProductsButton);
	}
}
