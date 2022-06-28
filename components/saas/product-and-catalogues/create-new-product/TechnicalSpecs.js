import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class TechnicalSpecs extends GenericElement {
	constructor() {
		super();
		this.attributeInput = '//input[@data-test-id="attribute-input"]';
		this.valueInput = '//input[@data-test-id="text-value-input"]';
		this.uomInput = '//input[@data-test-id="uom-input"]';
		this.saveButton = '//button[@data-test-id="save-button"]';
		this.specCard = '//p-card//h2[@data-test-id="spec-card-text" and text()=" %s "]';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async fillAttribute({ attribute }) {
		await this.fill(this.attributeInput, attribute);
	}

	async fillValue({ value }) {
		await this.fill(this.valueInput, value);
	}

	async fillUom({ uom }) {
		await this.fill(this.uomInput, uom);
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async validateSpecCard({ attribute, value, uom }) {
		await this.validateElementVisibility(sprintf(this.specCard, `${attribute} - ${value} - ${uom}`));
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submitTechnicalSpecs({ productDetails }) {
		const { attribute, value, uom } = productDetails;

		await this.fillAttribute({ attribute });
		await this.fillValue({ value });
		await this.fillUom({ uom });
		await this.clickSaveButton();
		await this.validateSpecCard({ attribute, value, uom });
		await this.clickSaveAndContinueButton();
	}
}
