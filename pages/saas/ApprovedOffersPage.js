import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';
import ApprovedOffersList from '../../components/saas/orders/ApprovedOffersList';
import OrdersNavigationBar from '../../components/saas/orders/OrdersNavigationBar';

export default class ApprovedOffersPage {
	constructor() {
		this.approvedOffersList = new ApprovedOffersList();
		this.modulesSideBar = new ModulesSideBar();
		this.ordersNavigationBar = new OrdersNavigationBar();
	}

	async openFirstApprovedOffer({ productRequest }) {
		await this.modulesSideBar.clickOrdersLink();

		await this.ordersNavigationBar.openApprovedOffersTab();

		await this.approvedOffersList.selectFirstOffer({ productRequest });
	}

	async openFirstClientApprovedOffer({ productRequest }) {
		await this.modulesSideBar.clickOrdersLink();

		await this.ordersNavigationBar.openApprovedOffersTab();

		await this.approvedOffersList.selectFirstClientOffer({ productRequest });
	}
}
