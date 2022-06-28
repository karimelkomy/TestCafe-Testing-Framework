import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import GrnSidebar from './GrnSidebar';
import VendorPopup from './VendorPopup';

export default class GrnsForOrder extends GenericElement {
	constructor() {
		super();
		this.grnSidebar = new GrnSidebar();
		this.vendorPopup = new VendorPopup();
		this.orderIdText = '//penny-bill-create//button[./mat-icon[contains(@class, "icon-orders")]]/span[text()="%s"]';
		this.requestTitleText = '//penny-bill-create//td[@data-test-id="request-title-text" and text()=" %s "]';
		this.workspaceText = '//penny-bill-create//td[@data-test-id="workspace-text" and text()=" %s "]';
		this.requestorNameText = '//penny-bill-create//penny-profile-badge//span[text()="%s"]';
		this.grnLink = '//a[@data-test-id="grn-link"]';
		this.selectAllCheckbox = '//penny-bill-create//p-tableheadercheckbox';
		this.createBillButton = '//button[@data-test-id="create-bill-button"]';
	}

	async validateOrderId({ orderId }) {
		await this.validateElementVisibility(sprintf(this.orderIdText, orderId));
	}

	async clickGrnLink() {
		await this.click(this.grnLink);
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateWorkspace({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceText, details.name));
	}

	async validateRequestorName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.requestorNameText, firstName));
	}

	async validate({ orderId, vendorDetails, workspaceDetails, requestDetails, productsDetails, requesterUserDetails }) {
		await this.validateOrderId({ orderId });
		await this.vendorPopup.validate({ vendorDetails });
		await this.clickGrnLink();
		await this.grnSidebar.submit({ requestDetails, productsDetails });
		await this.validateRequestTitle({ requestDetails });
		await this.validateWorkspace({ workspaceDetails });
		await this.validateRequestorName({ requesterUserDetails });
	}

	async clickSelectAllCheckbox() {
		await this.click(this.selectAllCheckbox);
	}

	async clickCreateBillButton() {
		await this.click(this.createBillButton);
	}

	async submit({ orderId, vendorDetails, workspaceDetails, requestDetails, productsDetails, requesterUserDetails }) {
		await this.validate({ orderId, vendorDetails, workspaceDetails, requestDetails, productsDetails, requesterUserDetails });
		await this.clickSelectAllCheckbox();
		await this.clickCreateBillButton();
	}
}
