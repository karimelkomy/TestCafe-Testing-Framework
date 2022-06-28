import GenericElement from '../../../shared/core/GenericElement';

export default class ActionsDropdown extends GenericElement {
	constructor() {
		super();
		this.actionsButton = '//button[@data-test-id="select-action-dropdown"]';
		this.acceptOfferButton = '//button[@data-test-id="accept-offer-button"]';
		this.approveOfferButton = '//button[@data-test-id="approve-offer-button"]';
		this.sendForRevisionButton = '//button[@data-test-id="send-for-revison-button"]';
		this.refreshOffersButton = '//button[.="REFRESH Offer(s)"]';
	}

	async clickActionsButton() {
		await this.click(this.actionsButton);
	}

	async clickAcceptOfferButton() {
		await this.click(this.acceptOfferButton);
	}

	async clickApproveOfferButton() {
		await this.click(this.approveOfferButton);
	}

	async clickSendForRevisionButton() {
		await this.click(this.sendForRevisionButton);
	}

	async acceptOffer() {
		await this.clickActionsButton();
		await this.clickAcceptOfferButton();
	}

	async approveOffer() {
		await this.clickActionsButton();
		await this.clickApproveOfferButton();
	}

	async sendOfferForRevision() {
		await this.clickActionsButton();
		await this.clickSendForRevisionButton();
	}
}
