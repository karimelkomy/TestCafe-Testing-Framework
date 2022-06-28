import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class OrgDetails extends GenericElement {
	constructor() {
		super();
		this.currencyCodeText = '//div[@data-test-id="org-currency-value" and .="%s"]';
		this.primaryContactText = '//div[@data-test-id="primary-contact-value"]/span[text()="%s"]';
		this.contactEmailText = '//div[@data-test-id="contact-email-value" and .="%s"]';
	}

	async validatecurrencyCode({ organizationDetails }) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.currencyCodeText, currencyCode));
	}

	async validatePrimaryContact({ superAdminUserDetails }) {
		const { firstName, lastName } = superAdminUserDetails;

		await this.validateElementVisibility(sprintf(this.primaryContactText, `${firstName} ${lastName}`));
	}

	async validateContactEmail({ superAdminUserDetails }) {
		const { email } = superAdminUserDetails;

		await this.validateElementVisibility(sprintf(this.contactEmailText, email));
	}

	async validateOrgInfo({ organizationDetails, superAdminUserDetails }) {
		await this.validatecurrencyCode({ organizationDetails });
		await this.validatePrimaryContact({ superAdminUserDetails });
		await this.validateContactEmail({ superAdminUserDetails });
	}
}
