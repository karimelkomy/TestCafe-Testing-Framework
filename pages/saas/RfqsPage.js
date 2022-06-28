import RfqsList from '../../components/saas/rfq-offers/RfqsList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class RfqsPage {
	constructor() {
		this.rfqsList = new RfqsList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async openFirstRfq() {
		await this.modulesSideBar.clickRfqsLink();

		await this.rfqsList.selectFirstRfq();
	}

	async openRfqById({ productRequest }) {
		await this.rfqsList.selectRfqById({ productRequest });
	}

	async createNewRequest() {
		await this.modulesSideBar.clickRfqsLink();

		await this.rfqsList.clickCreateRequestButton();
	}
}
