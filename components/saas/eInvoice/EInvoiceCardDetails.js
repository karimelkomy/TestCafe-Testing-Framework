import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class EInvoiceCardDetails extends GenericElement {
	constructor() {
		super();
		this.element = '//penny-org-detail-view[.//h5[contains(text(),"%s")]]';
		this.expandButton = `${this.element}//button[.="expand_more"]`;
		this.registrationNumberText = `${this.element}//span[contains(text(), "CRN : %s")]`;
		this.taxCertificationNumberText = `${this.element}//span[contains(text(), "VAT : %s")]`;
		this.buildingNumberText = `${this.element}//tr[./td[contains(., "Building No")]]/td[text()="%s"]`;
		this.streetNameText = `${this.element}//tr[./td[contains(., "Street Name")]]/td[text()="%s"]`;
		this.districtText = `${this.element}//tr[./td[contains(., "District")]]/td[text()="%s"]`;
		this.cityText = `${this.element}//tr[./td[contains(., "City")]]/td[text()="%s"]`;
		this.countryText = `${this.element}//tr[./td[contains(., "Country")]]/td[text()="%s"]`;
		this.postalCodeText = `${this.element}//tr[./td[contains(., "Postal Code")]]/td[text()="%s"]`;
	}

	async clickExpandButton({ cardName }) {
		await this.click(sprintf(this.expandButton, cardName));
	}

	async validateRegistrationNumber({ cardName, registrationNumber }) {
		await this.validateElementVisibility(sprintf(this.registrationNumberText, cardName, registrationNumber));
	}

	async validateTaxCertificationNumber({ cardName, taxCertificationNumber }) {
		await this.validateElementVisibility(sprintf(this.taxCertificationNumberText, cardName, taxCertificationNumber));
	}

	async validateBuildingNumber({ cardName, buildingNumber }) {
		await this.validateElementVisibility(sprintf(this.buildingNumberText, cardName, buildingNumber));
	}

	async validateStreetName({ cardName, street }) {
		await this.validateElementVisibility(sprintf(this.streetNameText, cardName, street));
	}

	async validateDistrict({ cardName, district }) {
		await this.validateElementVisibility(sprintf(this.districtText, cardName, district));
	}

	async validateCity({ cardName, city }) {
		await this.validateElementVisibility(sprintf(this.cityText, cardName, city));
	}

	async validateCountry({ cardName, country }) {
		await this.validateElementVisibility(sprintf(this.countryText, cardName, country));
	}

	async validatePostalCode({ cardName, postalCode }) {
		await this.validateElementVisibility(sprintf(this.postalCodeText, cardName, postalCode));
	}

	async validate({ cardDetails }) {
		const {
			clientName,
			orgName,
			registrationNumber,
			taxCertificationNumber,
			buildingNumber,
			street,
			district,
			city,
			country,
			postalCode,
		} = cardDetails;
		const cardName = clientName || orgName;

		await this.clickExpandButton({ cardName });

		await this.validateRegistrationNumber({ cardName, registrationNumber });
		await this.validateTaxCertificationNumber({ cardName, taxCertificationNumber });
		await this.validateBuildingNumber({ cardName, buildingNumber });
		await this.validateStreetName({ cardName, street });
		await this.validateDistrict({ cardName, district });
		await this.validateCity({ cardName, city });
		await this.validateCountry({ cardName, country });
		await this.validatePostalCode({ cardName, postalCode });
	}
}
