import GenericElement from '../../shared/core/GenericElement';

export default class CataloguesBox extends GenericElement {
	constructor() {
		super();
		this.createCatalogueButton = '//button[@data-test-id="create-catalogue-button"]';
		this.showAllCataloguesButton = '//button[@data-test-id="show-all-catalogues-button"]';
	}

	async clickCreateCatalogueButton() {
		await this.click(this.createCatalogueButton);
	}

	async clickShowAllCataloguesButton() {
		await this.click(this.showAllCataloguesButton);
	}
}
