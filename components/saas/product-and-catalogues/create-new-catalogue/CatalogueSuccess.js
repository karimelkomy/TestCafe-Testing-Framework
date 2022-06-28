import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class CatalogueSuccess extends GenericElement {
	constructor() {
		super();
		this.wellDoneMessage = '//h4[@data-test-id="well-done-message"]';
		this.createdCatalogueText = '//a[@data-test-id="catalog-name-text" and text()=" %s "]';
	}

	async validateSuccessMessage() {
		await this.validateElementVisibility(this.wellDoneMessage);
	}

	async validateCatalogueName({ catalogueDetails }) {
		const { catalogueName } = catalogueDetails;

		await this.validateElementVisibility(sprintf(this.createdCatalogueText, catalogueName));
	}

	async validateCatalogueSuccess({ catalogueDetails }) {
		await this.validateSuccessMessage();
		await this.validateCatalogueName({ catalogueDetails });
	}
}
