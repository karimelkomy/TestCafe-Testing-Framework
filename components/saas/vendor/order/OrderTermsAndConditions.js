import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class OrderTermsAndConditions extends GenericElement {
	constructor() {
		super();
		this.termsAndConditionsButton = '//div[./h2[@data-test-id="terms-and-conditions-label"]]/button';
		this.termsAndConditionsPopupTitle = '//p-dialog//span[text()="%s"]';
		this.termsAndConditionsPopupDescription = '//p-dialog//div[contains(@class, "p-dialog-content")]/div[contains(., "%s")]';
		this.termsAndConditionsPopupCloseButton = '//p-dialog//button';
	}

	async openTermsAndConditionsPopup() {
		await this.click(this.termsAndConditionsButton);
	}

	async validateTermsAndConditionsText({ orderDetails }) {
		const { termsAndConditions } = orderDetails;

		await this.validateElementVisibility(sprintf(this.termsAndConditionsPopupTitle, termsAndConditions.name));
		await this.validateElementVisibility(sprintf(this.termsAndConditionsPopupDescription, termsAndConditions.description));
	}

	async closeTermsAndConditionsPopup() {
		await this.click(this.termsAndConditionsPopupCloseButton);
	}

	async validateTermsAndConditions({ productRequest }) {
		const { orderDetails } = productRequest;

		await this.openTermsAndConditionsPopup();
		await this.validateTermsAndConditionsText({ orderDetails });
		await this.closeTermsAndConditionsPopup();
	}
}
