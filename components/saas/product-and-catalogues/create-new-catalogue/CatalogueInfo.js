import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class CatalogueInfo extends GenericElement {
	constructor() {
		super();
		this.catalogNameInput = '//penny-catalog-info//input[@data-test-id="catalogue-name-input"]';
		this.catalogDescriptionInput = '//penny-catalog-info//input[@data-test-id="description-input"]';
		this.uploadImageInput = '//input[@data-test-id="choose-image-input"]';
		this.saveAndContinueButton = '//penny-catalog-info//button[@data-test-id="save-and-continue-button"]';
	}

	async fillCatalogName({ catalogueName }) {
		await this.fill(this.catalogNameInput, catalogueName);
	}

	async fillCatalogDescription({ description }) {
		await this.fill(this.catalogDescriptionInput, description);
	}

	async uploadCatalogImage() {
		await this.uploadFile(imagePath.catalog, this.uploadImageInput);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submitCatalogueInfo({ catalogueDetails }) {
		const { catalogueName, description } = catalogueDetails;

		await this.fillCatalogDescription({ description });
		await this.fillCatalogName({ catalogueName });
		await this.uploadCatalogImage();
		await this.clickSaveAndContinueButton();
	}
}
