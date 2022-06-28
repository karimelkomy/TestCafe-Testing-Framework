import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class ProductMedia extends GenericElement {
	constructor() {
		super();
		this.uploadImageInput = '(//div[contains(@class, "add-media-section")])[1]//input';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async uploadProductImage() {
		await this.uploadFile(imagePath.product, this.uploadImageInput);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submitProductMedia() {
		// TODO: add product attachement

		await this.uploadProductImage();
		await this.clickSaveAndContinueButton();
	}
}
