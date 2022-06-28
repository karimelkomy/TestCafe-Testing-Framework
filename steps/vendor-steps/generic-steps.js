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

export const submitRfq = async ({ productRequest, vendorToPlatform }) => {
	const signInPage = new SignInPage();
	const vendorRfqPage = new VendorRfqPage();
	const {
		vendorDetails,
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

	if (vendorToPlatform) {
		await signInPage.signIn({ user: vendorDetails, logged: true });
	} else {
		await vendorRfqPage.submitRfq({ productRequest });
	}
};

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

	await vendorRfqPage.submitRfq({ productRequest });

	await vendorOrderPage.acceptOrder({ productRequest });
};
