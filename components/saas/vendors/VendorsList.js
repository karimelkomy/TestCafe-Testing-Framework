import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class VendorsList extends GenericElement {
	constructor() {
		super();
		this.element = '//div[@role="row"][./div[@col-id="name"]//span[text()="%s"]]';
		this.vendorIdButton = `${this.element}/div[@col-id="displayId"]`;
		this.countryText = `${this.element}/div[@col-id="country"]//span[text()="%s"]`;
		this.classificationText = `${this.element}/div[@col-id="classification"]//span[text()="%s"]`;
		this.emailText = `${this.element}/div[@col-id="email"]//span[text()="%s"]`;
	}

	async validateCountry({ vendorName, country }) {
		await this.validateElementVisibility(sprintf(this.countryText, vendorName, country));
	}

	async validateClassification({ vendorName, vendorClassification }) {
		await this.validateElementVisibility(sprintf(this.classificationText, vendorName, vendorClassification));
	}

	async validateEmail({ vendorName, email }) {
		await this.validateElementVisibility(sprintf(this.emailText, vendorName, email));
	}

	async validate({ vendorName, country, vendorClassification, email }) {
		await this.validateCountry({ vendorName, country });
		await this.validateClassification({ vendorName, vendorClassification });
		await this.validateEmail({ vendorName, email });
	}

	async clickVendorIdButton({ vendorName }) {
		await this.click(sprintf(this.vendorIdButton, vendorName));
	}

	async openVendor({ vendorDetails }) {
		const { vendorName, country, vendorClassification, email } = vendorDetails;

		await this.validate({ vendorName, country, vendorClassification, email });
		await this.clickVendorIdButton({ vendorName });
	}
}
