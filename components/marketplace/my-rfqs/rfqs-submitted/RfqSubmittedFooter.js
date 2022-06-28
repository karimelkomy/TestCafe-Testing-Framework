import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class RfqSubmittedFooter extends GenericElement {
	constructor() {
		super();
		this.element = '//penny-marketplace-rfq-submitted-detail';
		this.remarkText = `${this.element}//p[contains(@class, "custom-editor-remarks") and .="%s"]`;
		this.uploadedDocumentChip = `${this.element}//penny-marketplace-remarks-attachment//ul`;
	}

	async validateRemark({ remark }) {
		await this.validateElementVisibility(sprintf(this.remarkText, remark));
	}

	async validateUploadedDocument() {
		await this.validateElementVisibility(this.uploadedDocumentChip);
	}

	async submit(rfqDetails) {
		await this.validateRemark(rfqDetails);
		await this.validateUploadedDocument();
	}
}
