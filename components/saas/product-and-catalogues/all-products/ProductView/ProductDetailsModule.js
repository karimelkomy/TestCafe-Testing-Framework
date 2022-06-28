import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class ProductDetailsModule extends GenericElement {
	constructor() {
		super();
		this.elementXP = '//div[@data-test-id="product-details-box"]';
		this.productDetailsLink = '//div[./span[text()="PRODUCT DETAILS"]]';
		this.modelText = `${this.elementXP}//div[./div[.="Model:"]]//span[@data-test-id="model-text" and text()="%s"]`;
		this.skuText = `${this.elementXP}//span[@data-test-id="sku-text" and text()="%s"]`;
		this.countryOfOriginText = `${this.elementXP}//span[@data-test-id="country-of-origin-text" and text()="%s"]`;
	}

	async clickProductDetailsLink() {
		await this.click(this.productDetailsLink);
	}

	async validateModel({ model }) {
		await this.validateElementVisibility(sprintf(this.modelText, model));
	}

	async validateSku({ sku }) {
		await this.validateElementVisibility(sprintf(this.skuText, sku));
	}

	async validateCountryOfOrigin({ originCountry }) {
		await this.validateElementVisibility(sprintf(this.countryOfOriginText, originCountry));
	}

	async validateProductDetailsModule({ productDetails }) {
		const { model, sku, originCountry } = productDetails;

		await this.clickProductDetailsLink();
		await this.validateModel({ model });
		await this.validateSku({ sku });
		await this.validateCountryOfOrigin({ originCountry });
	}
}
