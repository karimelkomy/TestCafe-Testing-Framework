import OrdersList from '../../components/saas/orders/OrdersList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class OrdersPage {
	constructor() {
		this.ordersList = new OrdersList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async openFirstOrder({ productRequest }) {
		const { requestDetails, workspaceDetails, requesterUserDetails, organizationLocation } = productRequest;

		await this.modulesSideBar.clickOrdersLink();

		await this.ordersList.selectFirstOrder({ requestDetails, workspaceDetails, requesterUserDetails, organizationLocation });
	}

	async openClientFirstOrder({ productRequest }) {
		const { requestDetails, workspaceDetails, clientRequesterUserDetails, organizationLocation } = productRequest;

		await this.modulesSideBar.clickOrdersLink();

		await this.ordersList.selectFirstOrder({
			requestDetails,
			workspaceDetails,
			requesterUserDetails: clientRequesterUserDetails,
			organizationLocation,
		});
	}
}
