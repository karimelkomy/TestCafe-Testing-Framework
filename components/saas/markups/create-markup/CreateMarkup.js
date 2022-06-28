import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumberWithoutComma } from '../../../../utilities/helpers';

export default class CreateMarkup extends GenericElement {
	constructor() {
		super();
		this.markupNameInput = '//input[@data-test-id="markup-name-input"]';
		this.markupValueInput = '//p-inputnumber[@id="markup-value"]//input';
		this.markupValueTypeInput = '//p-radiobutton[@data-test-id="markup-value-%s"]';
		this.selectCatalogDropdown = '//span[./label[text()="Select Catalog (Optional)"]]//p-dropdown';
		this.selectCatalogDropdownItem = '//p-dropdownitem/li[.="%s"]';
		this.saveButton = '//button[@data-test-id="save-button"]';
	}

	async fillMarkupName({ markupDetails }) {
		const { markupName } = markupDetails;

		await this.fill(this.markupNameInput, markupName);
	}

	async fillMarkupValue({ markupDetails }) {
		const { markupValue } = markupDetails;

		await this.fill(this.markupValueInput, formatedNumberWithoutComma(markupValue, 0)); // BUG: markup value got cleared by entering two decimal numbers
	}

	async selectMarkupValueType({ markupDetails }) {
		const { markupValueType } = markupDetails;

		await this.click(sprintf(this.markupValueTypeInput, markupValueType));
	}

	async selectcatalog({ markupDetails }) {
		const { catalog } = markupDetails;

		await this.click(this.selectCatalogDropdown);
		await this.click(sprintf(this.selectCatalogDropdownItem, catalog));
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async submit({ markupDetails }) {
		await this.fillMarkupName({ markupDetails });
		await this.fillMarkupValue({ markupDetails });
		await this.selectMarkupValueType({ markupDetails });
		await this.selectcatalog({ markupDetails });
		await this.clickSaveButton();
	}
}
