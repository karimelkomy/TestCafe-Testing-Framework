import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import CatalogsSidebar from './CatalogsSidebar';
import CategoriesSidebar from './CategoriesSidebar';
import VendorsSidebar from './VendorsSidebar';

export default class ProductInfo extends GenericElement {
	constructor() {
		super();
		this.catalogsSidebar = new CatalogsSidebar();
		this.categoriesSidebar = new CategoriesSidebar();
		this.vendorsSidebar = new VendorsSidebar();
		this.productNameEnglishInput = '//input[@data-test-id="product-name-input-english"]';
		this.productNameArabicInput = '//input[@data-test-id="product-name-input-arabic"]';
		this.skuInput = '//input[@data-test-id="sku-input"]';
		this.manufacturerSkuInput = '//input[@data-test-id="manufacturer-sku-input"]';
		this.addCategoryButton = '//button[@data-test-id="add-category-button"]';
		this.addCatalogsButton = '//button[@data-test-id="add-catalogs-button"]';
		this.categoryChip = '//p-chips[@data-test-id="added-category"]//li[contains(text(), "%s")]';
		this.catalogChip = '//div[@data-test-id="catalogs-card"]//p-chips//li[contains(text(), "%s")]';
		this.vendorChip = '//div[@data-test-id="vendors-card"]//p-chips//li[contains(text(), "%s")]';
		this.addVendorsButton = '//button[@data-test-id="add-vendors-button"]';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async fillProductName({ productName }) {
		await this.fill(this.productNameEnglishInput, productName);
		// await this.fill(this.productNameArabicInput, productName); // Arabic field appear only for Saudi Arabia
	}

	async validateCatalogChip({ catalogueDetails }) {
		const { catalogueName } = catalogueDetails;

		await this.validateElementVisibility(sprintf(this.catalogChip, catalogueName));
	}

	async validateCategoryChip({ categoryName }) {
		await this.validateElementVisibility(sprintf(this.categoryChip, categoryName));
	}

	async validateVendorChip({ vendorName }) {
		await this.validateElementVisibility(sprintf(this.vendorChip, vendorName));
	}

	async fillSku({ sku }) {
		await this.fill(this.skuInput, sku);
	}

	async fillManufacturerSku({ manufacturerSku }) {
		await this.fill(this.manufacturerSkuInput, manufacturerSku);
	}

	async fillProductInfo({ productDetails }) {
		const { productName, sku, manufacturerSku } = productDetails;

		await this.fillProductName({ productName });
		await this.fillSku({ sku });
		await this.fillManufacturerSku({ manufacturerSku });
	}

	async clickAddCategoryButton() {
		await this.click(this.addCategoryButton);
	}

	async clickAddCatalogsButton() {
		await this.click(this.addCatalogsButton);
	}

	async clickAddVendorsButton() {
		await this.click(this.addVendorsButton);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async createCategory({ productDetails }) {
		const { categoryName } = productDetails;

		await this.clickAddCategoryButton();
		await this.categoriesSidebar.create({ categoryName });
		await this.validateCategoryChip({ categoryName });
	}

	async deleteCategory({ categoryName }) {
		await this.clickAddCategoryButton();
		await this.categoriesSidebar.delete({ categoryName });
	}

	async selectCatalog({ catalogueDetails }) {
		await this.clickAddCatalogsButton();
		await this.catalogsSidebar.select({ catalogueDetails });
		await this.validateCatalogChip({ catalogueDetails });
	}

	async selectVendor({ preferredVendorDetails }) {
		const { vendorName } = preferredVendorDetails;

		await this.clickAddVendorsButton();
		await this.vendorsSidebar.select({ vendorName });
		await this.validateVendorChip({ vendorName });
	}

	async submit({ productDetails, catalogueDetails, preferredVendorDetails }) {
		await this.fillProductInfo({ productDetails });
		await this.createCategory({ productDetails });
		await this.selectCatalog({ catalogueDetails });
		await this.selectVendor({ preferredVendorDetails });
		await this.clickSaveAndContinueButton();
	}
}
