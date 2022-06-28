import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class CatalogsSidebar extends GenericElement {
	constructor() {
		super();
		this.addCatalogsButton = '//p-sidebar//div[@role="row"][.//span[text()="%s"]]//button[.="ADD"]';
		this.catalogsChip = '//p-sidebar//p-chips//li[contains(text(), "%s")]';
		this.confirmButton = '//penny-product-info//button[@data-test-id="confirm-button"]';
	}

	async clickAddCatalogsButton({ catalogueName }) {
		await this.click(sprintf(this.addCatalogsButton, catalogueName));
	}

	async clickConfirmButton() {
		await this.click(this.confirmButton);
	}

	async validateCatalogChip({ catalogueName }) {
		await this.validateElementVisibility(sprintf(this.catalogsChip, catalogueName));
	}

	async select({ catalogueDetails }) {
		const { catalogueName } = catalogueDetails;

		await this.clickAddCatalogsButton({ catalogueName });
		await this.validateCatalogChip({ catalogueName });
		await this.clickConfirmButton();
	}
}
