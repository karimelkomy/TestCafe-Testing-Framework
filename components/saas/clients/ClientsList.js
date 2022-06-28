import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class ClientsList extends GenericElement {
	constructor() {
		super();
		this.createNewClientButton = '//button[@data-test-id="create-new-client-button"]';
		this.clientIdButton = '//div[./div[@col-id="email" and .="%s"]]/div[@col-id="clientId"]//button';
	}

	async clickCreateNewClientButton() {
		await this.click(this.createNewClientButton);
	}

	async clickClientIdButton({ clientDetails }) {
		const { email } = clientDetails;

		await this.wait(2); // TODO: to be removed after module stability
		await this.click(sprintf(this.clientIdButton, email));
	}
}
