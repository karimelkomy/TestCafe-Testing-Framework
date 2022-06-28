import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class ProductSummaryModule extends GenericElement {
	constructor() {
		super();
		this.elementXP = '//div[@data-test-id="product-summary-section"]';
		this.productNameSummaryText = `${this.elementXP}//h1[@data-test-id="product-name-text" and text()=" %s "]`;
		this.skuSummaryText = `${this.elementXP}//span[@data-test-id="sku-text" and text()="%s"]`;
		this.manufacturerSkuSummaryText = `${this.elementXP}//span[@data-test-id="man-sku-text" and text()="%s"]`;
		this.brandSummaryText = `${this.elementXP}//span[@data-test-id="brand-text" and text()="%s"]`;
		this.priceSummaryText = `${this.elementXP}//span[@data-test-id="product-%s-text" and contains(.,"%s")]`;
		this.availabilityText = `${this.elementXP}//h4[@data-test-id="in-stock-text"]`;
	}

	async validateProductNameSummary({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameSummaryText, productName));
	}

	async validateSkuSummary({ sku }) {
		await this.validateElementVisibility(sprintf(this.skuSummaryText, sku));
	}

	async validateManufacturerSkuSummary({ manufacturerSku }) {
		await this.validateElementVisibility(sprintf(this.manufacturerSkuSummaryText, manufacturerSku));
	}

	async validateBrandSummary({ brand }) {
		await this.validateElementVisibility(sprintf(this.brandSummaryText, brand));
	}

	async validatePriceSummary({ basePrice, organizationDetails }) {
		await this.validatePrice(this.priceSummaryText, basePrice, organizationDetails);
	}

	async validateProductAvailability() {
		await this.validateElementVisibility(this.availabilityText);
	}

	async validateProductSummaryModule({ productDetails, organizationDetails }) {
		const { productName, sku, manufacturerSku, brand, basePrice } = productDetails;

		await this.validateProductNameSummary({ productName });
		await this.validateSkuSummary({ sku });
		await this.validateManufacturerSkuSummary({ manufacturerSku });
		await this.validateBrandSummary({ brand });
		await this.validatePriceSummary({ basePrice, organizationDetails });
		await this.validateProductAvailability();
	}
}
