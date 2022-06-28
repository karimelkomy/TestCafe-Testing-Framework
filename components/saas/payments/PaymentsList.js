import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class PaymentsList extends GenericElement {
	constructor() {
		super();
		this.paymentButton = '//div[@row-index="0"]//button[contains(., "%s")]';
		this.workspaceNameText = '//div[@row-index="0"]/div[@col-id="workspace"]//span[text()="%s"]';
		this.vendorNameText = '//div[@row-index="0"]/div[@col-id="vendor"]//span[text()="%s"]';
		this.paymentCheckbox = '//tr[@data-test-id="bill-row"][.//a[@data-test-id="bill-link" and .="#%s"]]//p-checkbox';
		this.billChip = '//p-chips//li[contains(text(), "%s")]';
		this.proceedToPaymentButton = '//div[contains(@class, "display-none")]//button[@data-test-id="proceed-to-payment-button"]';
	}
	async validateWorkspaceName({ workspaceDetails }) {
		if (workspaceDetails) {
			const { details } = workspaceDetails;

			await this.validateElementVisibility(sprintf(this.workspaceNameText, details.name));
		}
	}

	async validateVendorName({ vendorDetails, requesterUserDetails }) {
		const vendorNameValue = vendorDetails ? vendorDetails.vendorName : requesterUserDetails.firstName;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorNameValue));
	}

	async validatePayeeName({ organizationDetails }) {
		const { orgName } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, orgName));
	}

	async validatePayment({ workspaceDetails, vendorDetails, requesterUserDetails }) {
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateVendorName({ vendorDetails, requesterUserDetails });
	}

	async validateClientPayment({ workspaceDetails, organizationDetails }) {
		await this.validateWorkspaceName({ workspaceDetails });
		await this.validatePayeeName({ organizationDetails });
	}

	async selectPayment({ billId }) {
		await this.click(sprintf(this.paymentButton, billId));
	}

	async selectChecbox({ billId }) {
		await this.click(sprintf(this.paymentCheckbox, billId));
	}

	async validateBillChip({ billId }) {
		await this.validateElementVisibility(sprintf(this.billChip, billId));
	}

	async clickProceedToPaymentButton() {
		await this.click(this.proceedToPaymentButton);
	}

	async openPayment({ billId }) {
		await this.selectPayment({ billId });
		await this.selectChecbox({ billId });
		await this.validateBillChip({ billId });
		await this.clickProceedToPaymentButton();
	}
}
