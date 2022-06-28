import GenericElement from '../../../shared/core/GenericElement';
import { getNumberFromText } from '../../../../utilities/helpers';

export default class RequestSuccess extends GenericElement {
	constructor() {
		super();
		this.successRequestMessage = '//penny-request-success//h4[@data-test-id="well-done-message"]';
		this.requestIdText = '//penny-request-success//span[contains(text(), "#")]';
	}

	async validateRequestSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successRequestMessage);
	}

	async getRequestId() {
		const requestText = await this.getText(this.requestIdText);

		return getNumberFromText(requestText);
	}

	async submit() {
		await this.validateRequestSubmittedSuccessfully();

		const createdRequestId = await this.getRequestId();

		return createdRequestId;
	}
}
