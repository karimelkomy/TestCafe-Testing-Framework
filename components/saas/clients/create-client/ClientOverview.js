import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumberWithoutComma } from '../../../../utilities/helpers';

export default class ClientOverview extends GenericElement {
	constructor() {
		super();
		this.clientNameText = '//div[contains(@class, "overview-row") and contains(.,"Client Name")]/div[text()=" %s "]';
		this.clientRegistrationNumberText =
			'//div[contains(@class, "overview-row") and contains(.,"Client Registration No.")]/div[text()=" %s "]';
		this.clientTaxCertificationNumberText = '//div[contains(@class, "overview-row") and contains(.,"Client VAT No.")]/div[text()=" %s "]';
		this.clientContactNameText = '//div[contains(@class, "overview-row") and contains(.,"Client Contact Name")]/div[text()=" %s "]';
		this.clientEmailText = '//div[contains(@class, "overview-row") and contains(.,"Client Email")]/div[text()=" %s "]';
		this.clientPhoneText = '//div[contains(@class, "overview-row") and contains(.,"Client Phone")]/div[text()=" %s "]';
		this.clientAddressText = '//div[contains(@class, "overview-row") and contains(.,"Client Address")]//span[contains(text(), "%s")]';
	}

	async validateClientName({ clientDetails }) {
		const { clientName } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientNameText, clientName));
	}

	async validateClientRegistrationNumber({ clientDetails }) {
		const { registrationNumber } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientRegistrationNumberText, formatedNumberWithoutComma(registrationNumber, 0)));
	}

	async validateClientTaxCertificationNumber({ clientDetails }) {
		const { taxCertificationNumber } = clientDetails;

		await this.validateElementVisibility(
			sprintf(this.clientTaxCertificationNumberText, formatedNumberWithoutComma(taxCertificationNumber, 0))
		);
	}

	async validateClientContactName({ clientDetails }) {
		const { firstName, lastName } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientContactNameText, `${firstName} ${lastName}`));
	}

	async validateClientEmail({ clientDetails }) {
		const { email } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientEmailText, email));
	}

	async validateClientPhone({ clientDetails }) {
		const { phone } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientPhoneText, phone));
	}

	async validateClientAddress({ clientDetails }) {
		const { buildingNumber, additionalNumber, street, city, state, postalCode, country } = clientDetails;

		await this.validateElementVisibility(sprintf(this.clientAddressText, buildingNumber));
		await this.validateElementVisibility(sprintf(this.clientAddressText, additionalNumber));
		await this.validateElementVisibility(sprintf(this.clientAddressText, street));
		await this.validateElementVisibility(sprintf(this.clientAddressText, city));
		await this.validateElementVisibility(sprintf(this.clientAddressText, state));
		await this.validateElementVisibility(sprintf(this.clientAddressText, postalCode));
		await this.validateElementVisibility(sprintf(this.clientAddressText, country));
	}

	async validateClientsOverview({ clientDetails }) {
		await this.validateClientName({ clientDetails });
		await this.validateClientRegistrationNumber({ clientDetails });
		await this.validateClientTaxCertificationNumber({ clientDetails });
		await this.validateClientContactName({ clientDetails });
		await this.validateClientEmail({ clientDetails });
		await this.validateClientPhone({ clientDetails });
		await this.validateClientAddress({ clientDetails });
	}
}
