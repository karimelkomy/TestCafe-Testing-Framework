import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RequestInfo extends GenericElement {
	constructor() {
		super();
		this.requestTitleInput = '//input[@data-test-id="request-title-input"]';
		this.requestPriorityButton = '//p-radiobutton[.="%s"]//div[@role="radio"]';
		this.selectWorkspaceDropdown = '//p-dropdown[@data-test-id="select-workspace-dropdown"]';
		this.deliveryToDropdown = '//span[./label[text()="DELIVERY TO"]]';
		this.dropdownItemXP = '//li[.//*[text()="%s"]]';
		this.remarkInput = '//p-editor[@data-test-id="comments-input"]//div[contains(@class, "ql-blank")]';
		this.continueButton = '//button[@data-test-id="continue-button"]';
	}

	async fillRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.fill(this.requestTitleInput, requestTitle);
	}

	async selectRequestPriority({ requestDetails }) {
		const { requestPriority } = requestDetails;

		if (requestPriority) {
			await this.click(sprintf(this.requestPriorityButton, requestPriority));
		}
	}

	async selectWorkspace({ details }) {
		await this.click(this.selectWorkspaceDropdown);
		await this.click(sprintf(this.dropdownItemXP, details.name));
	}

	async selectDeliveryTo({ locationDetails }) {
		await this.click(this.deliveryToDropdown);
		await this.click(sprintf(this.dropdownItemXP, locationDetails.name));
	}

	async fillRemark({ requestDetails }) {
		const { requestInfoRemark } = requestDetails;

		if (requestInfoRemark) {
			await this.fill(this.remarkInput, requestInfoRemark);
		}
	}

	async clickContinueButton() {
		await this.click(this.continueButton);
	}

	async submit({ productRequest }) {
		const { workspaceDetails, organizationLocation, requestDetails } = productRequest;
		const { details, location } = workspaceDetails;
		const locationDetails = organizationLocation || location;

		// TODO: add attachement
		await this.fillRequestTitle({ requestDetails });
		await this.selectRequestPriority({ requestDetails });
		await this.selectWorkspace({ details });
		await this.selectDeliveryTo({ locationDetails });
		await this.fillRemark({ requestDetails });
		await this.clickContinueButton();
	}
}
