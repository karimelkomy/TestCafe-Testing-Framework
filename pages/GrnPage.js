import GrnHeader from "../components/saas/grns/GrnHeader";
import GrnProductAndServiceTable from "../components/saas/grns/GrnProductAndServiceTable";
import GrnSubmitFooter from "../components/saas/grns/GrnSubmitFooter";
import grnQty from "../../data/saas/constants/grnQty";
import GrnInfoBox from "../components/saas/grns/GrnInfoBox";
import GrnSidebar from "../components/saas/grns/GrnSidebar";
import GrnStatus from "../../data/saas/constants/grnStatus";

export default class GrnPage {
  constructor() {
    this.grnHeader = new GrnHeader();
    this.grnProductAndServiceTable = new GrnProductAndServiceTable();
    this.grnSubmitFooter = new GrnSubmitFooter();
    this.grnInfoBox = new GrnInfoBox();
    this.grnSidebar = new GrnSidebar();
  }

  async submitGrn({ productRequest }) {
    const { requestDetails } = productRequest;

    // TODO: add GRN remark

    await this.grnHeader.validateGrnHeader({ productRequest });

    await this.grnInfoBox.validateGrnInfoBox({ productRequest });
    await this.grnInfoBox.uploadInvoice();
    await this.grnInfoBox.validateUploadedInvoice();

    await this.grnProductAndServiceTable.submit({
      deliveredQty: grnQty.INITIAL,
      recievedQty: grnQty.INITIAL,
      productRequest
    });

    await this.grnSubmitFooter.submitQuantity();

    await this.grnHeader.openCompletedGrn();

    await this.grnSidebar.validate({
      recievedQty: requestDetails.qty,
      invoice: true,
      productRequest
    });

    productRequest.updateGrnStatus(GrnStatus.ORDER_RECEIVED);

    await this.grnInfoBox.validateGrnInfoBox({ productRequest });

    await this.grnProductAndServiceTable.validate({
      deliveredQty: requestDetails.qty,
      recievedQty: requestDetails.qty,
      productRequest
    });
  }

  async submitClientGrn({ productRequest }) {
    const { requestDetails } = productRequest;

    await this.grnHeader.validateClientGrnHeader({ productRequest });

    await this.grnInfoBox.validateGrnInfoBox({ productRequest });

    await this.grnProductAndServiceTable.validate({
      deliveredQty: requestDetails.qty,
      recievedQty: grnQty.INITIAL,
      productRequest
    });

    await this.grnHeader.openPendingGrn();

    await this.grnSidebar.submit({
      recievedQty: grnQty.INITIAL,
      productRequest
    });

    await this.grnHeader.openCompletedGrn();

    await this.grnSidebar.validate({
      recievedQty: requestDetails.qty,
      productRequest
    });

    productRequest.updateGrnStatus(GrnStatus.ORDER_RECEIVED);

    await this.grnInfoBox.validateGrnInfoBox({ productRequest });

    await this.grnProductAndServiceTable.validate({
      deliveredQty: requestDetails.qty,
      recievedQty: requestDetails.qty,
      productRequest
    });
  }
}
