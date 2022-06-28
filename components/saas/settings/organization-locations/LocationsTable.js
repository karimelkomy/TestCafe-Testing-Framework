import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class LocationsTable extends GenericElement {
	constructor() {
		super();
		this.locationTypeText = '//penny-settings-org-locations//div[text()=" %s "]';
		this.locationNameText = '//penny-settings-org-locations//div[text()="%s"]';
		this.addressDetailsText = '//penny-settings-org-locations//span[contains(@class, "address-card") and text()="%s "]';
	}

	async validateLocationType({ type }) {
		await this.validateElementVisibility(sprintf(this.locationTypeText, type));
	}

	async validateLocationName({ name }) {
		await this.validateElementVisibility(sprintf(this.locationNameText, name));
	}

	async validateState({ state }) {
		await this.validateElementVisibility(sprintf(this.addressDetailsText, state));
	}

	async validateCity({ city }) {
		await this.validateElementVisibility(sprintf(this.addressDetailsText, city));
	}

	async validateStreet({ street }) {
		await this.validateElementVisibility(sprintf(this.addressDetailsText, street));
	}

	async validateCountry({ country }) {
		await this.validateElementVisibility(sprintf(this.addressDetailsText, country));
	}

	async validate({ organizationDetails }) {
		const { organizationLocation } = organizationDetails;
		const { type, name, state, city, street, country } = organizationLocation;

		await this.validateLocationType({ type });
		await this.validateLocationName({ name });
		await this.validateState({ state });
		await this.validateCity({ city });
		await this.validateStreet({ street });
		await this.validateCountry({ country });
	}
}
