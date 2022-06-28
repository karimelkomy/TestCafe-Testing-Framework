import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class TermsAndConditionsSidebar extends GenericElement {
	constructor() {
		super();
		this.selectTermsAndConditionsButton = '//button[@data-test-id="change-terms-and-conditions-button"]';
		this.selectButton = '//p-sidebar//tr[./td[text()="%s"]]//button[@data-test-id="select-button"]';
		this.previewButton = '//p-sidebar//tr[./td[text()="%s"]]//button[@data-test-id="preview-button"]';
		this.selectedTermsAndConditions = '//p-sidebar//div[contains(@class, "text-title")]/span[text()="%s"]';
		this.doneButton = '//p-sidebar//button[@data-test-id="done-button"]';
		this.viewTermsAndConditionsButton = '//button[@data-test-id="view-terms-and-conditions-button"]';
		this.termsAndConditionsPopupTitle = '//p-dialog//span[text()="%s"]';
		this.termsAndConditionsPopupDescription = '//p-dialog//div[contains(@class, "p-dialog-content")]/div[contains(., "%s")]';
		this.termsAndConditionsPopupCloseButton = '//p-dialog//button';
	}

	async clickSelectTermsAndConditionsButton() {
		await this.click(this.selectTermsAndConditionsButton);
	}

	async clickSelectButton({ termsAndConditions }) {
		const { name } = termsAndConditions;

		await this.click(sprintf(this.selectButton, name));
	}

	async clickPreviewButton({ termsAndConditions }) {
		const { name } = termsAndConditions;

		await this.click(sprintf(this.previewButton, name));
	}

	async clickDoneButton() {
		await this.click(this.doneButton);
	}

	async clickViewTermsAndConditionsButton() {
		await this.click(this.viewTermsAndConditionsButton);
	}

	async validatedSelectedTermsAndConditions({ termsAndConditions }) {
		const { name } = termsAndConditions;

		await this.validateElementVisibility(sprintf(this.selectedTermsAndConditions, name));
	}

	async validateTermsAndConditions({ termsAndConditions }) {
		const { name, description } = termsAndConditions;

		await this.validateElementVisibility(sprintf(this.termsAndConditionsPopupTitle, name));
		await this.validateElementVisibility(sprintf(this.termsAndConditionsPopupDescription, description));
	}

	async closeTermsAndConditionsPopup() {
		await this.click(this.termsAndConditionsPopupCloseButton);
	}

	async selectTermsAndConditions({ orderDetails }) {
		const { termsAndConditions } = orderDetails;

		await this.clickSelectTermsAndConditionsButton();

		await this.clickPreviewButton({ termsAndConditions });
		await this.validateTermsAndConditions({ termsAndConditions });
		await this.closeTermsAndConditionsPopup();

		await this.clickSelectButton({ termsAndConditions });
		await this.validatedSelectedTermsAndConditions({ termsAndConditions });
		await this.clickDoneButton();

		await this.clickViewTermsAndConditionsButton();
		await this.validateTermsAndConditions({ termsAndConditions });
		await this.closeTermsAndConditionsPopup();
	}
}
