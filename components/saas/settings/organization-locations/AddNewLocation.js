import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class AddNewLocation extends GenericElement {
	constructor() {
		super();
		this.addNewLocationButton = '//div[@class="module-settings"]//button[@label= "Create New Location"]';
		this.locationTypeButton = '//button[@data-test-id="%s-button"]';
		this.locationNameInput = '//input[@data-test-id="location-name-input"]';
		this.stateInput = '//input[@data-test-id="province-state-input"]';
		this.cityInput = '//input[@data-test-id="city-input"]';
		this.streetInput = '//input[@data-test-id="street-input"]';
		this.postalCodeInput = '//input[@data-test-id="postal-code-input"]';
		this.countryDropdown = '//p-dropdown[@data-test-id="country-input"]';
		this.countryDropdownItem = '//p-dropdown[@data-test-id="country-input"]//p-dropdownitem/li[.="%s"]';
		this.googleMapsLinkInput = '//input[@data-test-id="maps-link-input"]';
		this.saveButton = '//button[@data-test-id="save-locations-button"]';
	}

	async clickAddNewLocationButton() {
		await this.click(this.addNewLocationButton);
	}

	async clickLocationTypeButton({ type }) {
		await this.click(sprintf(this.locationTypeButton, type.toLowerCase()));
	}

	async fillLocationName({ name }) {
		await this.fill(this.locationNameInput, name);
	}

	async fillState({ state }) {
		await this.fill(this.stateInput, state);
	}

	async fillCity({ city }) {
		await this.fill(this.cityInput, city);
	}

	async fillStreet({ street }) {
		await this.fill(this.streetInput, street);
	}

	async fillPostalCode({ postalCode }) {
		await this.fill(this.postalCodeInput, postalCode.toString());
	}

	async selectCountry({ country }) {
		await this.click(this.countryDropdown);
		await this.click(sprintf(this.countryDropdownItem, country));
	}

	async fillGoogleMapsLink({ googleMapsLink }) {
		await this.fill(this.googleMapsLinkInput, googleMapsLink);
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async submit({ organizationDetails }) {
		const { organizationLocation } = organizationDetails;
		const { type, name, state, city, street, postalCode, country, googleMapsLink } = organizationLocation;

		await this.clickAddNewLocationButton();
		await this.clickLocationTypeButton({ type });
		await this.fillLocationName({ name });
		await this.fillState({ state });
		await this.fillCity({ city });
		await this.fillStreet({ street });
		await this.fillPostalCode({ postalCode });
		await this.selectCountry({ country });
		await this.fillGoogleMapsLink({ googleMapsLink });
		await this.clickSaveButton();
	}
}
