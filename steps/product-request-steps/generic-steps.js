import SignInPage from '../../pages/saas/SignInPage';
import RequestsPage from '../../pages/saas/RequestsPage';
import RequestPage from '../../pages/saas/RequestPage';
import ActionBoardPage from '../../pages/saas/ActionBoardPage';
import BuyerRfqPage from '../../pages/saas/BuyerRfqPage';
import VendorRfqPage from '../../pages/saas/VendorRfqPage';
import BuyerOrdersPage from '../../pages/saas/BuyerOrdersPage';
import ApprovedOfferPage from '../../pages/saas/ApprovedOfferPage';
import OrdersPage from '../../pages/saas/OrdersPage';
import VendorOrderPage from '../../pages/saas/VendorOrderPage';
import GrnsPage from '../../pages/saas/GrnsPage';
import GrnPage from '../../pages/saas/GrnPage';
import BillsPage from '../../pages/saas/BillsPage';
import OrderBillPage from '../../pages/saas/OrderBillPage';
import PaymentsPage from '../../pages/saas/PaymentsPage';
import SubmitPaymentPage from '../../pages/saas/SubmitPaymentPage';
import BudgetPage from '../../pages/saas/BudgetPage';
import RfqsPage from '../../pages/saas/RfqsPage';
import RequestModule from '../../data/saas/constants/RequestModule';
import RequestSourcing from '../../data/saas/constants/RequestSourcing';
import { RevisedRfqDetails, RfqDetailsWithFixedPaymentTerm, OfferOfflineRfqDetails } from '../../data/saas/constants/rfqDetails';
import PaymentTermMode from '../../data/saas/constants/PaymentTermMode';
import ApprovedOffersPage from '../../pages/saas/ApprovedOffersPage';
import GdnPage from '../../pages/saas/GdnPage';
import GdnsPage from '../../pages/saas/GdnsPage';
import InvoicesPage from '../../pages/saas/InvoicesPage';
import InvoicePage from '../../pages/saas/InvoicePage';
import EInvoicePage from '../../pages/saas/EInvoicePage';
import ReceivedPaymentsPage from '../../pages/saas/ReceivedPaymentsPage';
import { isGaiat } from '../../utilities/helpers';

import * as vendorSteps from '../vendor-steps/generic-steps';

export const process = async ({ productRequest }) => {
	const signInPage = new SignInPage();
	const requestsPage = new RequestsPage();
	const requestPage = new RequestPage();
	const buyerRfqPage = new BuyerRfqPage();
	const vendorRfqPage = new VendorRfqPage();
	const approvedOfferPage = new ApprovedOfferPage();
	const buyerOrdersPage = new BuyerOrdersPage();
	const approvedOffersPage = new ApprovedOffersPage();
	const ordersPage = new OrdersPage();
	const vendorOrderPage = new VendorOrderPage();
	const budgetPage = new BudgetPage();
	const rfqsPage = new RfqsPage();
	const actionBoardPage = new ActionBoardPage();
	const {
		budgetDetails,
		vendorsDetails,
		requesterUserDetails,
		eSourceAdminUserDetails,
		ordersAdminUserDetails,
		requestSourcing,
		requestModule,
		sendForRevision,
		sendForNegotiation,
		updateOfferOffline,
		approvalWorkflow,
		productsDetails,
		partialGrn,
		paymentTermMode,
		organizationDetails,
	} = productRequest;
	const directPOArray = [RequestSourcing.ORDER_WITH_SOURCE_FROM_VENDORS, RequestSourcing.ORDER_WITH_SOURCE_FROM_CONTRACT];
	const rfqRequest = !directPOArray.includes(requestSourcing);
	const revisedRfqDetails = RevisedRfqDetails();
	const rfqDetailsWithFixedPaymentTerm = RfqDetailsWithFixedPaymentTerm();
	const offerOfflineRfqDetails = OfferOfflineRfqDetails();

	await signInPage.signIn({ user: requesterUserDetails, logged: false });

	if (requestModule === RequestModule.REQUEST) {
		await requestsPage.createProductRequest();
	} else if (requestModule === RequestModule.E_SOURCE) {
		await rfqsPage.createNewRequest();
	} else if (requestModule === RequestModule.ACTION_BOARD) {
		await actionBoardPage.createNewRequest();
	} else if (requestModule === RequestModule.BULK_ACTION_BOARD) {
		await actionBoardPage.createBulkRequest();
	}

	await requestPage.createProductRequest({ productRequest });

	if (approvalWorkflow) {
		await requestsPage.openRequestById({ productRequest });

		await requestPage.approveProductRequest({ productRequest });
	}

	if (eSourceAdminUserDetails !== requesterUserDetails) {
		await signInPage.signIn({ user: eSourceAdminUserDetails });
	}

	if (budgetDetails) {
		await budgetPage.getBudgetDetails({ budget: productRequest });
	}

	if (rfqRequest) {
		await rfqsPage.openFirstRfq();
	}

	await buyerRfqPage.submitRfq({ productRequest });

	if (rfqRequest) {
		await buyerRfqPage.showOfferSummary({ productRequest });
	}

	if (rfqRequest) {
		for (const vendorDetails of vendorsDetails) {
			productRequest.updateVendorDetails(vendorDetails);
			productRequest.updateRfqDetails(vendorDetails.rfqDetails);

			if (paymentTermMode === PaymentTermMode.LIST) {
				productRequest.updateRfqDetails(rfqDetailsWithFixedPaymentTerm);
			}

			await buyerRfqPage.validateRfq({ productRequest });

			if (updateOfferOffline) {
				productRequest.updateRfqDetails(offerOfflineRfqDetails);

				await buyerRfqPage.updateOfferOffline({ productRequest });
			} else {
				await vendorRfqPage.submitRfq({ productRequest });
				// await vendorSteps.submitRfq({ productRequest, vendorToPlatform: true });
			}

			if (sendForRevision) {
				await buyerRfqPage.sendForRevisionAll({ productRequest });

				productRequest.updateRfqDetails(revisedRfqDetails);

				await vendorRfqPage.submitRfq({ productRequest });
				// await vendorSteps.submitRfq({ productRequest, vendorToPlatform: true });
			}

			if (sendForNegotiation) {
				await buyerRfqPage.validateOffer({ productRequest });

				productRequest.updateRfqDetails(revisedRfqDetails);

				await buyerRfqPage.sendForNegotiation({ productRequest });

				await vendorRfqPage.acceptNegotiatedOffer({ productRequest });
			}

			await buyerRfqPage.validateOffer({ productRequest });
		}
	} else {
		productRequest.updateVendorDetails(vendorsDetails[0]);
	}

	if (approvalWorkflow) {
		await buyerRfqPage.sendOfferForApproval({ productRequest });

		await rfqsPage.openFirstRfq();

		await buyerRfqPage.showOfferSummary({ productRequest });

		await buyerRfqPage.approveOffer({ productRequest, approverUserDetails: eSourceAdminUserDetails });
	} else if (rfqRequest) {
		await buyerRfqPage.acceptOffer({ productRequest });
	}

	await signInPage.signIn({ user: ordersAdminUserDetails });

	if (!isGaiat(organizationDetails)) {
		await approvedOffersPage.openFirstApprovedOffer({ productRequest });

		await approvedOfferPage.submit({ productRequest });
	}

	await ordersPage.openFirstOrder({ productRequest });

	await buyerOrdersPage.submitOrder({
		productRequest,
		approveOrder: approvalWorkflow,
		approverUserDetails: ordersAdminUserDetails,
	});

	if (budgetDetails) {
		await budgetPage.validateBudgetDetails({ budget: productRequest });
	}

	await vendorOrderPage.acceptOrder({ productRequest });

	await buyerOrdersPage.validateOrderStatus({ productRequest });

	if (partialGrn) {
		for (const productDetails of productsDetails) {
			productRequest.setProductDetails([productDetails]);
			productRequest.updateRfqDetails({ ...productRequest.rfqDetails, productShippingFee: productRequest.rfqDetails.shippingFee / 2 });

			await submitGrnToPayment({ productRequest });
		}
	} else {
		await submitGrnToPayment({ productRequest });
	}
};

export const submitGrnToPayment = async ({ productRequest }) => {
	const signInPage = new SignInPage();
	const grnsPage = new GrnsPage();
	const grnPage = new GrnPage();
	const billsPage = new BillsPage();
	const orderBillPage = new OrderBillPage();
	const paymentsPage = new PaymentsPage();
	const submitPaymentPage = new SubmitPaymentPage();
	const { grnAdminUserDetails, billsAdminUserDetails, paymentsAdminUserDetails, approvalWorkflow } = productRequest;

	await signInPage.signIn({ user: grnAdminUserDetails });

	await grnsPage.openFirstGrn({ productRequest });

	await grnPage.submitGrn({ productRequest });

	await signInPage.signIn({ user: billsAdminUserDetails });

	await billsPage.openFirstSubmittedGrns({ productRequest });

	await orderBillPage.submitOrderBill({ productRequest, approveBill: approvalWorkflow, approverUserDetails: billsAdminUserDetails });

	await signInPage.signIn({ user: paymentsAdminUserDetails });

	await paymentsPage.openPayment({ request: productRequest });

	await submitPaymentPage.submitPayment({ productRequest });

	await signInPage.signIn({ user: billsAdminUserDetails });

	await orderBillPage.validatePaidBillBox({ productRequest });
};

export const processClientRequest = async ({ productRequest }) => {
	const signInPage = new SignInPage();
	const requestsPage = new RequestsPage();
	const requestPage = new RequestPage();
	const buyerRfqPage = new BuyerRfqPage();
	const vendorRfqPage = new VendorRfqPage();
	const buyerOrdersPage = new BuyerOrdersPage();
	const approvedOffersPage = new ApprovedOffersPage();
	const approvedOfferPage = new ApprovedOfferPage();
	const ordersPage = new OrdersPage();
	const vendorOrderPage = new VendorOrderPage();
	const rfqsPage = new RfqsPage();
	const actionBoardPage = new ActionBoardPage();
	const {
		clientRequesterUserDetails,
		eSourceAdminUserDetails,
		clientESourceAdminUserDetails,
		ordersAdminUserDetails,
		clientOrdersAdminUserDetails,
		requestSourcing,
		revisedMarkupDetails,
		sendForRevisionByClient,
		approvalWorkflow,
		productsDetails,
		partialGrn,
		organizationDetails,
	} = productRequest;

	await signInPage.signIn({ user: clientRequesterUserDetails, logged: false });

	await actionBoardPage.createNewRequest();

	if (requestSourcing === RequestSourcing.WITHOUT_SOURCING) {
		await requestPage.createProductRequestWithoutSourcing({ productRequest });
	} else if (requestSourcing === RequestSourcing.MANUAL_WITHOUT_SOURCING) {
		await requestPage.createManualProductRequestWithoutSourcing({ productRequest });
	}

	if (approvalWorkflow) {
		await requestsPage.openRequestById({ productRequest });

		await requestPage.approveClientProductRequest({ productRequest });
	}

	await signInPage.signIn({ user: eSourceAdminUserDetails });

	await rfqsPage.openFirstRfq();

	await buyerRfqPage.submitRfqWithSourcingFromVendors({ productRequest });
	await buyerRfqPage.showOfferSummary({ productRequest });
	await buyerRfqPage.validateRfq({ productRequest });

	await vendorRfqPage.submitRfq({ productRequest });

	productRequest.updateEsourceAdminUserDetails(null);

	await buyerRfqPage.openRfqSharedByClient({ productRequest });

	await vendorRfqPage.submitRfqToClient({ productRequest });

	await buyerRfqPage.validateOffer({ productRequest });

	await signInPage.signIn({ user: clientESourceAdminUserDetails });

	await rfqsPage.openFirstRfq();

	if (sendForRevisionByClient) {
		await buyerRfqPage.sendOfferForRevisionByClient({ productRequest });

		await signInPage.signIn({ user: eSourceAdminUserDetails });

		await rfqsPage.openFirstRfq();

		await buyerRfqPage.openRfqSharedByClient({ productRequest });

		productRequest.updateMarkupDetails(revisedMarkupDetails); // TODO: to be improved as revisied markup is not a real markup

		await vendorRfqPage.submitRfqToClient({ productRequest });

		await buyerRfqPage.validateOffer({ productRequest });

		await signInPage.signIn({ user: clientESourceAdminUserDetails });

		await rfqsPage.openFirstRfq();
	}

	await buyerRfqPage.acceptByClientOffer({ productRequest });

	if (approvalWorkflow) {
		await rfqsPage.openFirstRfq();

		await buyerRfqPage.approveByClientOffer({ productRequest, approverUserDetails: clientESourceAdminUserDetails });
	}

	await signInPage.signIn({ user: clientOrdersAdminUserDetails });

	if (!isGaiat(organizationDetails)) {
		await approvedOffersPage.openFirstClientApprovedOffer({ productRequest });

		await approvedOfferPage.submitClient({ productRequest });
	}

	if (approvalWorkflow) {
		await ordersPage.openClientFirstOrder({ productRequest });

		await buyerOrdersPage.submitClientOrderWithoutBudget({
			productRequest,
			approveOrder: approvalWorkflow,
			approverUserDetails: clientOrdersAdminUserDetails,
		});
	}

	await signInPage.signIn({ user: eSourceAdminUserDetails });

	await rfqsPage.openFirstRfq();

	await buyerRfqPage.showOfferSummary({ productRequest });
	await buyerRfqPage.acceptOffer({ productRequest });

	await signInPage.signIn({ user: ordersAdminUserDetails });

	if (!isGaiat(organizationDetails)) {
		await approvedOffersPage.openFirstApprovedOffer({ productRequest });

		await approvedOfferPage.submit({ productRequest });
	}

	await ordersPage.openFirstOrder({ productRequest });

	await buyerOrdersPage.submitOrderWithoutBudget({ productRequest });

	await vendorOrderPage.acceptOrder({ productRequest });

	await buyerOrdersPage.validateOrderStatus({ productRequest });

	if (partialGrn) {
		for (const productDetails of productsDetails) {
			productRequest.setProductDetails([productDetails]);
			productRequest.updateRfqDetails({ ...productRequest.rfqDetails, productShippingFee: productRequest.rfqDetails.shippingFee / 2 });

			await submitClientGrnToPayment({ productRequest });
		}
	} else {
		await submitClientGrnToPayment({ productRequest });
	}
};

export const submitClientGrnToPayment = async ({ productRequest }) => {
	const signInPage = new SignInPage();
	const grnsPage = new GrnsPage();
	const grnPage = new GrnPage();
	const gdnPage = new GdnPage();
	const gdnsPage = new GdnsPage();
	const billsPage = new BillsPage();
	const orderBillPage = new OrderBillPage();
	const paymentsPage = new PaymentsPage();
	const submitPaymentPage = new SubmitPaymentPage();
	const invoicesPage = new InvoicesPage();
	const invoicePage = new InvoicePage();
	const eInvoicePage = new EInvoicePage();
	const receivedPaymentsPage = new ReceivedPaymentsPage();
	const {
		superAdminUserDetails,
		grnAdminUserDetails,
		clientGrnAdminUserDetails,
		billsAdminUserDetails,
		clientBillsAdminUserDetails,
		paymentsAdminUserDetails,
		clientPaymentRequesterUserDetails,
		approvalWorkflow,
	} = productRequest;

	await signInPage.signIn({ user: grnAdminUserDetails });

	await gdnsPage.openFirstGdn({ productRequest });

	await gdnPage.submitGdn({ productRequest });

	await signInPage.signIn({ user: clientGrnAdminUserDetails });

	await grnsPage.openClientFirstGrn({ productRequest });

	await grnPage.submitClientGrn({ productRequest });

	await signInPage.signIn({ user: billsAdminUserDetails });

	await billsPage.openFirstSubmittedGrns({ productRequest });

	await orderBillPage.submitOrderBill({ productRequest });

	await signInPage.signIn({ user: paymentsAdminUserDetails });

	await paymentsPage.openPayment({ request: productRequest });

	await submitPaymentPage.submitPayment({ productRequest });

	await signInPage.signIn({ user: billsAdminUserDetails });

	await orderBillPage.validatePaidBillBox({ productRequest });

	await signInPage.signIn({ user: superAdminUserDetails });

	await invoicesPage.openFirstSubmittedGdns({ productRequest });

	await invoicePage.submitGdnsForOrder({ productRequest });

	await invoicesPage.openFirstPendingInvoice({ productRequest });

	await eInvoicePage.submitEInvoice({ productRequest });

	await invoicesPage.openFirstPendingInvoice({ productRequest });

	await invoicePage.submitInvoice({ productRequest });

	await signInPage.signIn({ user: clientBillsAdminUserDetails });

	await billsPage.openClientFirstPendingBill({ productRequest });

	await orderBillPage.submitClientOrderBill({
		productRequest,
		approveBill: approvalWorkflow,
		approverUserDetails: superAdminUserDetails, // BUG: bill approver on client is showing invoice submitter
	});

	await signInPage.signIn({ user: clientPaymentRequesterUserDetails });

	await paymentsPage.openClientPayment({ request: productRequest });

	await submitPaymentPage.submitClientPayment({ productRequest });

	await signInPage.signIn({ user: clientBillsAdminUserDetails });

	await orderBillPage.validateClientPaidBillBox({ productRequest });

	await signInPage.signIn({ user: superAdminUserDetails });

	await receivedPaymentsPage.submitRecievedPayments({ productRequest });
};
