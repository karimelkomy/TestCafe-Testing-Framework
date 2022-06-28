import Sourcing from "../components/saas/requests/product-request/sourcing/Sourcing";
import RequestInfo from "../components/saas/requests/product-request/RequestInfo";
import ReviewAndSubmit from "../components/saas/requests/product-request/ReviewAndSubmit";
import RequestSuccess from "../components/saas/requests/product-request/RequestSuccess";
import ReimbursementInfo from "../components/saas/requests/reimbursement-request/ReimbursementInfo";
import ReimbursementReviewAndSubmit from "../components/saas/requests/reimbursement-request/ReimbursementReviewAndSubmit";
import AddProductsAndServices from "../components/saas/requests/product-request/addProductsAndServices/AddProductsAndServices";
import RequestApproval from "../components/saas/requests/product-request/request-approval/RequestApproval";
import { getCurrentUrl } from "../utilities/helpers";
import RequestSourcing from "../../data/saas/constants/RequestSourcing";

export default class RequestPage {
  constructor() {
    this.sourcing = new Sourcing();
    this.addProductsAndServices = new AddProductsAndServices();
    this.requestInfo = new RequestInfo();
    this.reviewAndSubmit = new ReviewAndSubmit();
    this.requestSuccess = new RequestSuccess();
    this.reimbursementInfo = new ReimbursementInfo();
    this.reimbursementReviewAndSubmit = new ReimbursementReviewAndSubmit();
    this.requestApproval = new RequestApproval();
  }

  async createProductRequestWithoutSourcing({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.reviewAndSubmit.submit({ productRequest });

    const requestId = await this.requestSuccess.submit();

    productRequest.setRequestId(requestId);
  }

  async createProductRequestWithRfqSourcingUsingContract({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.sourcing.submitRfqUsingContract({ productRequest });
  }

  async createProductRequestWithRfqSourcingFromVendors({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.sourcing.submitRfqFromVendors({ productRequest });
  }

  async createProductRequestWithRfqSourcingFromPreferredVendor({
    productRequest
  }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.sourcing.submitRfqFromPreferredVendor({ productRequest });
  }

  async createManualProductRequestWithRfqSourcing({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitManualProductRequest({
      productRequest
    });
    await this.sourcing.submitRfqFromVendors({ productRequest });
  }

  async createManualProductRequestWithoutSourcing({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitManualProductRequest({
      productRequest
    });
    await this.reviewAndSubmit.submit({ productRequest });

    const requestId = await this.requestSuccess.submit();

    productRequest.setRequestId(requestId);
  }

  async createBulkProductRequestWithRfqSourcing({ productRequest }) {
    await this.sourcing.submitRfqFromVendors({ productRequest });
  }

  async createProductRequestWithOrderSourcing({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.sourcing.submitOrderFromVendors({ productRequest });

    productRequest.setRfqId(null);
  }

  async createProductRequestWithOrderSourcingUsingContract({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.sourcing.submitOrderUsingContract({ productRequest });

    productRequest.setRfqId(null);
  }

  async createProductRequestWithRfqSourcingLater({ productRequest }) {
    await this.requestInfo.submit({ productRequest });
    await this.addProductsAndServices.submitCatalogProductRequest({
      productRequest
    });
    await this.sourcing.submitRfqLater({ productRequest });

    return getCurrentUrl();
  }

  async createReimbursementRequest({ reimbursementRequest }) {
    await this.reimbursementInfo.submit({ reimbursementRequest });
    await this.reimbursementReviewAndSubmit.submit({ reimbursementRequest });
  }

  async approveProductRequest({ productRequest }) {
    const { requestId, requestDetails, requesterUserDetails } = productRequest;

    await this.requestApproval.approveRequest({
      requestId,
      requestDetails,
      requesterUserDetails
    });
  }

  async approveClientProductRequest({ productRequest }) {
    const {
      requestId,
      requestDetails,
      clientRequesterUserDetails
    } = productRequest;

    await this.requestApproval.approveRequest({
      requestId,
      requestDetails,
      requesterUserDetails: clientRequesterUserDetails
    });
  }

  async createProductRequest({ productRequest }) {
    const { requestSourcing } = productRequest;

    if (requestSourcing === RequestSourcing.SOURCE_FROM_VENDORS) {
      await this.createProductRequestWithRfqSourcingFromVendors({
        productRequest
      });
    } else if (
      requestSourcing === RequestSourcing.MANUAL_WITH_SOURCE_FROM_VENDORS
    ) {
      await this.createManualProductRequestWithRfqSourcing({ productRequest });
    } else if (
      requestSourcing === RequestSourcing.BULK_WITH_SOURCE_FROM_VENDORS
    ) {
      await this.createBulkProductRequestWithRfqSourcing({ productRequest });
    } else if (
      requestSourcing === RequestSourcing.ORDER_WITH_SOURCE_FROM_VENDORS
    ) {
      await this.createProductRequestWithOrderSourcing({ productRequest });
    } else if (
      requestSourcing === RequestSourcing.ORDER_WITH_SOURCE_FROM_CONTRACT
    ) {
      await this.createProductRequestWithOrderSourcingUsingContract({
        productRequest
      });
    } else if (
      requestSourcing === RequestSourcing.SOURCE_FROM_PREFERRED_VENDOR
    ) {
      await this.createProductRequestWithRfqSourcingFromPreferredVendor({
        productRequest
      });
    } else if (requestSourcing === RequestSourcing.SOURCE_FROM_CONTRACT) {
      await this.createProductRequestWithRfqSourcingUsingContract({
        productRequest
      });
    } else if (requestSourcing === RequestSourcing.SOURCE_LATER) {
      await this.createProductRequestWithRfqSourcingLater({ productRequest });
    } else {
      await this.createProductRequestWithoutSourcing({ productRequest });
    }
  }
}
