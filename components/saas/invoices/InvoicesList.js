import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class InvoicesList extends GenericElement {
	constructor() {
		super();
		this.requestTitleText = '//div[@row-index="0"]/div[@col-id="requestTitle"]//span[text()="%s"]';
		this.requestorNameText = '//div[@row-index="0"]/div[@col-id="requestor"]//span[text()="%s"]';
		this.customerNameText = '//div[@row-index="0"]/div[@col-id="customer"]//span[text()="%s"]';
		this.workspaceNameText = '//div[@row-index="0"]/div[@col-id="workspace"]//span[text()="%s"]';
		this.vendorNameText = '//div[@row-index="0"]/div[@col-id="vendor"]//span[text()="%s"]';
		this.orgNameText = '//div[@row-index="0"]/div[@col-id="orgName"]//span[text()="%s"]';
		this.firstSubmittedGdnsButton = '//div[@row-index="0"]/div[@col-id="grnId"]//button';
		this.firstPendingInvoiceButton = '//div[@row-index="0"]/div[@col-id="pendingBillId"]//button';
		this.gdnsButton = '//button[contains(., "GDNs (")]';
		this.invoicesButton = '//button[contains(., "Invoices (")]';
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateRequestorFirstName({ clientRequesterUserDetails }) {
		const { firstName } = clientRequesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async validateCustomerFirstName({ clientRequesterUserDetails }) {
		const { firstName } = clientRequesterUserDetails;

		await this.validateElementVisibility(sprintf(this.customerNameText, firstName));
	}

	async validateWorkspaceName({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceNameText, details.name));
	}

	async validatePayeeName({ organizationDetails }) {
		const { orgName } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, orgName));
	}

	async validateOrgName({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.orgNameText, details.name));
	}

	async validateGdn({ productRequest }) {
		const { requestDetails, clientRequesterUserDetails, workspaceDetails, organizationDetails } = productRequest;

		await this.validateRequestTitle({ requestDetails });
		await this.validateRequestorFirstName({ clientRequesterUserDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validatePayeeName({ organizationDetails });
	}

	async validateInvoice({ productRequest }) {
		const { requestDetails, clientRequesterUserDetails, workspaceDetails } = productRequest;

		await this.validateRequestTitle({ requestDetails });
		await this.validateOrgName({ workspaceDetails });
		await this.validateCustomerFirstName({ clientRequesterUserDetails });
	}

	async clickFirstSubmittedGdnsButton() {
		await this.wait(2);
		await this.click(this.firstSubmittedGdnsButton);
	}

	async selectFirstSubmittedGdns({ productRequest }) {
		await this.validateGdn({ productRequest });
		await this.clickFirstSubmittedGdnsButton();
	}

	async clickFirstSubmittedInvoiceButton() {
		await this.wait(2);
		await this.click(this.firstPendingInvoiceButton);
	}

	async selectFirstPendingInvoice({ productRequest }) {
		await this.validateInvoice({ productRequest });
		await this.clickFirstSubmittedInvoiceButton();
	}

	async clickGdnsButton() {
		await this.click(this.gdnsButton);
		await this.wait(2);
	}

	async clickInvoicesButton() {
		await this.click(this.invoicesButton);
		await this.wait(2);
	}
}
