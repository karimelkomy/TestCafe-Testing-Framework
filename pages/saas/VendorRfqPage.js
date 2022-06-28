import VendorAppAccess from '../../components/saas/vendor/VendorAppAccess';
import RfqProductAndServiceTable from '../../components/saas/vendor/rfq/RfqProductAndServiceTable';
import RfqInfoBox from '../../components/saas/vendor/rfq/RfqInfoBox';
import RfqSubmission from '../../components/saas/vendor/rfq/RfqSubmission';
import RfqSummary from '../../components/saas/vendor/rfq/RfqSummary';
import RfqDetailsBox from '../../components/saas/vendor/rfq/RfqDetailsBox';
import RfqRemark from '../../components/saas/vendor/rfq/RfqRemark';
import { email } from '../../data/saas/constants/urls';
import VendorRfqApi from '../../api/requests/VendorRfqApi';

export default class VendorRfqPage {
	constructor() {
		this.vendorAppAccess = new VendorAppAccess();
		this.rfqProductAndServiceTable = new RfqProductAndServiceTable();
		this.rfqInfoBox = new RfqInfoBox();
		this.rfqSubmission = new RfqSubmission();
		this.rfqSummary = new RfqSummary();
		this.rfqDetailsBox = new RfqDetailsBox();
		this.rfqRemark = new RfqRemark();
	}

	async validateSubmittedRfq({
		organizationDetails,
		organizationLocation,
		productsDetails,
		rfqDetails,
		workspaceDetails,
		requestDetails,
		markupDetails,
	}) {
		await this.rfqInfoBox.validateInfoBox({ rfqDetails, organizationDetails });

		await this.rfqDetailsBox.validateSubmittedRfqDetailsBox({
			workspaceDetails,
			organizationDetails,
			organizationLocation,
			requestDetails,
			markupDetails,
		});

		await this.rfqProductAndServiceTable.validateSubmittedProductAndServiceTable({
			organizationDetails,
			requestDetails,
			rfqDetails,
			productsDetails,
			markupDetails,
		});

		await this.rfqSummary.validateSummary({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.rfqRemark.validateRemark(rfqDetails);
	}

	async navigateToVendorRfqUrl(rfqUrl, vendorDetails) {
		const requestUuid = await rfqUrl.substring(rfqUrl.indexOf('request/') + 'request/'.length, rfqUrl.indexOf('/detail'));
		const vendorRfqUrl = await VendorRfqApi.getVendorRfqUrl(requestUuid, vendorDetails);

		await this.vendorAppAccess.navigateToVendorUrl({ vendorUrl: vendorRfqUrl });
	}

	async openRfq({ productRequest }) {
		const { rfqId, rfqUrl, vendorDetails, rfqDetails } = productRequest;

		if (email === 'true') {
			await this.vendorAppAccess.openRfq({ rfqId, vendorDetails, text: rfqDetails.rfqType });
		} else {
			await this.navigateToVendorRfqUrl(rfqUrl, vendorDetails);
		}
	}

	async openRevisionRfq({ productRequest }) {
		const { rfqId, rfqUrl, vendorDetails } = productRequest;

		if (email === 'true') {
			await this.vendorAppAccess.openRfq({ rfqId, vendorDetails, text: 'Revision Request' });
		} else {
			await this.navigateToVendorRfqUrl(rfqUrl, vendorDetails);
		}
	}

	async submitRfq({ productRequest }) {
		const {
			organizationDetails,
			organizationLocation,
			eSourceAdminUserDetails,
			productsDetails,
			rfqDetails,
			workspaceDetails,
			requestDetails,
			vendorDetails,
			paymentTermMode,
		} = productRequest;

		// TODO: Validate date created, expired and delivery date
		await this.openRfq({ productRequest });

		await this.rfqDetailsBox.validateRfqDetailsBox({
			workspaceDetails,
			organizationDetails,
			organizationLocation,
			eSourceAdminUserDetails,
			requestDetails,
		});

		await this.rfqProductAndServiceTable.submitProductAndServiceInfo({
			organizationDetails,
			requestDetails,
			rfqDetails,
			productsDetails,
			vendorDetails,
		});

		await this.rfqInfoBox.submitInfoBox({ paymentTermMode, rfqDetails, vendorDetails });

		await this.rfqSummary.validateSummary({ organizationDetails, requestDetails, rfqDetails, productsDetails });

		await this.rfqRemark.fillRemark(rfqDetails);

		await this.rfqSubmission.submitOffer({ requestDetails, rfqDetails, organizationDetails, productsDetails });

		await this.validateSubmittedRfq({
			organizationDetails,
			organizationLocation,
			productsDetails,
			rfqDetails,
			workspaceDetails,
			requestDetails,
		});
	}

	async submitRfqToClient({ productRequest }) {
		const {
			organizationDetails,
			organizationLocation,
			eSourceAdminUserDetails,
			productsDetails,
			rfqDetails,
			workspaceDetails,
			requestDetails,
			vendorDetails,
			markupDetails,
			paymentTermMode,
		} = productRequest;

		// TODO: Validate date created, expired and delivery date
		await this.rfqProductAndServiceTable.submitProductAndServiceInfo({
			organizationDetails,
			requestDetails,
			rfqDetails,
			productsDetails,
			vendorDetails,
			markupDetails,
		});

		await this.rfqDetailsBox.validateRfqDetailsBox({
			workspaceDetails,
			organizationDetails,
			organizationLocation,
			eSourceAdminUserDetails,
			requestDetails,
			markupDetails,
		});

		await this.rfqInfoBox.submitInfoBox({ paymentTermMode, rfqDetails, vendorDetails });

		await this.rfqSummary.validateSummary({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.rfqRemark.fillRemark(rfqDetails);

		await this.rfqSubmission.submitOffer({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails });

		await this.validateSubmittedRfq({
			organizationDetails,
			organizationLocation,
			productsDetails,
			rfqDetails,
			workspaceDetails,
			requestDetails,
			markupDetails,
		});
	}

	async acceptNegotiatedOffer({ productRequest }) {
		const {
			organizationDetails,
			organizationLocation,
			eSourceAdminUserDetails,
			productsDetails,
			rfqDetails,
			workspaceDetails,
			requestDetails,
			markupDetails,
		} = productRequest;

		// TODO: Validate date created, expired and delivery date
		await this.openRfq({ productRequest });

		await this.rfqDetailsBox.validateRfqDetailsBox({
			workspaceDetails,
			organizationDetails,
			organizationLocation,
			eSourceAdminUserDetails,
			requestDetails,
		});

		await this.rfqProductAndServiceTable.submitNegotiation({ organizationDetails, rfqDetails, productsDetails });

		await this.rfqInfoBox.submitNegotiation({ rfqDetails, organizationDetails });

		await this.rfqSummary.validateSummary({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.rfqRemark.fillRemark(rfqDetails);

		await this.rfqSubmission.submitOffer({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails });

		await this.validateSubmittedRfq({
			organizationDetails,
			organizationLocation,
			productsDetails,
			rfqDetails,
			workspaceDetails,
			requestDetails,
		});
	}
}
