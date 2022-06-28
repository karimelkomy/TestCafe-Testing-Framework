import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { waitElementVisibility } from '../../../../utilities/helpers';

export default class AddLocation extends GenericElement {
	constructor() {
		super();
		this.addLocationCircleButton = '//li[.//span[text()="Add Location"] and @aria-selected="true"]';
		this.addNewLocationButton = '//penny-workspace-location//button[@data-test-id="add-new-location-button"]';
		this.locationTypeButton = '//button[@data-test-id="%s-button"]';
		this.locationNameInput = '//input[@data-test-id="location-name-input"]';
		this.countryDropdown = '//p-dropdown[@data-test-id="country-input"]';
		this.countryDropdownItem = '//p-dropdown[@data-test-id="country-input"]//p-dropdownitem/li[.="%s"]';
		this.stateInput = '//input[@data-test-id="province-state-input"]';
		this.cityInput = '//input[@data-test-id="city-input"]';
		this.streetInput = '//input[@data-test-id="street-input"]';
		this.postalCodeInput = '//input[@data-test-id="postal-code-input"]';
		this.googleMapsLinkInput = '//input[@data-test-id="maps-link-input"]';
		this.continueButton = '//button[@data-test-id="continue-button"]';
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

	async selectCountry({ country }) {
		await this.click(this.countryDropdown);
		await this.click(sprintf(this.countryDropdownItem, country));
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

	async fillGoogleMapsLink({ googleMapsLink }) {
		await this.fill(this.googleMapsLinkInput, googleMapsLink);
	}

	async clickContinueButton() {
		await this.click(this.continueButton);
	}

	async submitLocation({ workspaceDetails }) {
		const { location } = workspaceDetails;
		const { type, name, country, state, city, street, postalCode, googleMapsLink } = location;

		await waitElementVisibility(this.addLocationCircleButton);

		await this.clickAddNewLocationButton();
		await this.clickLocationTypeButton({ type });
		await this.fillLocationName({ name });
		await this.selectCountry({ country });
		await this.fillState({ state });
		await this.fillCity({ city });
		await this.fillStreet({ street });
		await this.fillPostalCode({ postalCode });
		await this.fillGoogleMapsLink({ googleMapsLink });
		await this.clickContinueButton();
	}
}
