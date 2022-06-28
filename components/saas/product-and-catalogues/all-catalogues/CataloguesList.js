import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class CataloguesList extends GenericElement {
	constructor() {
		super();
		this.catalogueItem = '//penny-catalogs-list//div[contains(@class, "p-card-content")][.//div[text()=" %s "]]';
	}

	async selectCatalogue({ catalogueDetails }) {
		const { catalogueName } = catalogueDetails;

		await this.click(sprintf(this.catalogueItem, catalogueName));
	}
}
