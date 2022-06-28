import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RfqsSubmittedList extends GenericElement {
	constructor() {
		super();
		this.element = '//penny-list-table//div[@row-index="0"]';
		this.firstRfqNumberButton = `${this.element}/div[@col-id="id"]//button`;
		this.firstRfqSupplierText = `${this.element}/div[@col-id="supplier"]//span[text()="%s"]`;
		this.firstRfqRequestTitleText = `${this.element}/div[@col-id="requestTitle"]//span[text()="%s"]`;
		this.firstRfqDeliveryLocationText = `${this.element}/div[@col-id="location"]//span[text()="%s"]`;
		this.firstRfqStatusText = `${this.element}/div[@col-id="status"]//span[text()="%s"]`;
	}

	async validateSupplierOrganizationName({ organizationName }) {
		await this.validateElementVisibility(sprintf(this.firstRfqSupplierText, organizationName));
	}

	async validateRequestTitle({ requestTitle }) {
		await this.validateElementVisibility(sprintf(this.firstRfqRequestTitleText, requestTitle));
	}

	async validateDeliveryLocation({ locationName }) {
		await this.validateElementVisibility(sprintf(this.firstRfqDeliveryLocationText, locationName));
	}

	async validateStatus(status) {
		await this.validateElementVisibility(sprintf(this.firstRfqStatusText, status));
	}

	async validateFirstRfqRow({ rfqDetails, supplierDetails, deliveryLocationDetails, status }) {
		await this.validateSupplierOrganizationName(supplierDetails);
		await this.validateRequestTitle(rfqDetails);
		await this.validateDeliveryLocation(deliveryLocationDetails);
		await this.validateStatus(status);
	}

	async openFirstSubmittedRfq({ rfqDetails, supplierDetails, deliveryLocationDetails, status }) {
		await this.validateFirstRfqRow({ rfqDetails, supplierDetails, deliveryLocationDetails, status });
		await this.click(this.firstRfqNumberButton);
	}
}
