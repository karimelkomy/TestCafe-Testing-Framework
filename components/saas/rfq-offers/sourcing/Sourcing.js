import GenericElement from '../../../shared/core/GenericElement';
import SendingRfqSidebar from './SendingRfqSidebar';
import SendingOrdersSidebar from './SendingOrdersSidebar';
import SourcingDropdown from '../../requests/product-request/sourcing/SourcingDropdown';

export default class Sourcing extends GenericElement {
	constructor() {
		super();
		this.sendingRfqSidebar = new SendingRfqSidebar();
		this.sendingOrdersSidebar = new SendingOrdersSidebar();
		this.sourcingDropdown = new SourcingDropdown();
		this.selectAllCheckbox = '//p-tableheadercheckbox//div[@role="checkbox"]';
		this.selectVendorsForAllButton = '//div[@data-test-id="source-all-section"]/button[@data-test-id="select-vendors-button"]';
		this.selectSourcingOptionForAllButton = '//button[@data-test-id="actions-button"]';
		this.sourceFromVendorsForAllDropdownItem = '//button[@data-test-id="from-vendors-button" and .="Source From Vendor(s)"]';
		this.sourceFromPreferredVendorsForAllDropdownItem =
			'//button[@data-test-id="from-vendors-button" and .="Source From Preferred Vendors"]';
		this.selectSourcingOptionDropdown = '//p-dropdown[@data-test-id="select-sourcing-option-dropdown"]';
		this.sourceFromPreferredVendorDropdownItem = '//p-dropdownitem/li[@aria-label="Source From Preferred Vendors"]';
		this.sourceFromVendorsDropdownItem = '//p-dropdownitem/li[@aria-label="Source From Vendor(s)"]';
		this.selectVendorsButton = '//div[@data-test-id="source-all-section"]//button[@data-test-id="select-vendors-button"]';
		this.sendRfqButton = '//button[@data-test-id="send-rfqs-button"]';
		this.submitOrderButton = '//button[@data-test-id="submit-orders-button"]';
		this.showRfqButton = '//button[@data-test-id="show-shared-rfq-button"]';
	}

	async clickSelectVendorsButton() {
		await this.click(this.selectVendorsButton);
	}

	async clickSendRfqButton() {
		await this.click(this.sendRfqButton);
	}

	async clickSubmitOrderButton() {
		await this.click(this.submitOrderButton);
	}

	async navigateToClientRfq() {
		await this.click(this.showRfqButton);
	}

	async submitRfqFromVendors({ productRequest }) {
		const {
			requestDetails,
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			paymentTermMode,
			organizationDetails,
		} = productRequest;

		await this.sourcingDropdown.sourceFromVendorsForAll({ vendorsDetails, organizationDetails });
		await this.clickSendRfqButton();
		await this.sendingRfqSidebar.submit({ paymentTermMode, vendorsDetails, productsDetails, eSourceAdminUserDetails, requestDetails });
	}

	async submitRfqFromPreferredVendor({ productRequest }) {
		const { requestDetails, vendorsDetails, productsDetails, eSourceAdminUserDetails, paymentTermMode } = productRequest;

		await this.sourcingDropdown.sourceFromPreferredVendorsForAll();
		await this.clickSendRfqButton();
		await this.sendingRfqSidebar.submit({ paymentTermMode, vendorsDetails, productsDetails, eSourceAdminUserDetails, requestDetails });
	}

	async submitOrderFromVendors({ organizationDetails, vendorsDetails, productDetails, requestDetails, rfqDetails }) {
		await this.sourcingDropdown.sourceFromVendorsForAll({ vendorsDetails, organizationDetails });
		await this.clickSubmitOrderButton();
		await this.sendingOrdersSidebar.submit({ vendorsDetails, requestDetails, rfqDetails, productDetails });
	}
}
