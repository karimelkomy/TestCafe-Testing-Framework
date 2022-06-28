import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class ProductView extends GenericElement {
	constructor() {
		super();
		this.productNameText = '//h1[text()="%s"]';
		this.brandNameText = '//span[@data-test-id="brand-text" and text()="%s"]';
		this.categoryNameText = '//span[@data-test-id="category-text" and text()="%s"]';
		this.skuText = '//span[@data-test-id="product-sku-text" and text()="%s"]';
		this.priceText = '//span[@data-test-id="product-max-price-%s-text" and .="%s"]';
		this.moqRfqText = '//div[@data-test-id="moq-rfq-text" and text()=" %s "]';
		this.moqOrderText = '//div[@data-test-id="moq-order-text" and text()=" %s "]';
		this.descriptionText = '//div[@data-test-id="description-text product-description" and contains(text(),"%s")]';
		this.modelText = '//div[@data-test-id="model-text" and text()=" %s "]'; // not all products have model field
		this.actionButton = '//p-splitbutton[@data-test-id="actions-button"]//button[contains(@icon, "pi")]';
		this.addToRfqButtonFromAction = '//a[./span[text()="ADD TO RFQ"]]';
		this.addToRfqButton = '//button[@data-test-id="add-to-rfq-button"]';
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName));
	}

	async validateBrandName({ brand }) {
		await this.validateElementVisibility(sprintf(this.brandNameText, brand));
	}

	async validateCategoryName({ categoryName }) {
		await this.validateElementVisibility(sprintf(this.categoryNameText, categoryName));
	}

	async validateSku({ sku }) {
		await this.validateElementVisibility(sprintf(this.skuText, sku));
	}

	async validatePrice({ basePrice }, organizationDetails) {
		await this.validatePrice(this.priceText, basePrice, organizationDetails);
	}

	async validateMoqRfq({ moqRfq }) {
		await this.validateElementVisibility(sprintf(this.moqRfqText, moqRfq));
	}

	async validateMoqOrder({ moqOrder }) {
		await this.validateElementVisibility(sprintf(this.moqOrderText, moqOrder));
	}

	async validateDescription({ description }) {
		await this.validateElementVisibility(sprintf(this.descriptionText, description));
	}

	async validateModel({ model }) {
		await this.validateElementVisibility(sprintf(this.modelText, model));
	}

	async validateProductDetails({ productInfo, productDetails, productPricing }, marketplaceBuyerDetails) {
		await this.validateProductName(productInfo);
		await this.validateSku(productInfo);
		await this.validateCategoryName(productInfo);
		await this.validateBrandName(productDetails);
		await this.validateDescription(productDetails);
		await this.validatePrice(productPricing, marketplaceBuyerDetails);
		await this.validateMoqRfq(productPricing);
		await this.validateMoqOrder(productPricing);
	}

	async clickActionButton() {
		await this.click(this.actionButton);
	}

	async addToRfq() {
		// for now we are testing on a store with add to rfq only
		await this.click(this.addToRfqButton);

		// TODO: enable when we are testing with action button
		/* await this.click(this.actionButton);
		await this.click(this.addToRfqButtonFromAction); */
	}
}
