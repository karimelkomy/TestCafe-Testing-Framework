import GenericElement from '../../shared/core/GenericElement';
import OrgTier from '../../../data/saas/constants/orgTier';

export default class CreateRequest extends GenericElement {
	constructor() {
		super();
		this.createRequestButton = '(//div[contains(@class, "display-none")]//button[@data-test-id="create-request-button"])[1]';
		this.createReimbursementRequestButton = '//button[@data-test-id="reimbursement-request-button"]';
	}

	async clickCreateRequestButton() {
		await this.click(this.createRequestButton);
	}

	async clickReimbursementRequestButton() {
		await this.click(this.createReimbursementRequestButton);
	}

	async reimbursementRequest() {
		await this.clickCreateRequestButton();
		await this.clickReimbursementRequestButton();
	}

	async productAndServiceRequest() {
		await this.clickCreateRequestButton();
	}
}
