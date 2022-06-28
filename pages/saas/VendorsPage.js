import ActionsDropdown from '../../components/saas/vendors/ActionsDropdown';
import VendorDetails from '../../components/saas/vendors/create-vendor/VendorDetails';
import VendorsList from '../../components/saas/vendors/VendorsList';
import VendorOverview from '../../components/saas/vendors/VendorOverview';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';
import ContractDetails from '../../components/saas/vendors/create-vendor/contract-details/ContractDetails';
import { isGaiat } from '../../utilities/helpers';

export default class VendorsPage {
	constructor() {
		this.actionsDropdown = new ActionsDropdown();
		this.vendorDetails = new VendorDetails();
		this.contractDetails = new ContractDetails();
		this.vendorsList = new VendorsList();
		this.vendorOverview = new VendorOverview();
		this.modulesSideBar = new ModulesSideBar();
	}

	async validateVendor(vendorDetails) {
		await this.vendorsList.openVendor({ vendorDetails });
		await this.vendorOverview.validateVendorOverview({ vendorDetails });
	}

	async createVendors({ vendorsDetails, organizationDetails, vendorToPlatform }) {
		for (let vendorDetails of vendorsDetails) {
			await this.modulesSideBar.clickVendorLink();
			await this.actionsDropdown.clickCreateVendorButton();
			await this.vendorDetails.submit({ vendorDetails });

			if (isGaiat(organizationDetails)) {
				await this.contractDetails.submit({ vendorDetails, organizationDetails });
				await this.modulesSideBar.clickVendorLink();
				await this.validateVendor(vendorDetails);
			} else {
				await this.vendorOverview.validateVendorOverview({ vendorDetails });

				if (vendorToPlatform) {
					await this.vendorOverview.inviteVendorToPenny();
				}

				await this.vendorOverview.editVendor();
				await this.contractDetails.openContractsTab();
				await this.contractDetails.submit({ vendorDetails, organizationDetails });
			}
		}
	}
}
