import GenericElement from '../../shared/core/GenericElement';
import { imagePath } from '../../../data/saas/constants/documentsPath';

export default class Receipt extends GenericElement {
	constructor() {
		super();
		this.uploadReceiptInput = '//penny-upload//input';
		this.uploadedReceiptChip = '//penny-upload//a[contains(@class, "file-name")]';
	}

	async upload() {
		await this.uploadFile(imagePath.receipt, this.uploadReceiptInput);
	}

	async validate() {
		await this.validateElementVisibility(this.uploadedReceiptChip);
	}
}
