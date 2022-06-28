import { t } from 'testcafe';
import { getCurrentUrl } from '../../utilities/helpers';
import { urls } from '../../data/saas/constants/urls';
import CreateRequest from '../../components/saas/requests/CreateRequest';
import RequestsList from '../../components/saas/requests/RequestsList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class RequestsPage {
	constructor() {
		this.createRequest = new CreateRequest();
		this.requestsList = new RequestsList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async createProductRequest() {
		await this.modulesSideBar.clickRequestsLink();

		await this.createRequest.productAndServiceRequest();
	}

	async createReimbursementRequest() {
		await this.modulesSideBar.clickRequestsLink();

		await this.createRequest.reimbursementRequest();
	}

	async openRequestById({ productRequest }) {
		await this.modulesSideBar.clickRequestsLink();

		await this.requestsList.openRequest({ productRequest });
	}
}
