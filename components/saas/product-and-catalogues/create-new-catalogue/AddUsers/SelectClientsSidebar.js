import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class SelectClientsSidebar extends GenericElement {
	constructor() {
		super();
		this.element = '//p-sidebar[@data-test-id="clients-sidebar"]';
		this.addButton = `${this.element}//div[@role="row"][.//span[text()="%s"]]//button[.="ADD"]`;
		this.addedClient = `${this.element}//h1[@data-test-id="added-clients-label"]/following-sibling::penny-list-table[1]//span[text()="%s"]`;
		this.doneButton = `${this.element}//button[@data-test-id="done-button"]`;
	}

	async clickAddButton({ clientName }) {
		await this.click(sprintf(this.addButton, clientName));
	}

	async validateAddedClient({ clientName }) {
		await this.validateElementVisibility(sprintf(this.addedClient, clientName));
	}

	async clickDoneButton() {
		await this.click(this.doneButton);
	}

	async submitSidebar({ clientsDetails }) {
		for (const clientDetails of clientsDetails) {
			const { clientName } = clientDetails;

			await this.clickAddButton({ clientName });
			await this.validateAddedClient({ clientName });
		}

		await this.clickDoneButton();
	}
}
