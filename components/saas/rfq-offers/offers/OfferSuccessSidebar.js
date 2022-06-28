import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { waitForUrlChanged } from '../../../../utilities/helpers';
import { urls } from '../../../../data/saas/constants/urls';

export default class OfferSuccessSidebar extends GenericElement {
	constructor() {
		super();
		this.rfqId = '//a[@data-test-id="offer-id-text" and contains(text(), "%s")]';
		this.offerProceedQuestion = '//h5[@data-test-id="question-to-proceed-message"]';
		this.goToOrderButton = '//a[@data-test-id="go-to-order-button"]';
		this.goToRfqListButton = '//button[@data-test-id="go-to-rfq-list-button"]';
	}

	async validateOfferSuccessMessage({ rfqId }) {
		await this.validateElementVisibility(sprintf(this.rfqId, rfqId));
	}

	async clickGoToOrderButton() {
		await this.validateElementVisibility(this.offerProceedQuestion);
		await this.click(this.goToOrderButton);
	}

	async clickGoToRfqListButton() {
		await this.click(this.goToRfqListButton);
		await waitForUrlChanged(urls.rfqs + '?page=1&limit=10');
	}

	async goToOrder({ rfqId }) {
		await this.validateOfferSuccessMessage({ rfqId });
		await this.clickGoToOrderButton();
	}

	async goToRfqList({ productRequest }) {
		const { rfqId } = productRequest;

		await this.validateOfferSuccessMessage({ rfqId });
		await this.clickGoToRfqListButton();
	}

	async goToClientRfqList() {
		await this.clickGoToRfqListButton();
	}
}
