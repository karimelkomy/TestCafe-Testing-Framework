import GenericElement from '../../shared/core/GenericElement';

export default class NavigationBar extends GenericElement {
	constructor() {
		super();
		this.rfqDraftsTab = '//penny-marketplace-top-tab-navigation//a[text()="RFQ Drafts" and contains(@routerlinkactive, "text-penny-blue")]';
		this.rfqsSubmittedTab = '//penny-marketplace-top-tab-navigation//a[text()="RFQs Submitted" and contains(@routerlinkactive, "text-penny-blue")]';
		this.offersReceivedTab = '//penny-marketplace-top-tab-navigation//a[text()="Offers Received" and contains(@routerlinkactive, "text-penny-blue")]';
		this.allRfqsTab = '//penny-marketplace-top-tab-navigation//a[text()="All RFQs" and contains(@routerlinkactive, "text-penny-blue")]';
	}

	async clickRfqDraftsTab() {
		await this.click(this.rfqDraftsTab);
	}

	async clickRfqsSubmittedTab() {
		await this.click(this.rfqsSubmittedTab);
	}

	async clickOffersReceivedTab() {
		await this.click(this.offersReceivedTab);
	}

	async clickAllRfqsTab() {
		await this.click(this.allRfqsTab);
	}
}
