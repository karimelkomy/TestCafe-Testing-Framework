import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import ProductPrice from '../shared/ProductPrice';
import { getNumberFromText, navigateTo, getCurrentUrl, isGaiat, isStc } from '../../../utilities/helpers';
import ActionsDropdown from './offers/ActionsDropdown';
import OfferDetailsCards from './offers/OfferDetailsCards';
import PendingOfferDetailsCards from './offers/PendingOfferDetailsCards';
import OfferProductAndServiceTable from './offers/OfferProductAndServiceTable';
import VendorColumn from './offers-comparison/VendorColumn';
import AcceptOfferSidebar from './AcceptOfferSidebar';
import SendForRevisionSidebar from './SendForRevisionSidebar';
import ViewOfferSidebar from './ViewOfferSidebar';
import NegotiateColumn from './offers-comparison/NegotiateColumn';
import NegotiateSidebar from './NegotiateSidebar';
import UpdateOfferSidebar from './UpdateOfferSidebar';
import RemarkSidebar from './rfq-approval/RemarkSidebar';
import RevisionPopup from './offers/RevisionPopup';
import SendForApprovalSidebar from './SendForApprovalSidebar';

export default class RfqsSection extends GenericElement {
	constructor() {
		super();
		this.productPrice = new ProductPrice();
		this.actionsDropdown = new ActionsDropdown();
		this.viewOfferSidebar = new ViewOfferSidebar();
		this.acceptOfferSidebar = new AcceptOfferSidebar();
		this.sendForApprovalSidebar = new SendForApprovalSidebar();
		this.remarkSidebar = new RemarkSidebar();
		this.sendForRevisionSidebar = new SendForRevisionSidebar();
		this.updateOfferSidebar = new UpdateOfferSidebar();
		this.negotiateColumn = new NegotiateColumn();
		this.negotiateSidebar = new NegotiateSidebar();
		this.offerDetailsCards = new OfferDetailsCards();
		this.pendingOfferDetailsCards = new PendingOfferDetailsCards();
		this.vendorColumn = new VendorColumn();
		this.offerProductAndServiceTable = new OfferProductAndServiceTable();
		this.revisionPopup = new RevisionPopup();
		this.vendorText = '//div[contains(@col-id,"%s")]//penny-compare-header-icon//div[contains(text(),"%s")]';
		this.rfqStatus = '//span[@data-test-id="rfq-status" and contains(text(), "%s")]';
		this.rfqText =
			'//penny-rfq-details-table-product-list[.//span[@data-test-id="id-vendor-name-text" and .="%s"]]//span[text()="RFQ #"]/following-sibling::span';
		this.rfqTextAlt =
			'//penny-rfq-details-table-product-list[.//span[@data-test-id="id-vendor-name-text" and .="%s"]]//div[./span[contains(text(), "#")]]';
		this.showOfferSummaryButton = '//button[@data-test-id="show-offers-summary-button"]';
		this.compareCheckbox = '//penny-rfq-details-table-product-list[.//span[@data-test-id="id-vendor-name-text" and .="%s"]]//p-checkbox';
	}

	async goToRfq({ rfqUrl }) {
		await navigateTo(rfqUrl);
		await this.wait(2); // TODO: remove after system stability
	}

	async clickShowOfferSummaryButton() {
		await this.click(this.showOfferSummaryButton);
	}

	async addVendorToComparisonTable({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.click(sprintf(this.compareCheckbox, vendorName));
		await this.wait(2); // TODO: remove after system stability
	}

	async getRfqId({ productRequest }) {
		const { organizationDetails, vendorDetails } = productRequest;
		let requestRfqId;

		await this.clickShowOfferSummaryButton();

		if (!isGaiat(organizationDetails)) {
			requestRfqId = await this.getText(sprintf(this.rfqTextAlt, vendorDetails.vendorName));
			const rfqId = requestRfqId.substring(requestRfqId.indexOf('/ ') + '/ '.length);

			return getNumberFromText(rfqId);
		}

		requestRfqId = await this.getText(sprintf(this.rfqText, vendorDetails.vendorName));

		return getNumberFromText(requestRfqId);
	}

	async getRfqUrl() {
		return getCurrentUrl();
	}

	async validateVendorName({ rfqId, vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorText, rfqId, vendorName));
	}

	async validateOfferDetailsInComparisonTable({ productRequest }) {
		const { rfqId, vendorDetails, rfqDetails, organizationDetails, productsDetails, requestDetails } = productRequest;

		await this.validateVendorName({ rfqId, vendorDetails });

		await this.vendorColumn.validateOfferDetailsColumn({ rfqId, requestDetails, rfqDetails, organizationDetails, productsDetails });
	}

	async validateOfferDetailsInSummaryTable({ productRequest }) {
		const { vendorDetails, rfqDetails, organizationDetails, productsDetails, requestDetails } = productRequest;

		await this.clickShowOfferSummaryButton();

		await this.offerDetailsCards.validate({ requestDetails, rfqDetails, organizationDetails, productsDetails, vendorDetails });

		await this.offerProductAndServiceTable.validateProductAndServiceTable({
			productsDetails,
			requestDetails,
			rfqDetails,
			organizationDetails,
		});

		await this.clickShowOfferSummaryButton();
	}

	async validateOffer({ productRequest }) {
		await this.validateOfferDetailsInComparisonTable({ productRequest });
		await this.validateOfferDetailsInSummaryTable({ productRequest });
	}

	async validateViewOfferSidebar({ productRequest }) {
		const { rfqId, productsDetails, vendorDetails, requestDetails, rfqDetails, organizationDetails } = productRequest;

		await this.vendorColumn.openViewOfferSidebar({ rfqId });

		await this.viewOfferSidebar.validate({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails, vendorDetails });
	}

	async acceptOfferFromComparisonTable({ productRequest }) {
		const { rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails, vendorDetails } = productRequest;

		await this.vendorColumn.openAcceptOfferSidebar({ rfqId });

		await this.acceptOfferSidebar.submit({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails, vendorDetails });
	}

	async sendOfferForApprovalFromComparisonTable({ productRequest }) {
		const { rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails, vendorDetails } = productRequest;

		await this.vendorColumn.openSendForApprovalSidebar({ rfqId });

		await this.sendForApprovalSidebar.submit({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails, vendorDetails });
	}

	async acceptOfferFromOfferSummary({ productRequest }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails } = productRequest;

		await this.pendingOfferDetailsCards.validate({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails });

		await this.offerProductAndServiceTable.validateProductAndServiceTable({
			productsDetails,
			requestDetails,
			rfqDetails,
			organizationDetails,
			markupDetails,
		});

		await this.actionsDropdown.acceptOffer();
	}

	async approveOfferFromOfferSummary({ productRequest, approverUserDetails }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails } = productRequest;
		let rfqId;

		await this.pendingOfferDetailsCards.validate({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails });

		await this.offerProductAndServiceTable.validateProductAndServiceTable({
			productsDetails,
			requestDetails,
			rfqDetails,
			organizationDetails,
			markupDetails,
		});

		await this.actionsDropdown.approveOffer();

		await this.remarkSidebar.submit({ rfqId, rfqDetails, approverUserDetails });
	}

	async sendOfferForRevisionFromOfferSummary({ productRequest }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails } = productRequest;

		await this.pendingOfferDetailsCards.validate({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails });

		await this.offerProductAndServiceTable.validateProductAndServiceTable({
			productsDetails,
			requestDetails,
			rfqDetails,
			organizationDetails,
			markupDetails,
		});

		await this.actionsDropdown.sendOfferForRevision();

		await this.revisionPopup.submit({ requestDetails });
	}

	async sendOfferForRevisionAll({ productRequest }) {
		const { rfqId, productsDetails, requestDetails, rfqDetails, vendorDetails, organizationDetails } = productRequest;

		await this.vendorColumn.openSendForRevisionAllSidebar({ rfqId });

		await this.sendForRevisionSidebar.submit({ rfqId, productsDetails, vendorDetails, requestDetails, rfqDetails, organizationDetails });
	}

	async submitApproveOffer({ productRequest, approverUserDetails }) {
		const { rfqId, rfqDetails } = productRequest;

		await this.vendorColumn.openApproveOfferSidebar({ rfqId });

		await this.remarkSidebar.submit({ rfqId, rfqDetails, approverUserDetails });
	}

	async sendOfferForNegotiation({ productRequest }) {
		const { rfqId, productsDetails, requestDetails, rfqDetails, vendorDetails, organizationDetails } = productRequest;

		await this.vendorColumn.openNegotiateColumn({ rfqId });

		await this.negotiateColumn.submit({ rfqId, productsDetails, rfqDetails, organizationDetails });

		await this.negotiateSidebar.submit({ rfqId, productsDetails, requestDetails, rfqDetails, vendorDetails, organizationDetails });
	}

	async submitUpdateOfferOffline({ productRequest }) {
		const { rfqId, rfqUrl, productsDetails, requestDetails, rfqDetails, vendorDetails, organizationDetails } = productRequest;

		if (isGaiat(organizationDetails)) {
			await this.goToRfq({ rfqUrl });
		} else {
			await this.addVendorToComparisonTable({ vendorDetails });
			await this.clickShowOfferSummaryButton();
		}

		await this.vendorColumn.openUpdateOfferSidebar({ rfqId });

		await this.updateOfferSidebar.submit({ rfqId, productsDetails, vendorDetails, requestDetails, rfqDetails, organizationDetails });
	}
}
