import RfqInfoBox from "../components/saas/rfq-offers/RfqInfoBox";
import SelectVendors from "../components/saas/rfq-offers/SelectVendors";
import RequestedProductAndService from "../components/saas/rfq-offers/RequestedProductAndService";
import RfqsSection from "../components/saas/rfq-offers/RfqsSection";
import RfqHeader from "../components/saas/rfq-offers/RfqHeader";
import RequestorRemark from "../components/saas/rfq-offers/RequestorRemark";
import Sourcing from "../components/saas/rfq-offers/sourcing/Sourcing";
import OfferSuccessSidebar from "../components/saas/rfq-offers/offers/OfferSuccessSidebar";
import EsourceSourcing from "../../data/saas/constants/EsourceSourcing";
import { isGaiat } from "../utilities/helpers";

export default class BuyerRfqPage {
  constructor() {
    this.sourcing = new Sourcing();
    this.rfqHeader = new RfqHeader();
    this.rfqInfoBox = new RfqInfoBox();
    this.selectVendors = new SelectVendors();
    this.requestedProductAndService = new RequestedProductAndService();
    this.rfqsSection = new RfqsSection();
    this.requestorRemark = new RequestorRemark();
    this.offerSuccessSidebar = new OfferSuccessSidebar();
  }

  async showOfferSummary({ productRequest }) {
    const { organizationDetails } = productRequest;

    if (!isGaiat(organizationDetails)) {
      await this.rfqsSection.clickShowOfferSummaryButton();
    }
  }

  async goToRfq({ productRequest }) {
    const { rfqUrl } = productRequest;

    await this.rfqsSection.goToRfq({ rfqUrl });
  }

  async openRfqSharedByClient({ productRequest }) {
    await this.goToRfq({ productRequest });
    await this.requestedProductAndService.clickPlusButton();
    await this.sourcing.navigateToClientRfq();
  }

  async submitRfqWithSourcingFromPreferredVendor({ productRequest }) {
    await this.sourcing.submitRfqFromPreferredVendor({ productRequest });
  }

  async submitRfqWithSourcingFromVendors({ productRequest }) {
    await this.sourcing.submitRfqFromVendors({ productRequest });
  }

  async submitRfq({ productRequest }) {
    const { eSourceSourcing } = productRequest;

    if (eSourceSourcing === EsourceSourcing.SOURCE_FROM_VENDORS) {
      await this.submitRfqWithSourcingFromVendors({ productRequest });
    } else if (
      eSourceSourcing === EsourceSourcing.SOURCE_FROM_PREFERRED_VENDOR
    ) {
      await this.submitRfqWithSourcingFromPreferredVendor({ productRequest });
    }
  }

  async validateRfq({ productRequest }) {
    await this.rfqHeader.validateRfqHeader({ productRequest });

    await this.rfqInfoBox.validateRfqDetails({ productRequest });

    const rfqId = await this.rfqsSection.getRfqId({ productRequest });
    const rfqUrl = await this.rfqsSection.getRfqUrl();

    await this.requestedProductAndService.validate({ productRequest });

    await this.requestorRemark.validate({ productRequest });

    productRequest.setRfqId(rfqId);
    productRequest.setRfqUrl(rfqUrl);
  }

  async validateOffer({ productRequest }) {
    await this.goToRfq({ productRequest });

    await this.showOfferSummary({ productRequest });

    await this.rfqsSection.validateOffer({ productRequest });

    await this.requestedProductAndService.clickPlusButton();

    await this.requestorRemark.validate({ productRequest });

    await this.rfqsSection.validateViewOfferSidebar({ productRequest });
  }

  async acceptByClientOffer({ productRequest }) {
    await this.rfqsSection.acceptOfferFromOfferSummary({ productRequest });

    await this.offerSuccessSidebar.goToClientRfqList();
  }

  async approveByClientOffer({ productRequest, approverUserDetails }) {
    await this.rfqsSection.approveOfferFromOfferSummary({
      productRequest,
      approverUserDetails
    });

    await this.offerSuccessSidebar.goToClientRfqList();
  }

  async sendOfferForRevisionByClient({ productRequest }) {
    await this.rfqsSection.sendOfferForRevisionFromOfferSummary({
      productRequest
    });
  }

  async acceptOffer({ productRequest }) {
    await this.rfqsSection.acceptOfferFromComparisonTable({ productRequest });

    await this.offerSuccessSidebar.goToRfqList({ productRequest });
  }

  async sendOfferForApproval({ productRequest }) {
    await this.rfqsSection.sendOfferForApprovalFromComparisonTable({
      productRequest
    });

    await this.offerSuccessSidebar.goToRfqList({ productRequest });
  }

  async sendForRevisionAll({ productRequest }) {
    await this.validateOffer({ productRequest });

    await this.rfqsSection.sendOfferForRevisionAll({ productRequest });
  }

  async sendForNegotiation({ productRequest }) {
    await this.rfqsSection.sendOfferForNegotiation({ productRequest });
  }

  async updateOfferOffline({ productRequest }) {
    await this.rfqsSection.submitUpdateOfferOffline({ productRequest });
  }

  async approveOffer({ productRequest, approverUserDetails }) {
    await this.rfqsSection.submitApproveOffer({
      productRequest,
      approverUserDetails
    });

    await this.offerSuccessSidebar.goToRfqList({ productRequest });
  }
}
