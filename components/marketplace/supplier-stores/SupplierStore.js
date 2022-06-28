import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class SupplierStore extends GenericElement {
	constructor() {
		super();
		this.storeNameText = '(//marketplace-supplier-store-header//h1[contains(text(), "%s")])[1]';
		this.supplierDetailsText = '(//marketplace-supplier-store-header//h5[contains(., "%s")])[1]';
		this.productCardButton = '//penny-market-product-card[.//span[@data-test-id="product-name-text" and text()=" %s "]]';
		this.storeSearchInput = '//input[@data-test-id="search-products-categories-input"]';
		this.storeSearchButton = '//span/i[contains(@class, "pi-search")]';
	}

	async validateStoreName({ marketplaceStoreName }) {
		await this.validateElementVisibility(sprintf(this.storeNameText, marketplaceStoreName));
	}

	async validateOrganizationName({ organizationName }) {
		await this.validateElementVisibility(sprintf(this.supplierDetailsText, organizationName));
	}

	async validateAddress({ addressDetails }) {
		await this.validateElementVisibility(sprintf(this.supplierDetailsText, addressDetails.city));
	}

	async validateCompanyRegistrationNumber({ companyRegistrationNumber }) {
		await this.validateElementVisibility(sprintf(this.supplierDetailsText, companyRegistrationNumber));
	}

	async validateVatRegistrationNumber({ vatRegistrationNumber }) {
		await this.validateElementVisibility(sprintf(this.supplierDetailsText, vatRegistrationNumber));
	}

	async validateClassification({ classification }) {
		await this.validateElementVisibility(sprintf(this.supplierDetailsText, classification));
	}

	async validateSupplierDetails(supplierDetails) {
		await this.validateStoreName(supplierDetails);
		await this.validateOrganizationName(supplierDetails);
		await this.validateAddress(supplierDetails);
		await this.validateCompanyRegistrationNumber(supplierDetails);
		await this.validateVatRegistrationNumber(supplierDetails);
		await this.validateClassification(supplierDetails);
	}

	async openProductCard({ productInfo }) {
		await this.click(sprintf(this.productCardButton, productInfo.productName));
	}

	async searchProduct({ productInfo }) {
		await this.fill(this.storeSearchInput, productInfo.productName);
		await this.pressEnter();
	}
}
