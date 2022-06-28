import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { imagePath } from '../../../data/saas/constants/documentsPath';

export default class GrnInfoBox extends GenericElement {
	constructor() {
		super();
		this.orderStatusText = '//div[./div[.="Order Status"]]//div[text()="%s"]';
		this.deliveryToNameText = '//div[./div[.="Delivery to"]]//span/span[contains(text(), "%s")]';
		this.deliveryToLocationsText = '//div[./div[.="Delivery to"]]//div/span[contains(text(), "%s")]';
		this.googleMapUrl = '//div[./div[.="Delivery to"]]//a';
		this.uploadInvoiceInput = '//penny-upload//input';
		this.uploadedInvoiceChip = '//div[contains(@class, "files-content")][.//a[contains(@class, "file-name")]]';
	}

	async validateOrderStatus(grnStatus) {
		await this.validateElementVisibility(sprintf(this.orderStatusText, grnStatus));
	}

	async validateDeliveryTo({ locationDetails }) {
		const { name, country, state, city, street, postalCode, googleMapsLink } = locationDetails;

		await this.validateElementVisibility(sprintf(this.deliveryToNameText, name));
		await this.validateElementVisibility(sprintf(this.deliveryToLocationsText, country));
		await this.validateElementVisibility(sprintf(this.deliveryToLocationsText, state));
		await this.validateElementVisibility(sprintf(this.deliveryToLocationsText, city));
		await this.validateElementVisibility(sprintf(this.deliveryToLocationsText, street));
		await this.validateElementVisibility(sprintf(this.deliveryToLocationsText, postalCode));

		const actualGoogleMapsLink = await this.getAttributeValue(this.googleMapUrl, 'href');

		await this.validateEqual(actualGoogleMapsLink, googleMapsLink);
	}

	async validateGrnInfoBox({ productRequest }) {
		const { grnStatus, partialGrn, workspaceDetails, organizationLocation } = productRequest;
		const locationDetails = organizationLocation || workspaceDetails.location;

		if (!partialGrn) {
			await this.validateOrderStatus(grnStatus); // TODO: Cover partial Grn status validation
		}

		await this.validateDeliveryTo({ locationDetails });
	}

	async uploadInvoice() {
		await this.uploadFile(imagePath.receipt, this.uploadInvoiceInput);
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}
}
