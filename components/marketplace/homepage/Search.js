import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class Search extends GenericElement {
	constructor() {
		super();
		this.searchBar = '//penny-marketplace-quick-search';
		this.searchInput = '//div[contains(@class, "main-section")]//p-autocomplete[@data-test-id="search-product-input"]//input';
		this.searchButton = '//div[contains(@class, "main-section")]//div[@data-test-id="search-button"]';
		this.searchTypeDropdown = '//div[contains(@class, "main-section")]//p-dropdown//span[text()="Products"]';
		this.searchTypeDropdownItem = '//p-dropdownitem//span[text()="%s"]';
		this.supplierCart = '//div[./span[text() = "%s"]]';
	}

	async selectSearchType(searchType) {
		await this.click(this.searchTypeDropdown);
		await this.click(sprintf(this.searchTypeDropdownItem, searchType));
	}

	async searchSupplierStore(supplierDetails) {
		await this.selectSearchType('Suppliers');
		await this.fill(this.searchInput, supplierDetails.marketplaceStoreName);
		await this.click(this.searchButton);
	}

	async goToSupplierStore(suppierDetails) {
		await this.searchSupplierStore(suppierDetails);
		await this.click(sprintf(this.supplierCart, suppierDetails.marketplaceStoreName));
	}
}
