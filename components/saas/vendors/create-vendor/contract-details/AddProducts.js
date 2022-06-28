import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../../utilities/helpers';

export default class AddProducts extends GenericElement {
	constructor() {
		super();
		this.productCatalogItem = '//p-card[@data-test-id="catalog-card"][.//div[@data-test-id="catalog-name-text" and text()=" %s "]]/div';
		this.productItem =
			'//div[@class="p-card-body"][.//span[text()=" %s "]]//div[contains(@class,"ng-star-inserted")]//button[@data-test-id="add-button"]';
		this.breadCrumbCataloguesLink = '//p-breadcrumb//a[./span[text()="Catalogues"]]';
		this.breadCrumbCataloguesLinkAlt = '//penny-breadcrumb//div[./span[text()=" Catalogues "]]';
		this.productNameText = '//penny-product-card//div[contains(@class, "p-card-content")]//span[contains(., "%s")]';
		this.productPriceText =
			'//penny-product-card[.//div[contains(@class, "p-card-content")]//span[contains(., "%s")]]//*[@data-test-id="%s-text" and contains(., "%s")]';
		this.doneButton = '//penny-products-contract-sidebar//button[@data-test-id="done-button"]';
	}

	async selectProduct({ catalogueDetails, productName, categoryName }) {
		const { catalogueName } = catalogueDetails;

		await this.click(sprintf(this.productCatalogItem, catalogueName));
		await this.click(sprintf(this.productCatalogItem, categoryName));
		await this.click(sprintf(this.productItem, productName));
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName));
	}

	async validateProductPrice({ productName, basePrice, organizationDetails }) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.productPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.productPriceText, productName, 'price', formatedNumber(basePrice)));
	}

	async clickDoneButton() {
		await this.click(this.doneButton);
	}

	async submit({ productDetails, catalogueDetails, organizationDetails }) {
		const { productName, categoryName, basePrice } = productDetails;

		await this.selectProduct({ catalogueDetails, productName, categoryName });
		await this.validateProductName({ productName });
		await this.validateProductPrice({ productName, basePrice, organizationDetails });
		await this.clickDoneButton();
	}
}
