import PaymentsList from '../../components/saas/payments/PaymentsList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class PaymentsPage {
	constructor() {
		this.paymentsList = new PaymentsList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async openPayment({ request }) {
		const { billId, workspaceDetails, vendorDetails, requesterUserDetails } = request;

		await this.modulesSideBar.clickPaymentsLink();

		await this.paymentsList.validatePayment({ workspaceDetails, vendorDetails, requesterUserDetails });
		await this.paymentsList.openPayment({ billId });
	}

	async openClientPayment({ request }) {
		const { clientBillId, workspaceDetails, organizationDetails } = request;

		await this.modulesSideBar.clickPaymentsLink();

		await this.paymentsList.validateClientPayment({ workspaceDetails, organizationDetails });
		await this.paymentsList.openPayment({ billId: clientBillId });
	}
}
