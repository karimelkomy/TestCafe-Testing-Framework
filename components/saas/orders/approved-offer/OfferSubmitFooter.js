import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import RequestSourcing from '../../../../data/saas/constants/RequestSourcing';

export default class OfferSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.createOrderButton = '//button[@data-test-id="create-order-button" and @label="CREATE ORDER"]';
		this.vendorRemark = '//div[@class="ql-editor" and .="%s"]';
	}

	async validateVendorRemark({ rfqDetails }) {
		const { remark } = rfqDetails;

		if (remark) {
			await this.validateElementVisibility(sprintf(this.vendorRemark, remark));
		}
	}

	async clickCreateOrderButton() {
		await this.click(this.createOrderButton);
	}

	async submit({ productRequest }) {
		const { rfqDetails, requestSourcing } = productRequest;

		if (requestSourcing !== RequestSourcing.ORDER_WITH_SOURCE_FROM_CONTRACT) {
			await this.validateVendorRemark({ rfqDetails });
		}

		await this.clickCreateOrderButton();
	}
}
