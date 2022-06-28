import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class GdnsForOrder extends GenericElement {
	constructor() {
		super();
		this.requestTitleText = '//td[@data-test-id="request-title-text" and text()=" %s "]';
		this.workspaceNameText = '//td[@data-test-id="workspace-text" and text()=" %s "]';
		this.requestorNameText = '//penny-profile-badge//span[text()="%s"]';
		this.selectAllCheckbox = '//penny-invoice-create//p-tableheadercheckbox';
		this.createInvoiceButton = '//button[@data-test-id="create-invoice-button"]';
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateWorkspaceName({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceNameText, details.name));
	}

	async validateRequestorFirstName({ clientRequesterUserDetails }) {
		const { firstName } = clientRequesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async clickSelectAllCheckbox() {
		await this.click(this.selectAllCheckbox);
	}

	async clickCreateInvoiceButton() {
		await this.click(this.createInvoiceButton);
	}

	async submit({ productRequest }) {
		const { requestDetails, workspaceDetails, clientRequesterUserDetails } = productRequest;

		await this.validateRequestTitle({ requestDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateRequestorFirstName({ clientRequesterUserDetails });
		await this.clickSelectAllCheckbox();
		await this.clickCreateInvoiceButton();
	}
}
