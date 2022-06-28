import GenericElement from '../../../shared/core/GenericElement';
import { imagePath } from '../../../../data/saas/constants/documentsPath';

export default class RfqDraftsFooter extends GenericElement {
	constructor() {
		super();
		this.remarkInput = '//p-editor//div[contains(@class, "ql-blank")]';
		this.uploadDocumentInput = '//penny-upload//input';
		this.uploadedDocumentChip = '//div[@class="p-card-content"]//penny-marketplace-remarks-attachment//ul';
		this.sendRfqButton = '//button[@data-test-id="send-message-button" and .="Send RFQ" and contains(@class, "hidden")]';
	}

	async fillRemark({ remark }) {
		await this.fill(this.remarkInput, remark);
	}

	async uploadDocument() {
		await this.uploadFile(imagePath.attachment, this.uploadDocumentInput);
	}

	async validateUploadedDocument() {
		await this.validateElementVisibility(this.uploadedDocumentChip);
	}

	async clickSendRfqButton() {
		await this.click(this.sendRfqButton);
	}

	async submit(rfqDetails) {
		await this.fillRemark(rfqDetails);
		await this.uploadDocument();
		await this.validateUploadedDocument();
		await this.clickSendRfqButton();
	}
}
