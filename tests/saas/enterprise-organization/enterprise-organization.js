import { urls, existingOrg, customTest } from '../../../data/saas/constants/urls';
import { requestDetails, bulkRequestDetails } from '../../../data/saas/constants/requestDetails';
import { RfqDetails, RfqDetailsWithContract, OrderRfqDetails } from '../../../data/saas/constants/rfqDetails';
import orderDetails from '../../../data/saas/constants/orderDetails';
import { reimbursementDetails } from '../../../data/saas/constants/reimbursementDetails';
import { expenseBillDetails } from '../../../data/saas/constants/expenseBillDetails';
import advanceBillDetails from '../../../data/saas/constants/advanceBillDetails';
import { billDetails } from '../../../data/saas/constants/billDetails';
import customData from '../../../data/saas/dataProvider/enterprise-organization/enterprise-organization';
import existingCustomData from '../../../data/saas/dataProvider/enterprise-organization/existing-enterprise-organization';
import ProductRequest from '../../../data/saas/models/ProductRequest';
import ReimbursementRequest from '../../../data/saas/models/ReimbursementRequest';
import Bill from '../../../data/saas/models/Bill';
import RequestModule from '../../../data/saas/constants/RequestModule';
import RequestSourcing from '../../../data/saas/constants/RequestSourcing';
import EsourceSourcing from '../../../data/saas/constants/EsourceSourcing';
import PaymentTermMode from '../../../data/saas/constants/PaymentTermMode';
import SignInPage from '../../../pages/saas/SignInPage';
import RequestsPage from '../../../pages/saas/RequestsPage';
import RequestPage from '../../../pages/saas/RequestPage';
import BillsPage from '../../../pages/saas/BillsPage';
import PaymentsPage from '../../../pages/saas/PaymentsPage';
import SubmitPaymentPage from '../../../pages/saas/SubmitPaymentPage';
import BudgetPage from '../../../pages/saas/BudgetPage';
import ReimbursementBillPage from '../../../pages/saas/ReimbursementBillPage';
import ExpenseBillPage from '../../../pages/saas/ExpenseBillPage';
import AdvanceBillPage from '../../../pages/saas/AdvanceBillPage';
import { selectRandomDataFromArray } from '../../../utilities/helpers';

import * as adminSteps from '../../../steps/admin-steps/generic-steps';
import * as buyerSteps from '../../../steps/buyer-steps/generic-steps';
import * as productRequestSteps from '../../../steps/product-request-steps/generic-steps';

const sharedData = existingOrg || customTest ? existingCustomData() : customData();
const buyerUrl = urls.buyerLogin;

fixture`Enterprise Organization - Setup`
	.page(buyerUrl)
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.meta({ newOrg: true });

test('Create a new organization - Successfully', async (t) => {
	const { organizationDetails, usersDetails, defaultEnterpriseWorkspaceDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await adminSteps.createNewOrg({
		superAdminUserDetails,
		organizationDetails,
		defaultWorkspaceDetails: defaultEnterpriseWorkspaceDetails,
	});
});

test('Create admin users - Successfully', async (t) => {
	const { organizationDetails, usersDetails, adminUsersDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await buyerSteps.createAdminUsers({
		organizationDetails,
		superAdminUserDetails,
		usersDetails: adminUsersDetails,
	});
});

test('Create a budget - Successfully', async (t) => {
	const { organizationDetails, usersDetails, InitialBudgetDetails } = sharedData;
	const { budgetsAdminUserDetails } = usersDetails;

	await buyerSteps.createBudget({
		budgetsAdminUserDetails,
		organizationDetails,
		budgetDetails: InitialBudgetDetails,
	});
});

test('Create a workspace - Successfully', async (t) => {
	const { usersDetails, workspaceUsersDetails, workspaceDetails, approvalWorkspaceDetails, approvalWorkflowsDetails } = sharedData;
	const { superAdminUserDetails } = usersDetails;

	await buyerSteps.processWorkspaces({
		workspaceSuperAdminUserDetails: superAdminUserDetails, // TODO: user workspaceAdminUser to add users to workspaces
		workspacesDetails: [workspaceDetails, approvalWorkspaceDetails],
		approvalWorkspacesDetails: [approvalWorkspaceDetails],
		usersDetails: workspaceUsersDetails,
		approvalWorkflowsDetails,
	});
});

test('Create vendors - Successfully', async (t) => {
	const { organizationDetails, usersDetails, vendorsDetails } = sharedData;
	const { vendorsAdminUserDetails } = usersDetails;

	await buyerSteps.createVendors({
		vendorsAdminUserDetails,
		organizationDetails,
		vendorsDetails,
	});
});

test('Create catalog, category, and products - Successfully', async (t) => {
	const { usersDetails, catalogUsersDetails, preferredVendorDetails, catalogueDetails, productDetailsList } = sharedData;
	const { catalogsAdminUserDetails } = usersDetails;

	const { organizationDetails } = sharedData;

	await buyerSteps.createProducts({
		catalogsAdminUserDetails,
		organizationDetails,
		usersDetails: catalogUsersDetails,
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

test('Set default workspace for workspace admin user - Successfully', async (t) => {
	const { defaultEnterpriseWorkspaceDetails, usersDetails } = sharedData;
	const { eSourceWorkspaceAdminUserDetails } = usersDetails;

	await buyerSteps.setDefaultWorkspace({
		userDetails: eSourceWorkspaceAdminUserDetails,
		workspaceDetails: defaultEnterpriseWorkspaceDetails,
	});
});

fixture`Enterprise Organization - Product Request`
	.page(buyerUrl)
	.beforeEach(async (t) => {
		await t.maximizeWindow();
		await t.setNativeDialogHandler(() => true);
	})
	.meta({ existingOrg: true });

test('Create a product request using basic user and source from preferred vendor in E-source with partial GRN - using organization location - Successfully', async (t) => {
	const {
		organizationDetails,
		InitialBudgetDetails,
		workspaceDetails,
		preferredVendorDetails,
		catalogueDetails,
		productsDetails,
		usersDetails,
	} = sharedData;
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
		organizationLocation: organizationDetails.organizationLocation,
		workspaceDetails,
		budgetDetails: InitialBudgetDetails,
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
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		eSourceSourcing: EsourceSourcing.SOURCE_FROM_PREFERRED_VENDOR,
		paymentTermMode: PaymentTermMode.LIST,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'enterprise-organization-product-request_create-product-request-using-basic-user-and-source-from-preferred-vendor-in-esource-with-partial-grn_using-organization-location-successfully',
});

test('Create a product request using default workspace, with RFQ sourcing from vendors - Send for revision - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		defaultEnterpriseWorkspaceDetails,
		InitialBudgetDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
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
		workspaceDetails: defaultEnterpriseWorkspaceDetails,
		budgetDetails: InitialBudgetDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.SOURCE_FROM_VENDORS,
		sendForRevision: true,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'enterprise-organization-product-request_create-product-request-using-default-workspace-with-rfq-sourcing-from-vendors_send-for-revision-successfully',
});

test('Create a product request from e-source, with RFQ sourcing from preferred vendor - Negotiation offer - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		InitialBudgetDetails,
		workspaceDetails,
		preferredVendorDetails,
		catalogueDetails,
		productsDetails,
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
		workspaceDetails,
		budgetDetails: InitialBudgetDetails,
		vendorsDetails: [preferredVendorDetails],
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.E_SOURCE,
		requestSourcing: RequestSourcing.SOURCE_FROM_PREFERRED_VENDOR,
		sendForNegotiation: true,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'enterprise-organization-product-request_create-product-request-from-esource-with-rfq-sourcing-from-preferred-vendor_negotiation-offer-successfully',
});

test('Create a product request from action-board and source from E-source, with RFQ sourcing from vendors - Update offer offline - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		InitialBudgetDetails,
		workspaceDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
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
		workspaceDetails,
		budgetDetails: InitialBudgetDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.ACTION_BOARD,
		requestSourcing: RequestSourcing.SOURCE_LATER,
		eSourceSourcing: EsourceSourcing.SOURCE_FROM_VENDORS,
		updateOfferOffline: true,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest:
		'enterprise-organization-product-request_create-product-request-from-action-board-and-source-from-esource-with-rfq-sourcing-from-vendors_update-offer-offline-successfully',
});

test('Create a manual product request, with RFQ sourcing from vendors - Successfully', async (t) => {
	const { organizationDetails, usersDetails, InitialBudgetDetails, workspaceDetails, vendorsDetails, manualProductsDetails } = sharedData;
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
		budgetDetails: InitialBudgetDetails,
		vendorsDetails,
		productsDetails: manualProductsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.MANUAL_WITH_SOURCE_FROM_VENDORS,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'enterprise-organization-product-request_create-manual-product-request-with-rfq-sourcing-from-vendors-successfully',
});

test('Create a bulk product request, with RFQ sourcing from vendors - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		defaultEnterpriseWorkspaceDetails,
		InitialBudgetDetails,
		vendorsDetails,
		bulkProductsDetails,
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
		workspaceDetails: defaultEnterpriseWorkspaceDetails,
		budgetDetails: InitialBudgetDetails,
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
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'enterprise-organization-product-request_create-bulk-product-request-with-rfq-sourcing-from-vendors-successfully',
});

test('Create a product request and source RFQ from vendor with contract - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		defaultEnterpriseWorkspaceDetails,
		InitialBudgetDetails,
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
		workspaceDetails: defaultEnterpriseWorkspaceDetails,
		budgetDetails: InitialBudgetDetails,
		vendorsDetails: vendorsDetailsWithContract,
		catalogueDetails,
		productsDetails: productsDetailsWithContract,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.SOURCE_FROM_CONTRACT,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'enterprise-organization-product-request_create-product-request-and-sourcce-rfq-from-vendor-with-contract-successfully',
});

test('Create a product request, with order sourcing - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		InitialBudgetDetails,
		workspaceDetails,
		vendorsDetails,
		catalogueDetails,
		productsDetails,
	} = sharedData;
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
		budgetDetails: InitialBudgetDetails,
		vendorsDetails: [vendorDetails],
		catalogueDetails,
		productsDetails,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.ORDER_WITH_SOURCE_FROM_VENDORS,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'enterprise-organization-product-request_create-product-request-with-order-sourcing-successfully',
});

test('Create a product request and order sourcing with contract - Successfully', async (t) => {
	const {
		organizationDetails,
		usersDetails,
		defaultEnterpriseWorkspaceDetails,
		InitialBudgetDetails,
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
		workspaceDetails: defaultEnterpriseWorkspaceDetails,
		budgetDetails: InitialBudgetDetails,
		vendorsDetails: vendorsDetailsWithContract,
		catalogueDetails,
		productsDetails: productsDetailsWithContract,
		requesterUserDetails: eSourceWorkspaceAdminUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		requestModule: RequestModule.REQUEST,
		requestSourcing: RequestSourcing.ORDER_WITH_SOURCE_FROM_CONTRACT,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'enterprise-organization-product-request_create-product-request-and-order-sourcing-with-contract-successfully',
});

test('Create a product request - With approval workflow - Successfully', async (t) => {
	const {
		organizationDetails,
		InitialBudgetDetails,
		approvalWorkspaceDetails,
		preferredVendorDetails,
		catalogueDetails,
		productsDetails,
		usersDetails,
	} = sharedData;
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
		workspaceDetails: approvalWorkspaceDetails,
		budgetDetails: InitialBudgetDetails,
		vendorsDetails: [preferredVendorDetails],
		catalogueDetails,
		productsDetails,
		requesterUserDetails: basicUserDetails,
		eSourceAdminUserDetails: eSourceWorkspaceAdminUserDetails,
		ordersAdminUserDetails: ordersWorkspaceAdminUserDetails,
		grnAdminUserDetails: grnWorkspaceAdminUserDetails,
		billsAdminUserDetails: billsWorkspaceAdminUserDetails,
		paymentsAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		billDetails,
		requestModule: RequestModule.REQUEST,
		eSourceSourcing: EsourceSourcing.SOURCE_FROM_PREFERRED_VENDOR,
		approvalWorkflow: true,
		paymentTermMode: PaymentTermMode.TEXT,
	});

	await productRequestSteps.process({ productRequest });
}).meta({
	customTest: 'enterprise-organization-product-request_create-product-request-with-approval-workflow-successfully',
});

fixture`Enterprise Organization - Reimbursement Request`
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
		const budgetPage = new BudgetPage();
		const { organizationDetails, InitialBudgetDetails, workspaceDetails, usersDetails } = sharedData;
		const { basicUserDetails, billsWorkspaceAdminUserDetails, paymentsWorkspaceAdminUserDetails } = usersDetails;
		const reimbursementRequest = new ReimbursementRequest({
			organizationDetails,
			workspaceDetails,
			budgetDetails: InitialBudgetDetails,
			requesterUserDetails: basicUserDetails,
			reimbursementDetails,
		});

		await signInPage.signIn({ user: basicUserDetails, logged: false });

		await requestsPage.createReimbursementRequest();

		await requestPage.createReimbursementRequest({ reimbursementRequest });

		await signInPage.signIn({ user: billsWorkspaceAdminUserDetails });

		await budgetPage.getBudgetDetails({ budget: reimbursementRequest });

		await billsPage.openFirstPendingBill({ reimbursementRequest });

		await reimbursementBillPage.submitReimbursementBillWithBudget({ reimbursementRequest });

		await signInPage.signIn({ user: paymentsWorkspaceAdminUserDetails });

		await paymentsPage.openPayment({ request: reimbursementRequest });

		await submitPaymentPage.submitExpensePayment({ bill: reimbursementRequest });
	})
	.meta({
		customTest: 'enterprise-organization-reimbursement-request_create-reimbursement-request-successfully',
	});

fixture`Enterprise Organization - Bills`
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
		requestDetails,
		billDetails: advanceBillDetails,
	});

	await signInPage.signIn({ user: billsWorkspaceAdminUserDetails, logged: false });

	await billsPage.createAdvanceBill();

	await advanceBillPage.createBill({ bill });
	await advanceBillPage.submitBill({ bill });

	await signInPage.signIn({ user: superAdminUserDetails }); // BUG: update to use payment admin once issue fixed

	await paymentsPage.openPayment({ request: bill });

	await submitPaymentPage.submitPayment({ bill });
}).meta({
	customTest: 'enterprise-organization-bills_create-advance-bill-successfully',
});

test('Create expense bill - Successfully', async (t) => {
	const signInPage = new SignInPage();
	const budgetPage = new BudgetPage();
	const billsPage = new BillsPage();
	const expenseBillPage = new ExpenseBillPage();
	const paymentsPage = new PaymentsPage();
	const submitPaymentPage = new SubmitPaymentPage();
	const { organizationDetails, InitialBudgetDetails, workspaceDetails, vendorsDetails, usersDetails } = sharedData;
	const { billsWorkspaceAdminUserDetails, paymentsWorkspaceAdminUserDetails } = usersDetails;
	const vendorDetails = selectRandomDataFromArray(vendorsDetails);
	const bill = new Bill({
		organizationDetails,
		vendorDetails,
		budgetDetails: InitialBudgetDetails,
		workspaceDetails,
		billDetails: expenseBillDetails,
	});

	await signInPage.signIn({ user: billsWorkspaceAdminUserDetails, logged: false });

	await budgetPage.getBudgetDetails({ budget: bill });

	await billsPage.createExpenseBill();

	await expenseBillPage.createAndSubmitBillWithBudget({ bill });

	await signInPage.signIn({ user: paymentsWorkspaceAdminUserDetails });

	await paymentsPage.openPayment({ request: bill });

	await submitPaymentPage.submitExpensePayment({ bill });
}).meta({
	customTest: 'enterprise-organization-bills_create-expense-bill-successfully',
});

fixture`Enterprise Organization - Cleanup`.page(buyerUrl).beforeEach(async (t) => {
	await t.maximizeWindow();
	await t.setNativeDialogHandler(() => true);
});

test('Delete catalog, category, and product - Successfully', async (t) => {
	const { catalogueDetails, productsDetails, usersDetails } = sharedData;
	const { catalogsAdminUserDetails } = usersDetails;

	await buyerSteps.deleteProducts({
		catalogsAdminUserDetails,
		catalogueDetails,
		productsDetails,
	});
});
