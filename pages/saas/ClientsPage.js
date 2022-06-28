import CreateClient from '../../components/saas/clients/create-client/CreateClient';
import ClientsList from '../../components/saas/clients/ClientsList';
import ClientOverview from '../../components/saas/clients/create-client/ClientOverview';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class ClientsPage {
	constructor() {
		this.modulesSideBar = new ModulesSideBar();
		this.createClient = new CreateClient();
		this.clientsList = new ClientsList();
		this.clientOverview = new ClientOverview();
	}

	async createClients({ clientsDetails }) {
		for (let clientDetails of clientsDetails) {
			await this.modulesSideBar.clickClientsLink();
			await this.clientsList.clickCreateNewClientButton();
			await this.createClient.submit({ clientDetails });
			await this.clientsList.clickClientIdButton({ clientDetails });
			await this.clientOverview.validateClientsOverview({ clientDetails });
		}
	}
}
