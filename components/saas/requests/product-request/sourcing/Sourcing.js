import GenericElement from '../../../../shared/core/GenericElement';
import SendingRfqSidebar from './SendingRfqSidebar';
import SourcingProductsAndServicesTable from './SourcingProductsAndServicesTable';
import SendingOrdersSidebar from './SendingOrdersSidebar';
import ContractSidebar from './ContractSidebar';
import SourcingDropdown from './SourcingDropdown';

export default class Sourcing extends GenericElement {
	constructor() {
		super();
		this.sendingRfqSidebar = new SendingRfqSidebar();
		this.sendingOrdersSidebar = new SendingOrdersSidebar();
		this.sourcingProductsAndServicesTable = new SourcingProductsAndServicesTable();
		this.contractSidebar = new ContractSidebar();
		this.sourcingDropdown = new SourcingDropdown();
		this.selectVendorsButton = '//div[@data-test-id="source-all-section"]//button[@data-test-id="select-vendors-button"]';
		this.createRfqButton = '//button[@data-test-id="create-rfq-button"]';
		this.createOrderButton = '//button[@data-test-id="create-order-button"]';
		this.submitRequestButton = '//button[@data-test-id="submit-request-button"]';
	}

	async clickSelectVendorsButton() {
		await this.click(this.selectVendorsButton);
	}

	async clickCreateRfqButton() {
		await this.click(this.createRfqButton);
	}

	async clickCreateOrderButton() {
		await this.click(this.createOrderButton);
	}

	async clickSubmitRequestButton() {
		await this.click(this.submitRequestButton);
	}

	async submitRfqUsingContract({ productRequest }) {
		const {
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			organizationDetails,
			requestDetails,
			paymentTermMode,
		} = productRequest;
		const vendorDetails = vendorsDetails[0];

		await this.sourcingProductsAndServicesTable.validate({ productsDetails, requestDetails, organizationDetails, vendorsDetails });
		await this.contractSidebar.validate({ vendorDetails });
		await this.sourcingDropdown.selectUsingContractDropdownItem({ vendorDetails });
		await this.clickCreateRfqButton();
		await this.sendingRfqSidebar.submit({
			paymentTermMode,
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			requestDetails,
		});
	}

	async submitRfqFromVendors({ productRequest }) {
		const {
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			organizationDetails,
			requestDetails,
			paymentTermMode,
		} = productRequest;

		await this.sourcingProductsAndServicesTable.validate({ productsDetails, requestDetails, organizationDetails, vendorsDetails });
		await this.sourcingDropdown.sourceFromVendorsForAll({ vendorsDetails, organizationDetails });
		await this.clickCreateRfqButton();
		await this.sendingRfqSidebar.submit({
			paymentTermMode,
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			requestDetails,
		});
	}

	async submitRfqLater({ productRequest }) {
		const { productsDetails, organizationDetails, requestDetails } = productRequest;

		await this.sourcingProductsAndServicesTable.validate({ productsDetails, requestDetails, organizationDetails });
		await this.sourcingDropdown.sourceLaterForAll();
		await this.clickSubmitRequestButton();
	}

	async submitRfqFromPreferredVendor({ productRequest }) {
		const {
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			organizationDetails,
			requestDetails,
			paymentTermMode,
		} = productRequest;

		await this.sourcingProductsAndServicesTable.validate({ productsDetails, requestDetails, organizationDetails, vendorsDetails });
		await this.sourcingDropdown.sourceFromPreferredVendorsForAll();
		await this.clickCreateRfqButton();
		await this.sendingRfqSidebar.submit({
			paymentTermMode,
			vendorsDetails,
			productsDetails,
			eSourceAdminUserDetails,
			requestDetails,
		});
	}

	async submitOrderFromVendors({ productRequest }) {
		const { vendorsDetails, productsDetails, organizationDetails, requestDetails, rfqDetails } = productRequest;

		await this.sourcingProductsAndServicesTable.validate({ productsDetails, requestDetails, organizationDetails, vendorsDetails });
		await this.sourcingDropdown.sourceFromVendorsForAll({ vendorsDetails, organizationDetails });
		await this.clickCreateOrderButton();
		await this.sendingOrdersSidebar.submit({ vendorsDetails, requestDetails, rfqDetails, productsDetails, organizationDetails });
	}

	async submitOrderUsingContract({ productRequest }) {
		const { vendorsDetails, productsDetails, rfqDetails, organizationDetails, requestDetails } = productRequest;
		const vendorDetails = vendorsDetails[0];

		await this.sourcingProductsAndServicesTable.validate({ productsDetails, requestDetails, organizationDetails, vendorsDetails });
		await this.contractSidebar.validate({ vendorDetails });
		await this.sourcingDropdown.selectUsingContractDropdownItem({ vendorDetails });
		await this.clickCreateOrderButton();
		await this.sendingOrdersSidebar.submit({ vendorsDetails, requestDetails, rfqDetails, productsDetails, organizationDetails });
	}
}
