import { OrganizationDetails } from '../../constants/organizationDetails';
import { WorkspaceDetails, ApprovalWorkspaceDetails, DefaultWorkspaceDetails } from '../../constants/workspaceDetails';
import {
	budgetsAdminRoleDetails,
	workspacesSuperAdminRoleDetails,
	vendorsAdminRoleDetails,
	catalogsAdminRoleDetails,
	eSourceWorkspaceAdminRoleDetails,
	ordersWorkspaceAdminRoleDetails,
	grnWorkspaceAdminRoleDetails,
	billsWorkspaceAdminRoleDetails,
	paymentsWorkspaceAdminRoleDetails,
} from '../../constants/enterpriseRolesDetails';
import {
	SuperAdminUserDetails,
	BasicUserDetails,
	ESourceWorkspaceAdminUserDetails,
	OrdersWorkspaceAdminUserDetails,
	GrnWorkspaceAdminUserDetails,
	BillsWorkspaceAdminUserDetails,
	PaymentsWorkspaceAdminUserDetails,
	VendorsAdminUserDetails,
	BudgetsAdminUserDetails,
	WorkspaceSuperAdminUserDetails,
	CatalogsAdminUserDetails,
} from '../../constants/enterpriseUserDetails';
import InitialBudgetDetails from '../../constants/budgetDetails';
import { VendorsDetails, VendorsDetailsWithContract } from '../../constants/vendorsDetails';
import catalogueDetails from '../../constants/catalogueDetails';
import { manualProductsDetails, bulkProductsDetails, productsDetails, productsDetailsWithContract } from '../../constants/productDetails';
import approvalWorkflow from '../../constants/approvalWorkflow';
import { selectRandomDataFromArray } from '../../../../utilities/helpers';
import OrgTier from '../../constants/orgTier';
import { newOrg } from '../../constants/urls';
import OrgCustomer from '../../constants/orgCustomer';

export default function () {
	const organizationDetails = OrganizationDetails(OrgTier.Enterprise, OrgCustomer.Enterprise);
	const superAdminUserDetails = SuperAdminUserDetails('enterprise');
	const basicUserDetails = BasicUserDetails('enterprise');
	const eSourceWorkspaceAdminUserDetails = ESourceWorkspaceAdminUserDetails('enterprise');
	const ordersWorkspaceAdminUserDetails = OrdersWorkspaceAdminUserDetails('enterprise');
	const grnWorkspaceAdminUserDetails = GrnWorkspaceAdminUserDetails('enterprise');
	const billsWorkspaceAdminUserDetails = BillsWorkspaceAdminUserDetails('enterprise');
	const paymentsWorkspaceAdminUserDetails = PaymentsWorkspaceAdminUserDetails('enterprise');
	const vendorsAdminUserDetails = VendorsAdminUserDetails('enterprise');
	const budgetsAdminUserDetails = BudgetsAdminUserDetails('enterprise');
	const workspaceSuperAdminUserDetails = WorkspaceSuperAdminUserDetails('enterprise');
	const catalogsAdminUserDetails = CatalogsAdminUserDetails('enterprise');
	const defaultEnterpriseWorkspaceDetails = DefaultWorkspaceDetails(organizationDetails);
	const vendorsDetails = VendorsDetails();
	const vendorsDetailsWithContract = VendorsDetailsWithContract(productsDetailsWithContract);
	const preferredVendorDetails = selectRandomDataFromArray(vendorsDetails);
	const workspaceDetails = WorkspaceDetails();
	const approvalWorkspaceDetails = ApprovalWorkspaceDetails();
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
		budgetsAdminUserDetails,
		workspaceSuperAdminUserDetails,
		catalogsAdminUserDetails,
	};

	sharedData.adminUsersDetails = [
		basicUserDetails,
		budgetsAdminUserDetails,
		workspaceSuperAdminUserDetails,
		vendorsAdminUserDetails,
		catalogsAdminUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	];

	sharedData.workspaceUsersDetails = [
		superAdminUserDetails,
		basicUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	];

	sharedData.catalogUsersDetails = [basicUserDetails, eSourceWorkspaceAdminUserDetails, vendorsAdminUserDetails];

	sharedData.rolesDetails = [
		budgetsAdminRoleDetails,
		workspacesSuperAdminRoleDetails,
		vendorsAdminRoleDetails,
		catalogsAdminRoleDetails,
		eSourceWorkspaceAdminRoleDetails,
		ordersWorkspaceAdminRoleDetails,
		grnWorkspaceAdminRoleDetails,
		billsWorkspaceAdminRoleDetails,
		paymentsWorkspaceAdminRoleDetails,
	];

	sharedData.approvalWorkflowsDetails = [
		{ workflowModule: approvalWorkflow.REQUESTS_APPROVER, workflowUsers: [basicUserDetails] },
		{ workflowModule: approvalWorkflow.ESOURCE_APPROVER, workflowUsers: [eSourceWorkspaceAdminUserDetails] },
		{ workflowModule: approvalWorkflow.ORDERS_APPROVER, workflowUsers: [ordersWorkspaceAdminUserDetails] },
		{ workflowModule: approvalWorkflow.BILLS_APPROVER, workflowUsers: [billsWorkspaceAdminUserDetails] },
	];

	sharedData.InitialBudgetDetails = InitialBudgetDetails;

	sharedData.workspaceDetails = workspaceDetails;
	sharedData.defaultEnterpriseWorkspaceDetails = defaultEnterpriseWorkspaceDetails;
	sharedData.approvalWorkspaceDetails = approvalWorkspaceDetails;

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
			'./automated-test/data/saas/dataProvider/enterprise-organization/new-enterprise-organization.js',
			`export default function () {
					const sharedData = ${JSON.stringify(sharedData, null, 2)}

					return sharedData;
			}`,
			(err) => {
				if (err) {
					console.log('Error writing new-enterprise-organization.js', err);
				} else {
					console.log('JSON data is written to new-enterprise-organization.js successfully');
				}
			}
		);
	}

	return sharedData;
}
