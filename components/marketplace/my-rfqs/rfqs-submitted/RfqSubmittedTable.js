import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber, formatedNumberWithoutComma } from '../../../../utilities/helpers';

export default class RfqSubmittedTable extends GenericElement {
	constructor() {
		super();
		this.element = '//div[@class="p-card-content"]';
		this.productNameText = `${this.element}//div[@data-test-id="product-name-text" and text()=" %s "]`;
		this.brandNameText = `${this.element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		this.skuText = `${this.element}//td[2]/span[text()="%s"]`;
		this.moqText = `${this.element}//td[3]/span[text()="%s unit"]`;
		this.etaText = `${this.element}//td[4]/span[text()="%s"]`;
		this.qtyText = `${this.element}//td[5]//span[text()="%s"]`;
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
		await this.validateElementVisibility(sprintf(this.etaText, `${formatedNumber(ETA, 0)} ${ETAUnit}`));
	}

	async validateQty({ qty }) {
		await this.validateElementVisibility(sprintf(this.qtyText, formatedNumberWithoutComma(qty, 0)));
	}

	async submit({ productInfo, productDetails, productPricing }, rfqDetails) {
		await this.validateProductName(productInfo);
		await this.validateBrandName(productDetails);
		await this.validateSku(productInfo);
		await this.validateMoq(productPricing);
		await this.validateEta(rfqDetails);
		await this.validateQty(rfqDetails);
	}
}
