import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { formatedNumberWithoutComma, scrollBy } from '../../../utilities/helpers';

export default class CreateNewOrg extends GenericElement {
	constructor() {
		super();
		this.orgNameInput = '//input[@data-test-id="organization-official-name-input"]';
		this.orgRegistrationNoInput = '(//input[@data-test-id="org-registration-no-input"])[1]';
		this.orgTierDropdown = '//p-dropdown[@data-test-id="select-org-tier-dropdown"]';
		this.orgTaxCertificationNoInput = '//input[@data-test-id="org-tax-certification-no-input"]';
		this.contactFirstNameInput = '//input[@data-test-id="contact-first-name-input"]';
		this.contactLastNameInput = '//input[@data-test-id="contact-last-name-input"]';
		this.administrationEmailInput = '//input[@data-test-id="email-input"]';
		this.phoneInput = '//input[@data-test-id="phone-input"]';
		this.streetInput = '//input[@data-test-id="street-input"]';
		this.cityInput = '//input[@data-test-id="city-input"]';
		this.stateInput = '//input[@data-test-id="state-input"]';
		this.postalCodeInput = '//input[@data-test-id="postal-code-input"]';
		this.countryDropdown = '//p-dropdown[@data-test-id="country-dropdown"]';
		this.currencyCodeDropdown = '//p-dropdown[@data-test-id="org-currency-dropdown"]';
		this.dropdownItem = '//p-dropdownitem[.="%s"]/li';
		this.googleMapsLinkInput = '//input[@data-test-id="google-maps-link-input"]';
		this.enableDefaultWorkspaceCheckbox = '//p-checkbox[@data-test-id="enable-default-workspace-checkbox"]';
		this.addOrgButton = '//button[@data-test-id="add-org-button"]';
	}

	async fillOrgName({ orgName }) {
		await this.fill(this.orgNameInput, orgName);
	}

	async fillOrgRegistrationNo({ registrationNumber }) {
		await this.fill(this.orgRegistrationNoInput, formatedNumberWithoutComma(registrationNumber, 0));
	}

	async selectOrgTier({ orgTier }) {
		await this.click(this.orgTierDropdown);
		await this.click(sprintf(this.dropdownItem, orgTier));
	}

	async fillOrgTaxCertificationNo({ taxCertificationNumber }) {
		await this.fill(this.orgTaxCertificationNoInput, formatedNumberWithoutComma(taxCertificationNumber, 0));
	}

	async fillContactFirstName({ firstName }) {
		await this.fill(this.contactFirstNameInput, firstName);
	}

	async fillContactLastName({ lastName }) {
		await this.fill(this.contactLastNameInput, lastName);
	}

	async fillAdministrationEmail({ email }) {
		await this.fill(this.administrationEmailInput, email);
	}

	async fillPhone({ phoneNumber }) {
		await this.fill(this.phoneInput, phoneNumber);
	}

	async fillStreet({ street }) {
		await this.fill(this.streetInput, street);
	}

	async fillCity({ city }) {
		await this.fill(this.cityInput, city);
	}

	async fillState({ state }) {
		await this.fill(this.stateInput, state);
	}

	async fillPostalCode({ postalCode }) {
		await this.fill(this.postalCodeInput, postalCode);
	}

	async selectCountry({ country }) {
		await this.click(this.countryDropdown);
		await this.click(sprintf(this.dropdownItem, country));
	}

	async selectcurrencyCode({ currency }) {
		await this.click(this.currencyCodeDropdown);
		await this.click(sprintf(this.dropdownItem, currency));
	}

	async fillGoogleMapsLink({ googleMapsLink }) {
		await this.fill(this.googleMapsLinkInput, googleMapsLink);
	}

	async selectEnableDefaultWorkspace() {
		await this.click(this.enableDefaultWorkspaceCheckbox);
	}

	async clickAddOrgButton() {
		await this.click(this.addOrgButton);
	}

	async scrollDown() {
		await scrollBy(0, 1000);
	}

	async submit({ organizationDetails, superAdminUserDetails }) {
		const { firstName, lastName, email, phoneNumber } = superAdminUserDetails;
		const {
			orgName,
			registrationNumber,
			orgTier,
			taxCertificationNumber,
			street,
			city,
			state,
			postalCode,
			country,
			currency,
			googleMapsLink,
		} = organizationDetails;

		await this.fillOrgName({ orgName });
		await this.fillOrgRegistrationNo({ registrationNumber });
		await this.selectOrgTier({ orgTier });
		await this.fillOrgTaxCertificationNo({ taxCertificationNumber });
		await this.fillContactFirstName({ firstName });
		await this.fillContactLastName({ lastName });
		await this.fillAdministrationEmail({ email });
		await this.fillPhone({ phoneNumber });
		await this.fillStreet({ street });
		await this.fillCity({ city });
		await this.fillState({ state });
		await this.fillPostalCode({ postalCode });

		await this.scrollDown(); // TODO: temp solution for scrolling

		await this.selectCountry({ country });
		await this.selectcurrencyCode({ currency });
		await this.fillGoogleMapsLink({ googleMapsLink });
		await this.selectEnableDefaultWorkspace();

		await this.scrollDown(); // TODO: temp solution for scrolling

		await this.clickAddOrgButton();
	}
}
