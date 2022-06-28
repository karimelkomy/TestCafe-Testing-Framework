import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RfqDraftsTable extends GenericElement {
	constructor() {
		super();
		this.element = '//div[@class="p-card-content"]';
		this.productNameText = `${this.element}//div[@data-test-id="product-name-text" and text()=" %s "]`;
		this.brandNameText = `${this.element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		this.skuText = `${this.element}//td[2]/span[text()="%s"]`;
		this.moqText = `${this.element}//td[3]/span[text()="%s unit"]`;
		this.etaText = `${this.element}//td[4]/span[text()="%s"]`;
		this.qtyInput = `${this.element}//td[5]//input`;
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName));
	}

	async validateBrandName({ brand }) {
		await this.validateElementVisibility(sprintf(this.brandNameText, brand));
	}

	async validateSku({ sku }) {
		await this.validateElementVisibility(sprintf(this.skuText, sku));
	}

	async validateMoq({ moqRfq }) {
		await this.validateElementVisibility(sprintf(this.moqText, moqRfq));
	}

	async validateEta({ ETA, ETAUnit }) {
		await this.validateElementVisibility(sprintf(this.etaText, `${ETA} ${ETAUnit}`));
	}

	async fillQty({ qty }) {
		await this.fill(this.qtyInput, qty.toString());
	}

	async submit({ productInfo, productDetails, productPricing }, rfqDetails) {
		await this.validateProductName(productInfo);
		await this.validateBrandName(productDetails);
		await this.validateSku(productInfo);
		await this.validateMoq(productPricing);
		await this.validateEta(rfqDetails);
		await this.fillQty(rfqDetails);
	}
}
