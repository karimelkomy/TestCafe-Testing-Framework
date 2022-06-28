import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RfqSubmittedHeader extends GenericElement {
	constructor() {
		super();
		this.element = '//penny-marketplace-rfq-submitted-detail';
		this.supplierRfqChip = `${this.element}//penny-marketplace-chips//span[text()="%s"]`;
		this.requestTitleText = `${this.element}//p[text()="%s"]`;
		this.rfqStatusText = `${this.element}//span[text()=" RFQ status: %s "]`;
		this.deliveryLocationText = `${this.element}//span[text()=" Delivery location: %s "]`;
	}

	async validateSupplierOrganizationName({ organizationName }) {
		await this.validateElementVisibility(sprintf(this.supplierRfqChip, organizationName));
	}

	async validateRequestTitle({ requestTitle }) {
		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateRfqStatus(status) {
		await this.validateElementVisibility(sprintf(this.rfqStatusText, status));
	}

	async validateDeliveryLocation({ locationName }) {
		await this.validateElementVisibility(sprintf(this.deliveryLocationText, locationName));
	}

	async submit({ rfqDetails, supplierDetails, deliveryLocationDetails, status }) {
		// TODO: validate number of products
		await this.validateSupplierOrganizationName(supplierDetails);
		await this.validateRequestTitle(rfqDetails);
		await this.validateRfqStatus(status);
		await this.validateDeliveryLocation(deliveryLocationDetails);
	}
}
