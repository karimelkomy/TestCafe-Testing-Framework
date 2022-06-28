import NavigationBar from '../../components/marketplace/my-rfqs/NavigationBar';
import RfqsSubmitted from '../../components/marketplace/my-rfqs/rfqs-submitted/RfqsSubmitted';
import rfqStatus from '../../data/marketplace/constants/rfqStatus';

export default class RfqsSubmittedPage {
	constructor() {
		this.navigationBar = new NavigationBar();
		this.rfqsSubmitted = new RfqsSubmitted();
	}

	async openRfqsSubmittedTab() {
		await this.navigationBar.clickRfqsSubmittedTab();
	}

	async submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails }) {
		await this.openRfqsSubmittedTab();
		await this.rfqsSubmitted.submit({
			productDetails,
			rfqDetails,
			supplierDetails,
			deliveryLocationDetails,
			status: rfqStatus.RFQ_SUBMITTED,
		});
	}
}
