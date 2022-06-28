import GenericElement from '../../shared/core/GenericElement';
import { excelPath } from '../../../data/saas/constants/documentsPath';

export default class CreateRequest extends GenericElement {
	constructor() {
		super();
		this.createRequestButton = '//penny-upload//button[@data-test-id="create-request-button"]';
		this.browseExcelFileInput = '//penny-upload//input';
	}

	async clickCreateRequestButton() {
		await this.click(this.createRequestButton);
	}

	async uploadExcelFileButton() {
		await this.uploadFile(excelPath.request, this.browseExcelFileInput);
	}
}
