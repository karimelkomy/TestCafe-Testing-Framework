import GenericElement from '../../../shared/core/GenericElement';

export default class RevisionPopup extends GenericElement {
	constructor() {
		super();
		this.element = '//p-dialog[@data-test-id="revision-popup"]';
		this.revisionReasonInput = `${this.element}//textarea[@data-test-id="revision-reason-input"]`;
		this.sendButton = `${this.element}//button[@data-test-id="send-button"]`;
	}

	async fillRevisionReason({ requestDetails }) {
		const { revisionRemark } = requestDetails;

		await this.fill(this.revisionReasonInput, revisionRemark);
	}

	async clickSendButton() {
		await this.click(this.sendButton);
	}

	async submit({ requestDetails }) {
		await this.fillRevisionReason({ requestDetails });
		await this.clickSendButton();
	}
}
