import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import SelectVendorsSidebar from './SelectVendorsSidebar';
import { isGaiat } from '../../../../../utilities/helpers';

export default class SourcingDropdown extends GenericElement {
	constructor() {
		super();
		this.selectVendorSidebar = new SelectVendorsSidebar();
		this.selectAllCheckbox = '//p-tableheadercheckbox//div[@role="checkbox"]';
		this.selectVendorsForAllButton = '//div[@data-test-id="source-all-section"]/button[@data-test-id="select-vendors-button"]';
		this.selectSourcingOptionForAllButton = '//button[@data-test-id="actions-button"]';
		this.sourceFromVendorsForAllDropdownItem = '//button[@data-test-id="from-vendors-button" and .="Source From Vendor(s)"]';
		this.sourceFromPreferredVendorsForAllDropdownItem =
			'//button[@data-test-id="from-vendors-button" and .="Source From Preferred Vendors"]';
		this.sourceLaterForAllDropdownItem = '//button[@data-test-id="from-vendors-button" and .="Source Later"]';
		this.selectSourcingOptionDropdown = '//p-dropdown[@data-test-id="select-sourcing-option-dropdown"]';
		this.selectSourcingOptionPerProductDropdown = `//tr[@data-test-id="product-row"][.//penny-product-view[@data-test-id="product-name-text"]//div[contains(text(), "%s")]]${this.selectSourcingOptionDropdown}`;
		this.sourceFromPreferredVendorDropdownItem = '//p-dropdownitem/li[@aria-label="Source From Preferred Vendors"]';
		this.fromVendorsDropdownItem = '//p-dropdownitem/li[@aria-label="Source From Vendor(s)"]';
		this.laterDropdownItem = '//p-dropdownitem/li[@aria-label="Source Later"]';
		this.usingContractDropdownItem = '//p-dropdownitem/li[contains(@aria-label, "Source Using Contract")]';
	}

	async selectAllProducts() {
		await this.click(this.selectAllCheckbox);
	}

	async clickSelectVendorsForAllButton() {
		await this.click(this.selectVendorsForAllButton);
	}

	async selectFromVendorForAllDropdownItem() {
		await this.click(this.selectSourcingOptionForAllButton);
		await this.click(this.sourceFromVendorsForAllDropdownItem);
	}

	async selectFromPreferredVendorsForAllDropdownItem() {
		await this.click(this.selectSourcingOptionForAllButton);
		await this.click(this.sourceFromPreferredVendorsForAllDropdownItem);
	}

	async selectSourceLaterForAllDropdownItem() {
		await this.click(this.selectSourcingOptionForAllButton);
		await this.click(this.sourceLaterForAllDropdownItem);
	}

	async selectFromPreferredVendorsForAllDropdownItem() {
		await this.click(this.selectSourcingOptionForAllButton);
		await this.click(this.sourceFromPreferredVendorsForAllDropdownItem);
	}

	async sourceFromVendorsForAll({ vendorsDetails, organizationDetails }) {
		await this.selectAllProducts();
		await this.selectFromVendorForAllDropdownItem();

		if (isGaiat(organizationDetails)) {
			await this.selectAllProducts();
		}

		await this.clickSelectVendorsForAllButton();
		await this.selectVendorSidebar.submit({ vendorsDetails });
	}

	async sourceFromPreferredVendorsForAll() {
		await this.selectAllProducts();
		await this.selectFromPreferredVendorsForAllDropdownItem();
	}

	async sourceLaterForAll() {
		await this.selectAllProducts();
		await this.selectSourceLaterForAllDropdownItem();
	}

	async selectSourceFromPreferredVendors() {
		await this.click(this.selectSourcingOptionDropdown);
		await this.click(this.sourceFromPreferredVendorDropdownItem);
	}

	async selectUsingContractDropdownItem({ vendorDetails }) {
		const { contractDetails } = vendorDetails;
		const { productsDetails } = contractDetails;

		for (const productDetails of productsDetails) {
			const { productName } = productDetails;

			await this.click(sprintf(this.selectSourcingOptionPerProductDropdown, productName));
			await this.click(this.usingContractDropdownItem);
		}
	}

	async selectFromVendorDropdownItem() {
		await this.click(this.selectSourcingOptionDropdown);
		await this.click(this.fromVendorsDropdownItem);
	}

	async selectLaterDropdownItem() {
		await this.click(this.selectSourcingOptionDropdown);
		await this.click(this.laterDropdownItem);
	}
}
