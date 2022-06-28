import { urls, existingOrg, customTest } from '../../../data/saas/constants/urls';
import { bulkRequestDetails, clientRequestDetails, resellerRequestDetails } from '../../../data/saas/constants/requestDetails';
import { RfqDetails, RfqDetailsWithContract, OrderRfqDetails } from '../../../data/saas/constants/rfqDetails';
import orderDetails from '../../../data/saas/constants/orderDetails';
import { reimbursementDetails } from '../../../data/saas/constants/reimbursementDetails';
import { expenseBillDetails } from '../../../data/saas/constants/expenseBillDetails';
import advanceBillDetails from '../../../data/saas/constants/advanceBillDetails';
import { invoiceDetails } from '../../../data/saas/constants/invoiceDetails';
import { billDetails } from '../../../data/saas/constants/billDetails';
import customData from '../../../data/saas/dataProvider/gaiat-organization/gaiat-organization';
import existingCustomData from '../../../data/saas/dataProvider/gaiat-organization/existing-gaiat-organization';
import ProductRequest from '../../../data/saas/models/ProductRequest';
import ReimbursementRequest from '../../../data/saas/models/ReimbursementRequest';
import Bill from '../../../data/saas/models/Bill';
import RequestModule from '../../../data/saas/constants/RequestModule';
import RequestSourcing from '../../../data/saas/constants/RequestSourcing';
import EsourceSourcing from '../../../data/saas/constants/EsourceSourcing';
import SignInPage from '../../../pages/saas/SignInPage';
import RequestsPage from '../../../pages/saas/RequestsPage';
import RequestPage from '../../../pages/saas/RequestPage';
import BillsPage from '../../../pages/saas/BillsPage';
import PaymentsPage from '../../../pages/saas/PaymentsPage';
import SubmitPaymentPage from '../../../pages/saas/SubmitPaymentPage';
import ReimbursementBillPage from '../../../pages/saas/ReimbursementBillPage';
import ExpenseBillPage from '../../../pages/saas/ExpenseBillPage';
import AdvanceBillPage from '../../../pages/saas/AdvanceBillPage';
import { selectRandomDataFromArray } from '../../../utilities/helpers';

import * as adminSteps from '../../../steps/admin-steps/generic-steps';
import * as buyerSteps from '../../../steps/buyer-steps/generic-steps';
import * as productRequestSteps from '../../../steps/product-request-steps/generic-steps';

const sharedData = existingOrg || customTest ? existingCustomData() : customData();
const buyerUrl = urls.buyerLogin;

fixture`Gaiat Organization - Setup`
	.page(buyerUrl)
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.meta({ newOrg: true });

test('Create a new organization - Successfully', async (t) => {
	const { organizationDetails, usersDetails, defaultResellerWorkspaceDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await adminSteps.createNewOrg({
		superAdminUserDetails,
		organizationDetails,
		defaultWorkspaceDetails: defaultResellerWorkspaceDetails,
	});
});

test('Create admin roles - Successfully', async (t) => {
	const { usersDetails, rolesDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await buyerSteps.createAdminRoles({
		superAdminUserDetails,
		rolesDetails,
	});
});

test('Create admin users - Successfully', async (t) => {
	const { organizationDetails, usersDetails, adminUsersDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await buyerSteps.createAdminUsers({ organizationDetails, superAdminUserDetails, usersDetails: adminUsersDetails });
});

test('Create clients - Successfully', async (t) => {
	const { clientsDetails, usersDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await buyerSteps.createClients({
		superAdminUserDetails,
		clientsDetails,
	});
});

test('Create a workspace - Successfully', async (t) => {
	const { usersDetails, workspaceUsersDetails, workspaceDetails, clientsWorkspacesDetails } = sharedData;
	const { workspaceSuperAdminUserDetails } = usersDetails;

	await buyerSteps.processWorkspaces({
		workspaceSuperAdminUserDetails,
		workspacesDetails: [workspaceDetails],
		editWorkspacesDetails: clientsWorkspacesDetails,
		usersDetails: workspaceUsersDetails,
	});
});

test('Create vendors - Successfully', async (t) => {
	const { organizationDetails, usersDetails, vendorsDetails } = sharedData;
	const { vendorsAdminUserDetails } = usersDetails;

	await buyerSteps.createVendors({ vendorsAdminUserDetails, organizationDetails, vendorsDetails });
});

test('Create catalog, category, and products - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		catalogUsersDetails,
		preferredVendorDetails,
		catalogueDetails,
		productDetailsList,
		clientsDetails,
	} = sharedData;
	const { catalogsAdminUserDetails } = usersDetails;

	await buyerSteps.createProducts({
		catalogsAdminUserDetails,
		organizationDetails,
		usersDetails: catalogUsersDetails,
		clientsDetails,
		catalogueDetails,
		productsDetails: productDetailsList,
		preferredVendorDetails,
	});
});

test('Create vendor with contract - Successfully', async (t) => {
	const { organizationDetails, usersDetails, vendorsDetailsWithContract } = sharedData;
	const { vendorsAdminUserDetails } = usersDetails;

	await buyerSteps.createVendors({
		vendorsAdminUserDetails,
		organizationDetails,
		vendorsDetails: vendorsDetailsWithContract,
	});
});

test('Create markup - Successfully', async (t) => {
	const { markupDetails, usersDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await buyerSteps.createMarkup({ superAdminUserDetails, markupDetails });
});

test('Set default workspace for workspace admin user - Successfully', async (t) => {
	const { defaultResellerWorkspaceDetails, usersDetails } = sharedData;
	const { eSourceWorkspaceAdminUserDetails } = usersDetails;

	await buyerSteps.setDefaultWorkspace({
		userDetails: eSourceWorkspaceAdminUserDetails,
		workspaceDetails: defaultResellerWorkspaceDetails,
	});
});

test('Set client organization details - Successfully', async (t) => {
	const { clientsDetails } = sharedData;

	for (const clientDetails of clientsDetails) {
		await buyerSteps.setOrganizationDetails({
			superAdminUserDetails: clientDetails,
			organizationDetails: clientDetails,
		});
	}
});

test('Create client admin roles - Successfully', async (t) => {
	const { clientsDetails, clientRolesDetails } = sharedData;

	for (const clientDetails of clientsDetails) {
		await buyerSteps.createAdminRoles({
			superAdminUserDetails: clientDetails,
			rolesDetails: clientRolesDetails,
		});
	}
});

test('Create client admin users - Successfully', async (t) => {
	const { clientsDetails } = sharedData;

	for (const clientDetails of clientsDetails) {
		const adminUsersDetailsArray = Object.values(clientDetails.adminUsersDetails);

		await buyerSteps.createAdminUsers({
			organizationDetails: clientDetails,
			superAdminUserDetails: clientDetails,
			usersDetails: adminUsersDetailsArray,
		});
	}
});

test('Add admin users to client workspace - Successfully', async (t) => {
	const { clientsDetails, clientWorkspaceDetails } = sharedData;

	for (const clientDetails of clientsDetails) {
		const adminUsersDetailsArray = Object.values(clientDetails.adminUsersDetails);
		const clientsWorkspacesDetails = [clientWorkspaceDetails(clientDetails)];

		await buyerSteps.processWorkspaces({
			workspaceSuperAdminUserDetails: clientDetails,
			editWorkspacesDetails: clientsWorkspacesDetails,
			usersDetails: adminUsersDetailsArray,
		});
	}
});

test('Set approval users to client workspace - Successfully', async (t) => {
	const { approvalClientDetails, clientWorkspaceDetails } = sharedData;
	const adminUsersDetailsArray = Object.values(approvalClientDetails.adminUsersDetails);
	const clientsWorkspacesDetails = [clientWorkspaceDetails(approvalClientDetails)];

	await buyerSteps.processWorkspaces({
		workspaceSuperAdminUserDetails: approvalClientDetails,
		approvalWorkspacesDetails: clientsWorkspacesDetails,
		usersDetails: adminUsersDetailsArray,
		approvalWorkflowsDetails: approvalClientDetails.approvalWorkflowsDetails,
	});
});

fixture`Gaiat Organization - Product Request`
	.page(buyerUrl)
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.meta({ existingOrg: true });

test('Create a product request using a client basic user - With approval workflow - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		catalogueDetails,
		preferredVendorDetails,
		productsDetails,
		approvalClientDetails,
		markupDetails,
		clientWorkspaceDetails,
	} = sharedData;
	const {
		superAdminUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
		automationUserDetails,
	} = usersDetails;
	const clientDetails = approvalClientDetails;
	const clientWorkspace = clientWorkspaceDetails(clientDetails);
	const { adminUsersDetails } = clientDetails;
	const {
		clientBasicUserDetails,
		clientESourceWorkspaceAdminUserDetails,
		clientOrdersWorkspaceAdminUserDetails,
		clientGrnWorkspaceAdminUserDetails,
		clientBillsWorkspaceAdminUserDetails,
		clientPaymentsWorkspaceAdminUserDetails,
	} = adminUsersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails: clientWorkspace,
		vendorsDetails: [preferredVendorDetails],
		vendorDetails: preferredVendorDetails,
		productsDetails,
		catalogueDetails,
		superAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		clientESourceAdminUserDetails: clientESourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		clientOrdersAdminUserDetails: clientOrdersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		clientGrnAdminUserDetails: clientGrnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		clientBillsAdminUserDetails: clientBillsWorkspaceAdminUserDetails,
		requesterUserDetails: automationUserDetails,
		clientRequesterUserDetails: clientBasicUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		clientPaymentRequesterUserDetails: clientPaymentsWorkspaceAdminUserDetails,
		requestDetails: clientRequestDetails,
		rfqDetails,
		orderDetails,
		markupDetails,
		billDetails,
		invoiceDetails,
		clientDetails,
		requestSourcing: RequestSourcing.WITHOUT_SOURCING,
		approvalWorkflow: true,
	});

	await productRequestSteps.processClientRequest({ productRequest });
}).meta({
	customTest: 'gaiat-organization-product-request_create-product-request-using-client-basic-user_with-approval-workflow-successfully',
});

test('Create a manual product request using a client E-source admin user with partial GRN/GDN - Send for revision - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		manualProductsDetails,
		clientDetails,
		markupDetails,
		revisedMarkupDetails,
		clientWorkspaceDetails,
		vendorsDetails,
	} = sharedData;
	const {
		superAdminUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
		automationUserDetails,
	} = usersDetails;
	const vendorDetails = selectRandomDataFromArray(vendorsDetails);
	const clientWorkspace = clientWorkspaceDetails(clientDetails);
	const rfqDetails = RfqDetails();
	const { adminUsersDetails } = clientDetails;
	const {
		clientESourceWorkspaceAdminUserDetails,
		clientGrnWorkspaceAdminUserDetails,
		clientBillsWorkspaceAdminUserDetails,
		clientPaymentsWorkspaceAdminUserDetails,
	} = adminUsersDetails;
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails: clientWorkspace,
		vendorsDetails: [vendorDetails],
		vendorDetails,
		productsDetails: manualProductsDetails,
		superAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		requesterUserDetails: automationUserDetails,
		clientRequesterUserDetails: clientESourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		clientESourceAdminUserDetails: clientESourceWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		clientGrnAdminUserDetails: clientGrnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		clientBillsAdminUserDetails: clientBillsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		clientPaymentRequesterUserDetails: clientPaymentsWorkspaceAdminUserDetails,
		revisedMarkupDetails,
		requestDetails: clientRequestDetails,
		rfqDetails,
		orderDetails,
		billDetails,
		markupDetails,
		invoiceDetails,
		clientDetails,
		partialGrn: true,
		requestSourcing: RequestSourcing.MANUAL_WITHOUT_SOURCING,
		sendForRevisionByClient: true,
	});

	await productRequestSteps.processClientRequest({ productRequest });
}).meta({
	customTest:
		'gaiat-organization-product-request_create-manual-product-request-using-client-esource-admin-user-with-partial-grn-gdn_send-for-revision-successfully',
});

test('Create a product request using basic user and source from preferred vendor in E-source with partial GRN - Successfully', async (t) => {
	const { organizationDetails, usersDetails, workspaceDetails, preferredVendorDetails, catalogueDetails, productsDetails } = sharedData;
	const {
		basicUserDetails,
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails,
		vendorsDetails: [preferredVendorDetails],
		vendorDetails: preferredVendorDetails,
		catalogueDetails,
		productsDetails,
		partialGrn: true,
		requesterUserDetails: basicUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		eSourceSourcing: EsourceSourcing.SOURCE_FROM_PREFERRED_VENDOR,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'gaiat-organization-product-request_create-product-request-using-basic-user-and-source-from-preferred-vendor-in-esource-with-partial-grn-successfully',
});

test('Create a product request using default workspace, with RFQ sourcing from vendors - Send for revision - Successfully', async (t) => {
	const {
		organizationDetails,
		defaultResellerWorkspaceDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
		usersDetails,
	} = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails: defaultResellerWorkspaceDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.SOURCE_FROM_VENDORS,
		sendForRevision: true,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'gaiat-organization-product-request_create-product-request-using-default-workspace-with-rfq-sourcing-from-vendors_send-for-revision-successfully',
});

test('Create a product request from e-source, with RFQ sourcing from preferred vendor - Negotiation offer - Successfully', async (t) => {
	const { organizationDetails, usersDetails, workspaceDetails, preferredVendorDetails, catalogueDetails, productsDetails } = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails,
		vendorsDetails: [preferredVendorDetails],
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.E_SOURCE,
		requestSourcing: RequestSourcing.SOURCE_FROM_PREFERRED_VENDOR,
		sendForNegotiation: true,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'gaiat-organization-product-request_create-product-request-from-esource-with-rfq-sourcing-from-preferred-vendor_negotiation-offer-successfully',
});

test('Create a product request from action-board and source from E-source, with RFQ sourcing from vendors - Update offer offline - Successfully', async (t) => {
	const { organizationDetails, usersDetails, workspaceDetails, vendorsDetails, catalogueDetails, productsDetails } = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.ACTION_BOARD,
		requestSourcing: RequestSourcing.SOURCE_LATER,
		eSourceSourcing: EsourceSourcing.SOURCE_FROM_VENDORS,
		updateOfferOffline: true,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'gaiat-organization-product-request_create-product-request-from-action-board-and-source-from-esource-with-rfq-sourcing-from-vendors_update-offer-offline-successfully',
});

test('Create a manual product request, with RFQ sourcing from vendors - Successfully', async (t) => {
	const { organizationDetails, usersDetails, workspaceDetails, vendorsDetails, manualProductsDetails } = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails,
		vendorsDetails,
		productsDetails: manualProductsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.MANUAL_WITH_SOURCE_FROM_VENDORS,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'gaiat-organization-product-request_create-manual-product-request-with-rfq-sourcing-from-vendors-successfully',
});

test('Create a bulk product request, with RFQ sourcing - Successfully', async (t) => {
	const { organizationDetails, usersDetails, defaultResellerWorkspaceDetails, vendorsDetails, bulkProductsDetails } = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails: defaultResellerWorkspaceDetails,
		vendorsDetails,
		productsDetails: bulkProductsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: bulkRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.BULK_ACTION_BOARD,
		requestSourcing: RequestSourcing.BULK_WITH_SOURCE_FROM_VENDORS,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'gaiat-organization-product-request_create-bulk-product-request-with-rfq-sourcing-successfully',
});

test('Create a product request and source RFQ from vendor with contract - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		defaultResellerWorkspaceDetails,
		vendorsDetailsWithContract,
		catalogueDetails,
		productsDetailsWithContract,
	} = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails: defaultResellerWorkspaceDetails,
		vendorsDetails: vendorsDetailsWithContract,
		catalogueDetails,
		productsDetails: productsDetailsWithContract,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.SOURCE_FROM_CONTRACT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'gaiat-organization-product-request_create-product-request-and-source-rfq-from-vendor-with-contract-successfully',
});

test('Create a product request, with order sourcing - Successfully', async (t) => {
	const { organizationDetails, usersDetails, workspaceDetails, vendorsDetails, catalogueDetails, productsDetails } = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const vendorDetails = selectRandomDataFromArray(vendorsDetails);
	const rfqDetails = OrderRfqDetails();
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails,
		vendorsDetails: [vendorDetails],
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.ORDER_WITH_SOURCE_FROM_VENDORS,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'gaiat-organization-product-request_create-product-request-with-order-sourcing-successfully',
});

test('Create a product request and order sourcing with contract - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		workspaceDetails,
		vendorsDetailsWithContract,
		catalogueDetails,
		productsDetailsWithContract,
	} = sharedData;
	const {
		eSourceWorkspaceAdminUserDetails,
		ordersWorkspaceAdminUserDetails,
		grnWorkspaceAdminUserDetails,
		billsWorkspaceAdminUserDetails,
		paymentsWorkspaceAdminUserDetails,
	} = usersDetails;
	const rfqDetails = RfqDetailsWithContract(productsDetailsWithContract);
	const productRequest = new ProductRequest({
		organizationDetails,
		workspaceDetails,
		vendorsDetails: vendorsDetailsWithContract,
		catalogueDetails,
		productsDetails: productsDetailsWithContract,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails: resellerRequestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.ORDER_WITH_SOURCE_FROM_CONTRACT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'gaiat-organization-product-request_create-product-request-and-order-sourcing-with-contract-successfully',
});

fixture`Gaiat Organization - Reimbursement Request`
	.page(buyerUrl)
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.meta({ existingOrg: true });

test
	.skip('Create reimbursement request - Successfully', async (t) => {
		const signInPage = new SignInPage();
		const requestsPage = new RequestsPage();
		const requestPage = new RequestPage();
		const billsPage = new BillsPage();
		const reimbursementBillPage = new ReimbursementBillPage();
		const paymentsPage = new PaymentsPage();
		const submitPaymentPage = new SubmitPaymentPage();
		const { organizationDetails, workspaceDetails, usersDetails } = sharedData;
		const { basicUserDetails, billsWorkspaceAdminUserDetails, paymentsWorkspaceAdminUserDetails } = usersDetails;
		const reimbursementRequest = new ReimbursementRequest({
			organizationDetails,
			workspaceDetails,
			requesterUserDetails: basicUserDetails,
			reimbursementDetails,
		});

		await signInPage.signIn({ user: basicUserDetails, logged: false });

		await requestsPage.createReimbursementRequest();

		await requestPage.createReimbursementRequest({ reimbursementRequest });

		await signInPage.signIn({ user: billsWorkspaceAdminUserDetails });

		await billsPage.openFirstPendingBill({ reimbursementRequest });

		await reimbursementBillPage.submitReimbursementBillWithoutBudget({ reimbursementRequest });

		await signInPage.signIn({ user: paymentsWorkspaceAdminUserDetails });

		await paymentsPage.openPayment({ request: reimbursementRequest });

		await submitPaymentPage.submitExpensePayment({ bill: reimbursementRequest });
	})
	.meta({
		customTest: 'gaiat-organization-reimbursement-request_create-reimbursement-request-successfully',
	});

fixture`Gaiat Organization - Bills`
	.page(buyerUrl)
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.meta({ existingOrg: true });

test('Create advance bill - Successfully', async (t) => {
	const signInPage = new SignInPage();
	const advanceBillPage = new AdvanceBillPage();
	const paymentsPage = new PaymentsPage();
	const submitPaymentPage = new SubmitPaymentPage();
	const billsPage = new BillsPage();
	const { organizationDetails, usersDetails, vendorsDetails } = sharedData;
	const { superAdminUserDetails, billsWorkspaceAdminUserDetails } = usersDetails;
	const vendorDetails = selectRandomDataFromArray(vendorsDetails);
	const bill = new Bill({
		organizationDetails,
		vendorDetails,
		workspaceDetails: null,
		rfqDetails: null,
		requestDetails: resellerRequestDetails,
		billDetails: advanceBillDetails,
	});

	await signInPage.signIn({ user: billsWorkspaceAdminUserDetails, logged: false });

	await billsPage.createAdvanceBill();

	await advanceBillPage.createBill({ bill });
	await advanceBillPage.submitBill({ bill });

	await signInPage.signIn({ user: superAdminUserDetails }); // TODO: update to use payment admin once issue fixed

	await paymentsPage.openPayment({ request: bill });

	await submitPaymentPage.submitPayment({ bill });
}).meta({
	customTest: 'gaiat-organization-bills_create-advance-bill-successfully',
});

test('Create expense bill - Successfully', async (t) => {
	const signInPage = new SignInPage();
	const billsPage = new BillsPage();
	const expenseBillPage = new ExpenseBillPage();
	const paymentsPage = new PaymentsPage();
	const submitPaymentPage = new SubmitPaymentPage();
	const { organizationDetails, workspaceDetails, vendorsDetails, usersDetails } = sharedData;
	const { billsWorkspaceAdminUserDetails, paymentsWorkspaceAdminUserDetails } = usersDetails;
	const vendorDetails = selectRandomDataFromArray(vendorsDetails);
	const bill = new Bill({
		organizationDetails,
		vendorDetails,
		workspaceDetails,
		billDetails: expenseBillDetails,
	});

	await signInPage.signIn({ user: billsWorkspaceAdminUserDetails, logged: false });

	await billsPage.createExpenseBill();

	await expenseBillPage.createAndSubmitBillWithoutBudget({ bill });

	await signInPage.signIn({ user: paymentsWorkspaceAdminUserDetails });

	await paymentsPage.openPayment({ request: bill });

	await submitPaymentPage.submitExpensePayment({ bill });
}).meta({
	customTest: 'gaiat-organization-bills_create-expense-bill-successfully',
});

fixture`Gaiat Organization - Cleanup`
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.page(buyerUrl);

test('Delete catalog, category, and product - Successfully', async (t) => {
	const { catalogueDetails, productsDetails, usersDetails } = sharedData;
	const { catalogsAdminUserDetails } = usersDetails;

	await buyerSteps.deleteProducts({ catalogsAdminUserDetails, catalogueDetails, productsDetails });
});
