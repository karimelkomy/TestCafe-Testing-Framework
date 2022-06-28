import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RfqDetailsBox extends GenericElement {
	constructor() {
		super();
		this.orgNameText = '//h1[@data-test-id="org-name-text" and contains(text(), "%s")]';
		this.contactInfoText = '//div[./span[contains(text(), "Contact")]][contains(text(), "%s")]';
		this.locationText = '//div[./span[contains(text(), "Delivery Location")]]/span[contains(text(), "%s")]';
		this.locationPopupText = '//p-overlaypanel//div[contains(@class, "p-overlaypanel-content") and contains(., "%s")]';
		this.locationGoogleLink = '//p-overlaypanel//div[contains(@class, "p-overlaypanel-content")]//a[contains(@href, "%s")]';
		this.submittedLocationGoogleLink = '//div[@data-test-id="delivery-to-text"]//a[contains(@href, "%s")]';
		this.requestorRemarkText = '//p[contains(@class, "description-block") and .="%s"]';
	}

	async validateOrgName({ organizationDetails }) {
		const { orgName } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.orgNameText, orgName));
	}

	async validateContactInfo({ eSourceAdminUserDetails }) {
		if (eSourceAdminUserDetails) {
			const { firstName, lastName, email } = eSourceAdminUserDetails;

			await this.validateElementVisibility(sprintf(this.contactInfoText, `${firstName} ${lastName}`));
			await this.validateElementVisibility(sprintf(this.contactInfoText, email));
		}
	}

	async validateDeliveryLocation({ organizationLocation, workspaceDetails }) {
		const locationDetails = organizationLocation || workspaceDetails.location;
		const { name, country, type, street, city, postalCode, googleMapsLink } = locationDetails;

		await this.validateElementVisibility(sprintf(this.locationText, name));
		await this.validateElementVisibility(sprintf(this.locationText, country));

		await this.click(sprintf(this.locationText, name));

		await this.validateElementVisibility(sprintf(this.locationPopupText, name));
		await this.validateElementVisibility(sprintf(this.locationPopupText, country));
		await this.validateElementVisibility(sprintf(this.locationPopupText, type));
		await this.validateElementVisibility(sprintf(this.locationPopupText, street));
		await this.validateElementVisibility(sprintf(this.locationPopupText, city));
		await this.validateElementVisibility(sprintf(this.locationPopupText, postalCode));

		await this.validateElementVisibility(sprintf(this.locationGoogleLink, googleMapsLink));
	}

	async validateComments({ requestDetails, markupDetails }) {
		const { requestInfoRemark, sourcingRemark, revisionRemark } = requestDetails;

		if (requestInfoRemark || sourcingRemark) {
			const comment = requestInfoRemark || sourcingRemark;

			await this.validateElementVisibility(sprintf(this.requestorRemarkText, comment));
		} else if (markupDetails && markupDetails.type === 'revised') {
			await this.validateElementVisibility(sprintf(this.requestorRemarkText, revisionRemark));
		}
	}

	async validateRfqDetailsBox({
		workspaceDetails,
		organizationDetails,
		organizationLocation,
		eSourceAdminUserDetails,
		requestDetails,
		markupDetails,
	}) {
		await this.validateOrgName({ organizationDetails });
		await this.validateContactInfo({ eSourceAdminUserDetails });
		await this.validateDeliveryLocation({ organizationLocation, workspaceDetails });
		await this.validateComments({ requestDetails, markupDetails });
	}

	async validateSubmittedRfqDetailsBox({ workspaceDetails, organizationDetails, organizationLocation, requestDetails, markupDetails }) {
		await this.validateOrgName({ organizationDetails });
		await this.validateDeliveryLocation({ organizationLocation, workspaceDetails });
		await this.validateComments({ requestDetails, markupDetails });
	}
}
