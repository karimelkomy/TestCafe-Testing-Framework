import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RfqDraftHeader extends GenericElement {
	constructor() {
		super();
		this.supplierDraftRfqButton = '//penny-marketplace-rfq-drafts//button/span[text()="%s"]';
		this.draftRfqHeaderText = '//penny-marketplace-table-header//span[contains(., "RFQ : %s")]';
		this.deliveryLocationText = '//div[./span[text()="Delivery location"]]/p-dropdown//span[text()="%s"]';
		this.requestTitleInput = '//div[./span[text()="Request Title"]]/input';
	}

	async openSupplierDraftRfq({ organizationName }) {
		await this.click(sprintf(this.supplierDraftRfqButton, organizationName));
	}

	async validateSupplierDraftRfqHeader({ organizationName }) {
		await this.validateElementVisibility(sprintf(this.draftRfqHeaderText, organizationName));
	}

	async validateDeliveryLocation({ locationName }) {
		await this.validateElementVisibility(sprintf(this.deliveryLocationText, locationName));
	}

	async fillRequestTitle({ requestTitle }) {
		await this.fill(this.requestTitleInput, requestTitle);
	}

	async submit({ rfqDetails, supplierDetails, deliveryLocationDetails }) {
		await this.openSupplierDraftRfq(supplierDetails);
		await this.validateSupplierDraftRfqHeader(supplierDetails);
		await this.validateDeliveryLocation(deliveryLocationDetails);
		await this.fillRequestTitle(rfqDetails);
	}
}
