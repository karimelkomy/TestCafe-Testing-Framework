import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class BillsList extends GenericElement {
	constructor() {
		super();
		this.requestTitleText = '//div[@row-index="0"]/div[@col-id="requestTitle"]//span[text()="%s"]';
		this.requestorNameText = '//div[@row-index="0"]/div[@col-id="requestor"]//span[text()="%s"]';
		this.workspaceNameText = '//div[@row-index="0"]/div[@col-id="workspace"]//span[text()="%s"]';
		this.vendorNameText = '//div[@row-index="0"]/div[@col-id="vendor"]//span[text()="%s"]';
		this.firstSubmittedGrnsButton = '//div[@row-index="0"]/div[@col-id="grnId"]//button';
		this.firstPendingBillButton = '//div[@row-index="0"]/div[@col-id="pendingBillId"]//button';
		this.grnsButton = '//button[contains(., "GRNs (")]';
		this.billsButton = '//button[contains(., "Bills  (")]';
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateRequestorFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async validateWorkspaceName({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceNameText, details.name));
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validatePayeeFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async validateClientVendorName({ organizationDetails }) {
		const { orgName } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, orgName));
	}

	async validateFirstSubmittedGrns({ requestDetails, requesterUserDetails, workspaceDetails, vendorDetails }) {
		await this.validateRequestTitle({ requestDetails });
		await this.validateRequestorFirstName({ requesterUserDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateVendorName({ vendorDetails });
	}

	async validateFirstPendingBill({ reimbursementDetails, requesterUserDetails, workspaceDetails }) {
		await this.validateRequestTitle({ requestDetails: reimbursementDetails });
		await this.validateRequestorFirstName({ requesterUserDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validatePayeeFirstName({ requesterUserDetails });
	}

	async validateClientFirstPendingBill({ requestDetails, clientRequesterUserDetails, workspaceDetails, organizationDetails }) {
		await this.validateRequestTitle({ requestDetails });
		await this.validateRequestorFirstName({ requesterUserDetails: clientRequesterUserDetails });
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateClientVendorName({ organizationDetails });
	}

	async clickFirstSubmittedGrnsButton() {
		await this.click(this.firstSubmittedGrnsButton);
	}

	async clickFirstPendingBillButton() {
		await this.click(this.firstPendingBillButton);
	}

	async selectFirstSubmittedGrns({ productRequest }) {
		const { requestDetails, requesterUserDetails, workspaceDetails, vendorDetails } = productRequest;

		await this.validateFirstSubmittedGrns({ requestDetails, requesterUserDetails, workspaceDetails, vendorDetails });
		await this.clickFirstSubmittedGrnsButton();
	}

	async selectFirstPendingBill({ reimbursementRequest }) {
		const { reimbursementDetails, requesterUserDetails, workspaceDetails } = reimbursementRequest;

		await this.validateFirstPendingBill({ reimbursementDetails, requesterUserDetails, workspaceDetails });
		await this.clickFirstPendingBillButton();
	}

	async selectClientFirstPendingBill({ productRequest }) {
		const { requestDetails, clientRequesterUserDetails, workspaceDetails, organizationDetails } = productRequest;

		await this.validateClientFirstPendingBill({ requestDetails, clientRequesterUserDetails, workspaceDetails, organizationDetails });
		await this.clickFirstPendingBillButton();
	}

	async clickGrnsButton() {
		await this.click(this.grnsButton);
		await this.wait(2);
	}

	async clickBillsButton() {
		await this.click(this.billsButton);
		await this.wait(2);
	}
}
