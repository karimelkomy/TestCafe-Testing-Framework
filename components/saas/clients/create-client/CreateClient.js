import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumberWithoutComma, scrollBy } from '../../../../utilities/helpers';

export default class CreateClient extends GenericElement {
	constructor() {
		super();
		this.clientNameInput = '//input[@data-test-id="official-name-input"]';
		this.clientRegistrationNumberInput = '//input[@data-test-id="client-registration-no-input"]';
		this.clientTaxCertificationNumberInput = '//input[@data-test-id="client-tax-certification-no-input"]';
		this.contactFirstNameInput = '//input[@data-test-id="contact-first-name-input"]';
		this.contactLastNameInput = '//input[@data-test-id="contact-last-name-input"]';
		this.administrationEmailInput = '//input[@data-test-id="administration-email-input"]';
		this.phoneInput = '//input[@data-test-id="phone-input"]';
		this.buildingNumberInput = '//input[@data-test-id="building-input"]';
		this.additionalNumberInput = '//span[./label[text()="Additional Number"]]//input[@data-test-id="additional-number-input"]';
		this.unitNumberInput = '//span[./label[text()="Unit No."]]//input[@data-test-id="additional-number-input"]';
		this.streetInput = '//input[@data-test-id="street-input"]';
		this.districtInput = '//span[./label[text()="District"]] //input[@data-test-id="city-input"]';
		this.cityInput = '//span[./label[text()="City"]] //input[@data-test-id="city-input"]';
		this.stateInput = '//input[@data-test-id="state-input"]';
		this.postalCodeInput = '//input[@data-test-id="postal-code-input"]';
		this.googleMapsLinkInput = '//input[@data-test-id="google-maps-link-input"]';
		this.countryDropdown = '//*[@data-test-id="country-dropdown" and .="%s"]';
		this.currencyDropdown = '//*[@data-test-id="currency-dropdown" and .="%s"]';
		this.addClientButton = '//button[@data-test-id="add-client-button"]';
	}

	async fillClientName({ clientDetails }) {
		const { clientName } = clientDetails;

		await this.fill(this.clientNameInput, clientName);
	}

	async fillClientRegistrationNumber({ clientDetails }) {
		const { registrationNumber } = clientDetails;

		await this.fill(this.clientRegistrationNumberInput, formatedNumberWithoutComma(registrationNumber, 0));
	}

	async fillClientTaxCertificationNumber({ clientDetails }) {
		const { taxCertificationNumber } = clientDetails;

		await this.fill(this.clientTaxCertificationNumberInput, formatedNumberWithoutComma(taxCertificationNumber, 0));
	}

	async fillContactFirstName({ clientDetails }) {
		const { firstName } = clientDetails;

		await this.fill(this.contactFirstNameInput, firstName);
	}

	async fillContactLastName({ clientDetails }) {
		const { lastName } = clientDetails;

		await this.fill(this.contactLastNameInput, lastName);
	}

	async fillAdministrationEmail({ clientDetails }) {
		const { email } = clientDetails;

		await this.fill(this.administrationEmailInput, email);
	}

	async fillPhone({ clientDetails }) {
		const { phone } = clientDetails;

		await this.fill(this.phoneInput, phone);
	}

	async fillBuildingNumber({ clientDetails }) {
		const { buildingNumber } = clientDetails;

		await this.fill(this.buildingNumberInput, formatedNumberWithoutComma(buildingNumber, 0));
	}

	async fillAdditionalNumber({ clientDetails }) {
		const { additionalNumber } = clientDetails;

		await this.fill(this.additionalNumberInput, formatedNumberWithoutComma(additionalNumber, 0));
	}

	async fillUnitNumber({ clientDetails }) {
		const { unitNumber } = clientDetails;

		await this.fill(this.unitNumberInput, formatedNumberWithoutComma(unitNumber, 0));
	}

	async fillStreet({ clientDetails }) {
		const { street } = clientDetails;

		await this.fill(this.streetInput, street);
	}

	async fillCity({ clientDetails }) {
		const { city } = clientDetails;

		await this.fill(this.cityInput, city);
	}

	async fillDistrict({ clientDetails }) {
		const { district } = clientDetails;

		await this.fill(this.districtInput, district);
	}

	async fillState({ clientDetails }) {
		const { state } = clientDetails;

		await this.fill(this.stateInput, state);
	}

	async fillPostalCode({ clientDetails }) {
		const { postalCode } = clientDetails;

		await this.fill(this.postalCodeInput, postalCode);
	}

	async fillGoogleMapsLink({ clientDetails }) {
		const { googleMapsLink } = clientDetails;

		await this.fill(this.googleMapsLinkInput, googleMapsLink);
	}

	async fillDetails({ clientDetails }) {
		await this.fillClientName({ clientDetails });
		await this.fillClientRegistrationNumber({ clientDetails });
		await this.fillClientTaxCertificationNumber({ clientDetails });
		await this.fillContactFirstName({ clientDetails });
		await this.fillContactLastName({ clientDetails });
		await this.fillAdministrationEmail({ clientDetails });
		await this.fillPhone({ clientDetails });
		await this.fillBuildingNumber({ clientDetails });
		await this.fillAdditionalNumber({ clientDetails });
		await this.fillUnitNumber({ clientDetails });
		await this.fillStreet({ clientDetails });
		await this.fillCity({ clientDetails });
		await this.fillDistrict({ clientDetails });
		await this.fillState({ clientDetails });
		await this.fillPostalCode({ clientDetails });
		await this.fillGoogleMapsLink({ clientDetails });
	}

	async validateCountry({ clientDetails }) {
		const { country } = clientDetails;

		await this.validateElementVisibility(sprintf(this.countryDropdown, country));
	}

	async validateCurrency({ clientDetails }) {
		const { currency } = clientDetails;

		await this.validateElementVisibility(sprintf(this.currencyDropdown, currency));
	}

	async validateDetails({ clientDetails }) {
		await this.validateCountry({ clientDetails });
		await this.validateCurrency({ clientDetails });
	}

	async clickAddClientButton() {
		await this.click(this.addClientButton);
	}

	async scrollDown() {
		await scrollBy(0, 2000);
	}

	async submit({ clientDetails }) {
		await this.fillDetails({ clientDetails });
		await this.validateDetails({ clientDetails });

		await this.scrollDown(); // TODO: temp solution for scrolling

		await this.clickAddClientButton();
	}
}
