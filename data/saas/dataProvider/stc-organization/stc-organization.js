import { OrganizationDetails } from '../../constants/organizationDetails';
import { WorkspaceDetails, ClientWorkspaceDetails, DefaultWorkspaceDetails } from '../../constants/workspaceDetails';
import {
	workspacesSuperAdminRoleDetails,
	vendorsAdminRoleDetails,
	catalogsAdminRoleDetails,
	eSourceWorkspaceAdminRoleDetails,
	pendingOffersWorkspaceAdminRoleDetails,
	ordersWorkspaceAdminRoleDetails,
	grnWorkspaceAdminRoleDetails,
	billsWorkspaceAdminRoleDetails,
	paymentsWorkspaceAdminRoleDetails,
} from '../../constants/stcRolesDetails';
import {
	SuperAdminUserDetails,
	BasicUserDetails,
	ESourceWorkspaceAdminUserDetails,
	OrdersWorkspaceAdminUserDetails,
	GrnWorkspaceAdminUserDetails,
	BillsWorkspaceAdminUserDetails,
	PaymentsWorkspaceAdminUserDetails,
	VendorsAdminUserDetails,
	WorkspaceSuperAdminUserDetails,
	CatalogsAdminUserDetails,
	AutomationUserDetails,
} from '../../constants/stcUserDetails';
import { VendorsDetails, VendorsDetailsWithContract } from '../../constants/vendorsDetails';
import catalogueDetails from '../../constants/catalogueDetails';
import { manualProductsDetails, bulkProductsDetails, productsDetails, productsDetailsWithContract } from '../../constants/productDetails';
import { ClientDetails, ApprovalClientDetails } from '../../constants/stcClientDetails';
import { markupDetails, revisedMarkupDetails } from '../../constants/markupDetails';
import { selectRandomDataFromArray } from '../../../../utilities/helpers';
import OrgTier from '../../constants/orgTier';
import { newOrg } from '../../constants/urls';
import OrgCustomer from '../../constants/orgCustomer';

export default function () {
	const organizationDetails = OrganizationDetails(OrgTier.Reseller, OrgCustomer.STC);
	const superAdminUserDetails = SuperAdminUserDetails('stc');
	const basicUserDetails = BasicUserDetails('stc');
	const eSourceWorkspaceAdminUserDetails = ESourceWorkspaceAdminUserDetails('stc');
	const ordersWorkspaceAdminUserDetails = OrdersWorkspaceAdminUserDetails('stc');
	const grnWorkspaceAdminUserDetails = GrnWorkspaceAdminUserDetails('stc');
	const billsWorkspaceAdminUserDetails = BillsWorkspaceAdminUserDetails('stc');
	const paymentsWorkspaceAdminUserDetails = PaymentsWorkspaceAdminUserDetails('stc');
	const vendorsAdminUserDetails = VendorsAdminUserDetails('stc');
	const workspaceSuperAdminUserDetails = WorkspaceSuperAdminUserDetails('stc');
	const catalogsAdminUserDetails = CatalogsAdminUserDetails('stc');
	const automationUserDetails = AutomationUserDetails();
	const defaultResellerWorkspaceDetails = DefaultWorkspaceDetails(organizationDetails);
	const vendorsDetails = VendorsDetails();
	const vendorsDetailsWithContract = VendorsDetailsWithContract(productsDetailsWithContract);
	const preferredVendorDetails = selectRandomDataFromArray(vendorsDetails);
	const workspaceDetails = WorkspaceDetails();
	const clientDetails = ClientDetails();
	const approvalClientDetails = ApprovalClientDetails();
	const clientsDetails = [clientDetails, approvalClientDetails];
	const fs = require('fs');

	const sharedData = {};

	sharedData.organizationDetails = organizationDetails;

	sharedData.usersDetails = {
		superAdminUserDetails,
		basicUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
		vendorsAdminUserDetails,
		workspaceSuperAdminUserDetails,
		catalogsAdminUserDetails,
		automationUserDetails,
	};

	sharedData.adminUsersDetails = [
		basicUserDetails,
		workspaceSuperAdminUserDetails,
		vendorsAdminUserDetails,
		catalogsAdminUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	];

	sharedData.catalogUsersDetails = [basicUserDetails, eSourceWorkspaceAdminUserDetails, vendorsAdminUserDetails];

	sharedData.workspaceUsersDetails = [
		paymentsWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		eSourceWorkspaceAdminUserDetails,
		basicUserDetails,
		superAdminUserDetails,
	];

	sharedData.rolesDetails = [
		workspacesSuperAdminRoleDetails,
		vendorsAdminRoleDetails,
		catalogsAdminRoleDetails,
		eSourceWorkspaceAdminRoleDetails,
		ordersWorkspaceAdminRoleDetails,
		grnWorkspaceAdminRoleDetails,
		billsWorkspaceAdminRoleDetails,
		paymentsWorkspaceAdminRoleDetails,
	];

	sharedData.approvalClientDetails = approvalClientDetails;
	sharedData.clientDetails = clientDetails;
	sharedData.clientsDetails = clientsDetails;

	sharedData.clientRolesDetails = [
		pendingOffersWorkspaceAdminRoleDetails,
		ordersWorkspaceAdminRoleDetails,
		grnWorkspaceAdminRoleDetails,
		billsWorkspaceAdminRoleDetails,
		paymentsWorkspaceAdminRoleDetails,
	];

	sharedData.markupDetails = markupDetails;
	sharedData.revisedMarkupDetails = revisedMarkupDetails;

	sharedData.workspaceDetails = workspaceDetails;
	sharedData.defaultResellerWorkspaceDetails = defaultResellerWorkspaceDetails;
	sharedData.clientsWorkspacesDetails = clientsDetails.map((clientDetails) => ClientWorkspaceDetails(clientDetails));
	sharedData.clientWorkspaceDetails = ClientWorkspaceDetails;

	sharedData.vendorsDetails = vendorsDetails;
	sharedData.preferredVendorDetails = preferredVendorDetails;
	sharedData.vendorsDetailsWithContract = vendorsDetailsWithContract;

	sharedData.catalogueDetails = catalogueDetails;

	sharedData.manualProductsDetails = manualProductsDetails;
	sharedData.bulkProductsDetails = bulkProductsDetails;
	sharedData.productsDetails = productsDetails;
	sharedData.productsDetailsWithContract = productsDetailsWithContract;
	sharedData.productDetailsList = [...productsDetails, ...productsDetailsWithContract];

	if (newOrg) {
		fs.writeFile(
			'./automated-test/data/saas/dataProvider/stc-organization/new-stc-organization.js',
			`import { ClientWorkspaceDetails } from '../../../saas/constants/workspaceDetails';
			
			export default function () {
						const sharedData = ${JSON.stringify(sharedData, null, 2)}

						sharedData.clientWorkspaceDetails = ClientWorkspaceDetails;
					
						return sharedData;
			}`,
			(err) => {
				if (err) {
					console.log('Error writing new-stc-organization.js', err);
				} else {
					console.log('JSON data is written to new-stc-organization.js successfully');
				}
			}
		);
	}

	return sharedData;
}
