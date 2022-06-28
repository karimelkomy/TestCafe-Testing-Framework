import BillInfoBox from "../components/saas/bills/order-bill/BillInfoBox";
import BillProductAndServiceTable from "../components/saas/bills/order-bill/BillProductAndServiceTable";
import BillPriceSummary from "../components/saas/bills/order-bill/BillPriceSummary";
import BillSubmitFooter from "../components/saas/bills/order-bill/BillSubmitFooter";
import BillSuccess from "../components/saas/bills/order-bill/BillSuccess";
import GrnsForOrder from "../components/saas/bills/order-bill/grns-for-order/GrnsForOrder";
import BillApproval from "../components/saas/bills/order-bill/bill-approval/BillApproval";
import BillRemarkBox from "../components/saas/bills/order-bill/BillRemarkBox";
import BillHeader from "../components/saas/bills/order-bill/BillHeader";
import { navigateTo } from "../utilities/helpers";

export default class OrderBillPage {
  constructor() {
    this.grnsForOrder = new GrnsForOrder();
    this.billHeader = new BillHeader();
    this.billInfoBox = new BillInfoBox();
    this.billProductAndServiceTable = new BillProductAndServiceTable();
    this.billPriceSummary = new BillPriceSummary();
    this.billSubmitFooter = new BillSubmitFooter();
    this.billSuccess = new BillSuccess();
    this.billApproval = new BillApproval();
    this.billRemarkBox = new BillRemarkBox();
  }

  async goToBill(billUrl) {
    await navigateTo(billUrl);
  }

  async validatePaidBillBox({ productRequest }) {
    const {
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productDetails,
      productsDetails,
      billUrl
    } = productRequest;
    const productsDetailsValue = productDetails || productsDetails;

    await this.goToBill(billUrl);

    await this.billInfoBox.validatePaidBillInfoBox({
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productsDetails: productsDetailsValue
    });
  }

  async validateClientPaidBillBox({ productRequest }) {
    const {
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productDetails,
      productsDetails,
      markupDetails,
      clientBillUrl
    } = productRequest;
    const productsDetailsValue = productDetails || productsDetails;

    await this.goToBill(clientBillUrl);

    await this.billInfoBox.validatePaidBillInfoBox({
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productsDetails: productsDetailsValue,
      markupDetails
    });
  }

  async submitOrderBill({ productRequest, approveBill, approverUserDetails }) {
    const {
      orderId,
      requestDetails,
      requesterUserDetails,
      rfqDetails,
      productDetails,
      productsDetails,
      workspaceDetails,
      organizationDetails,
      billDetails,
      vendorDetails
    } = productRequest;
    const productsDetailsValue = productDetails || productsDetails;

    await this.grnsForOrder.submit({
      orderId,
      vendorDetails,
      workspaceDetails,
      requestDetails,
      productsDetails: productsDetailsValue,
      requesterUserDetails
    });

    const billId = await this.billSuccess.submit();

    productRequest.setBillId(billId);

    await this.billHeader.validateBillHeader({ billId, vendorDetails });

    await this.billInfoBox.submit({
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productsDetails: productsDetailsValue
    });

    await this.billProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      organizationDetails
    });

    await this.billPriceSummary.validateSummary({
      organizationDetails,
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue
    });

    await this.billSubmitFooter.submitBill();

    await this.billSuccess.submit();

    if (approveBill) {
      await this.billApproval.approveBill({
        billId,
        billDetails,
        approverUserDetails
      });
      await this.billSuccess.submit();
    }

    await this.billInfoBox.validateSubmitted({
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productsDetails: productsDetailsValue
    });

    await this.billProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      organizationDetails
    });

    await this.billPriceSummary.validateSummary({
      organizationDetails,
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue
    });
  }

  async submitClientOrderBill({
    productRequest,
    approveBill,
    approverUserDetails
  }) {
    const {
      requestDetails,
      rfqDetails,
      productDetails,
      productsDetails,
      workspaceDetails,
      organizationDetails,
      markupDetails,
      billDetails,
      invoiceDetails
    } = productRequest;
    const productsDetailsValue = productDetails || productsDetails;

    await this.billInfoBox.validateBillInfoBox({
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productsDetails: productsDetailsValue,
      markupDetails
    });
    await this.billInfoBox.validateUploadedInvoice();

    await this.billProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      organizationDetails,
      markupDetails
    });

    await this.billPriceSummary.validateSummary({
      organizationDetails,
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      markupDetails
    });

    await this.billRemarkBox.submit({ billDetails, invoiceDetails });

    await this.billSubmitFooter.clickAcceptAndProceedToPaymentButton();

    const clientBillId = await this.billSuccess.submit();

    productRequest.setClientBillId(clientBillId);

    if (approveBill) {
      await this.billApproval.approveBill({
        billId: clientBillId,
        billDetails,
        approverUserDetails
      });
      await this.billSuccess.submit();
    }

    await this.billInfoBox.validateSubmitted({
      requestDetails,
      rfqDetails,
      workspaceDetails,
      organizationDetails,
      productsDetails: productsDetailsValue,
      markupDetails
    });

    await this.billProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      organizationDetails,
      markupDetails
    });

    await this.billPriceSummary.validateSummary({
      organizationDetails,
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      markupDetails
    });

    await this.billRemarkBox.validateSubmitted({ billDetails, invoiceDetails });
  }
}
