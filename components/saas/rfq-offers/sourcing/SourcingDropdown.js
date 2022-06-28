import GenericElement from '../../../shared/core/GenericElement';
import SelectVendorsSidebar from './SelectVendorsSidebar';
import { isGaiat } from '../../../../utilities/helpers';

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
		this.selectSourcingOptionDropdown = '//p-dropdown[@data-test-id="select-sourcing-option-dropdown"]';
		this.sourceFromPreferredVendorDropdownItem = '//p-dropdownitem/li[@aria-label="Source From Preferred Vendors"]';
		this.sourceFromVendorsDropdownItem = '//p-dropdownitem/li[@aria-label="Source From Vendor(s)"]';
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

	async selectSourceFromPreferredVendors() {
		await this.click(this.selectSourcingOptionDropdown);
		await this.click(this.sourceFromPreferredVendorDropdownItem);
	}

	async selectFromVendorDropdownItem() {
		await this.click(this.selectSourcingOptionDropdown);
		await this.click(this.sourceFromVendorsDropdownItem);
	}
}
