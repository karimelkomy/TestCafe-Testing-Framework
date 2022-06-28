import { sprintf } from 'sprintf-js';
import ProductAndServiceTable from '../../../../shared/ProductAndServiceTable';

export default class ProductCart extends ProductAndServiceTable {
	constructor() {
		const element = '//penny-product-list-view[.//div[contains(@class, "product-link") and contains(., "%s")]]';
		const productNameText = `${element}//div[contains(@class, "product-link") and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		super({
			productNameText,
			brandText,
		});
		this.qtyInput = `${element}//input[@placeholder="Quantity"]`;
	}

	async fillQty({ productDetails, requestDetails }) {
		const { qty } = requestDetails;
		const { productName } = productDetails;

		await this.click(sprintf(this.qtyInput, productName));
		await this.fill(sprintf(this.qtyInput, productName), qty.toString());
	}

	async submit({ productsDetails, requestDetails }) {
		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.fillQty({ productDetails, requestDetails });
		}
	}
}
