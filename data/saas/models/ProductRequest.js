import OrderStatus from '../constants/orderStatus';
import GrnStatus from '../constants/grnStatus';
import OfferStatus from '../constants/OfferStatus';
import PaymentTermMode from '../constants/PaymentTermMode';

export default class ProductRequest {
	constructor({
		organizationDetails,
		organizationLocation,
		workspaceDetails,
		budgetDetails,
		vendorsDetails,
		vendorDetails,
		catalogueDetails,
		productsDetails,
		productDetails,
		partialGrn,
		superAdminUserDetails,
		requesterUserDetails,
		clientRequesterUserDetails,
		clientPaymentRequesterUserDetails,
		eSourceAdminUserDetails,
		clientESourceAdminUserDetails,
		ordersAdminUserDetails,
		clientOrdersAdminUserDetails,
		grnAdminUserDetails,
		clientGrnAdminUserDetails,
		billsAdminUserDetails,
		clientBillsAdminUserDetails,
		paymentsAdminUserDetails,
		requestDetails,
		rfqDetails,
		orderDetails,
		markupDetails,
		revisedMarkupDetails,
		requestId,
		rfqId,
		rfqUrl,
		orderId,
		orderUrl,
		orderStatus = OrderStatus.DRAFT,
		offerStatus = OfferStatus.RFQ_COMPLETED,
		grnStatus = GrnStatus.ORDER_CONFIRMED,
		gdnStatus = GrnStatus.ORDER_CONFIRMED,
		billDetails,
		billId,
		billUrl,
		invoiceId,
		invoiceDetails,
		clientRfqId,
		clientRfqUrl,
		clientDetails,
		clientBillId,
		clientBillUrl,
		clientOrderStatus = OrderStatus.DRAFT,
		requestSourcing,
		eSourceSourcing,
		requestModule,
		sendForRevision,
		sendForRevisionByClient,
		sendForNegotiation,
		updateOfferOffline,
		approvalWorkflow,
		paymentTermMode,
	}) {
		this.organizationDetails = organizationDetails;
		this.organizationLocation = organizationLocation;
		this.workspaceDetails = workspaceDetails;
		this.budgetDetails = budgetDetails;
		this.vendorsDetails = vendorsDetails;
		this.vendorDetails = vendorDetails;
		this.catalogueDetails = catalogueDetails;
		this.productsDetails = productsDetails;
		this.productDetails = productDetails;
		this.partialGrn = partialGrn;
		this.superAdminUserDetails = superAdminUserDetails;
		this.requesterUserDetails = requesterUserDetails;
		this.clientRequesterUserDetails = clientRequesterUserDetails;
		this.clientPaymentRequesterUserDetails = clientPaymentRequesterUserDetails;
		this.eSourceAdminUserDetails = eSourceAdminUserDetails;
		this.clientESourceAdminUserDetails = clientESourceAdminUserDetails;
		this.ordersAdminUserDetails = ordersAdminUserDetails;
		this.clientOrdersAdminUserDetails = clientOrdersAdminUserDetails;
		this.grnAdminUserDetails = grnAdminUserDetails;
		this.clientGrnAdminUserDetails = clientGrnAdminUserDetails;
		this.billsAdminUserDetails = billsAdminUserDetails;
		this.clientBillsAdminUserDetails = clientBillsAdminUserDetails;
		this.paymentsAdminUserDetails = paymentsAdminUserDetails;
		this.requestDetails = requestDetails;
		this.rfqDetails = rfqDetails;
		this.orderDetails = orderDetails;
		this.markupDetails = markupDetails;
		this.revisedMarkupDetails = revisedMarkupDetails;
		this.requestId = requestId;
		this.rfqId = rfqId;
		this.rfqUrl = rfqUrl;
		this.clientRfqId = clientRfqId;
		this.clientRfqUrl = clientRfqUrl;
		this.orderId = orderId;
		this.orderUrl = orderUrl;
		this.offerStatus = offerStatus;
		this.orderStatus = orderStatus;
		this.grnStatus = grnStatus;
		this.gdnStatus = gdnStatus;
		this.billDetails = billDetails;
		this.billId = billId;
		this.billUrl = billUrl;
		this.invoiceId = invoiceId;
		this.invoiceDetails = invoiceDetails;
		this.clientDetails = clientDetails;
		this.clientBillId = clientBillId;
		this.clientBillUrl = clientBillUrl;
		this.clientOrderStatus = clientOrderStatus;
		this.requestSourcing = requestSourcing;
		this.eSourceSourcing = eSourceSourcing;
		this.requestModule = requestModule;
		this.sendForRevision = sendForRevision;
		this.sendForRevisionByClient = sendForRevisionByClient;
		this.sendForNegotiation = sendForNegotiation;
		this.updateOfferOffline = updateOfferOffline;
		this.approvalWorkflow = approvalWorkflow;
		this.paymentTermMode = paymentTermMode;
	}

	updateBudget(budgetDetails) {
		this.budgetDetails = budgetDetails;
	}

	setRequestId(requestId) {
		this.requestId = requestId;
	}

	setRfqId(rfqId) {
		this.rfqId = rfqId;
	}

	setRfqUrl(rfqUrl) {
		this.rfqUrl = rfqUrl;
	}

	setClientRfqId(clientRfqId) {
		this.rfclientRfqIdqId = clientRfqId;
	}

	setClientRfqUrl(clientRfqUrl) {
		this.clientRfqUrl = clientRfqUrl;
	}

	setOrderId(orderId) {
		this.orderId = orderId;
	}

	setOrderUrl(orderUrl) {
		this.orderUrl = orderUrl;
	}

	updateOrderStatus(orderStatus) {
		this.orderStatus = orderStatus;
	}

	updateGrnStatus(grnStatus) {
		this.grnStatus = grnStatus;
	}

	updateGdnStatus(gdnStatus) {
		this.gdnStatus = gdnStatus;
	}

	setBillId(billId) {
		this.billId = billId;
	}

	setBillUrl(billUrl) {
		this.billUrl = billUrl;
	}

	updateRfqDetails(rfqDetails) {
		this.rfqDetails = rfqDetails;
	}

	updateMarkupDetails(markupDetails) {
		this.markupDetails = markupDetails;
	}

	updateVendorDetails(vendorDetails) {
		this.vendorDetails = vendorDetails;
	}

	updateRequesterDetails(requesterUserDetails) {
		this.requesterUserDetails = requesterUserDetails;
	}

	updateEsourceAdminUserDetails(eSourceAdminUserDetails) {
		this.eSourceAdminUserDetails = eSourceAdminUserDetails;
	}

	setInvoiceId(invoiceId) {
		this.invoiceId = invoiceId;
	}

	setClientBillId(clientBillId) {
		this.clientBillId = clientBillId;
	}

	setClientBillUrl(clientBillUrl) {
		this.clientBillUrl = clientBillUrl;
	}

	updateClientOrderStatus(clientOrderStatus) {
		this.clientOrderStatus = clientOrderStatus;
	}

	setProductDetails(productDetails) {
		this.productDetails = productDetails;
	}
}
