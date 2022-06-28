import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class ProductDetails extends GenericElement {
	constructor() {
		super();
		this.descriptionInput = '//textArea[@data-test-id="description-input"]';
		this.modelInput = '//input[@data-test-id="model-input"]';
		this.brandInput = '//input[@data-test-id="brand-input"]';
		this.countryOfOriginDropdown = '//p-dropdown[@data-test-id="country-of-origin-dropdown"]/div';
		this.countryOfOriginDropdownItem = '//p-dropdownitem[.//span[text()="%s"]]/li';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async fillDescription({ description }) {
		await this.fill(this.descriptionInput, description);
	}

	async fillModel({ model }) {
		await this.fill(this.modelInput, model);
	}

	async fillBrand({ brand }) {
		await this.fill(this.brandInput, brand);
	}

	async selectCountryOfOrigin({ originCountry }) {
		await this.click(this.countryOfOriginDropdown);
		await this.click(sprintf(this.countryOfOriginDropdownItem, originCountry));
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submitProductDetails({ productDetails }) {
		const { description, model, brand, originCountry } = productDetails;

		await this.fillDescription({ description });
		await this.fillModel({ model });
		await this.fillBrand({ brand });
		await this.selectCountryOfOrigin({ originCountry });
		await this.clickSaveAndContinueButton();
	}
}
