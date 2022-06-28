import GenericElement from '../../shared/core/GenericElement';

export default class OrdersNavigationBar extends GenericElement {
	constructor() {
		super();
		this.ordersTab = '//button[contains(., "Orders")]';
		this.contractsTab = '//button[contains(., "Contracts")]';
		this.approvedOffersTab = '//button[contains(., "Approved Offers")]';
	}

	async openOrdersTab() {
		await this.click(this.ordersTab);
	}

	async openContractsTab() {
		await this.click(this.contractsTab);
	}

	async openApprovedOffersTab() {
		await this.click(this.approvedOffersTab);
	}
}
