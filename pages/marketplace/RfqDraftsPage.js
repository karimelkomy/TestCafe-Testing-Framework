import RfqDrafts from '../../components/marketplace/my-rfqs/rfq-drafts/RfqDrafts';
import NavigationBar from '../../components/marketplace/my-rfqs/NavigationBar';

export default class RfqDraftsPage {
	constructor() {
		this.navigationBar = new NavigationBar();
		this.rfqDrafts = new RfqDrafts();
	}

	async openRfqDraftsTab() {
		await this.navigationBar.clickRfqDraftsTab();
	}

	async submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails }) {
		await this.openRfqDraftsTab();
		await this.rfqDrafts.submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails });
	}
}
