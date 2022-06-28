import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import ManualProductRequest from './ManualProductRequest';
import ProductCart from './ProductCart';
import { isGaiat } from '../../../../../utilities/helpers';

export default class AddProductsAndServices extends GenericElement {
	constructor() {
		super();
		this.manualProductRequest = new ManualProductRequest();
		this.productCart = new ProductCart();
		this.productCatalogItem = '//p-card[@data-test-id="catalog-card"][.//div[@data-test-id="catalog-name-text" and text()=" %s "]]/div';
		this.productItem = '//div[@class="p-card-body"][.//span[text()=" %s "]]//div[contains(@class,"ng-star-inserted")]//button';
		this.breadCrumbCataloguesLink = '//p-breadcrumb//a[./span[text()="Catalogues"]]';
		this.breadCrumbCataloguesLinkAlt = '//penny-breadcrumb//div[./span[text()=" Catalogues "]]';
		this.saveAndContinueButton = '//penny-req-items-sidebar//button[@data-test-id="save-and-continue-button"]';
	}

	async selectProduct({ organizationDetails, catalogueDetails, productsDetails }) {
		const { catalogueName } = catalogueDetails;

		for (const productDetails of productsDetails) {
			const { productName, categoryName } = productDetails;

			await this.click(sprintf(this.productCatalogItem, catalogueName));
			await this.click(sprintf(this.productCatalogItem, categoryName));
			await this.click(sprintf(this.productItem, productName));

			if (isGaiat(organizationDetails)) {
				await this.click(this.breadCrumbCataloguesLink);
			} else {
				await this.click(this.breadCrumbCataloguesLinkAlt);
			}
		}
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submitCatalogProductRequest({ productRequest }) {
		const { catalogueDetails, productsDetails, requestDetails, organizationDetails } = productRequest;

		await this.selectProduct({ organizationDetails, catalogueDetails, productsDetails });
		await this.productCart.submit({ productsDetails, requestDetails });
		await this.clickSaveAndContinueButton();
	}

	async submitManualProductRequest({ productRequest }) {
		const { productsDetails, requestDetails } = productRequest;

		await this.manualProductRequest.submit({ productsDetails, requestDetails });
		await this.productCart.submit({ productsDetails, requestDetails });
		await this.clickSaveAndContinueButton();
	}
}
