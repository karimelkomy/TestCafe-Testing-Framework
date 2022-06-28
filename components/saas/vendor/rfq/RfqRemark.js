import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ProductPrice from '../../shared/ProductPrice';

export default class RfqRemark extends GenericElement {
	constructor() {
		super();
		this.productPrice = new ProductPrice();
		this.remarkInput = '//p-editor[@data-test-id="remark-input"]//div[contains(@class, "ql-editor")]';
		this.remarkText = '//div[./*[text()="YOUR REMARKS"]]//p[text()="%s"]';
	}

	async fillRemark({ remark }) {
		await this.fill(this.remarkInput, remark);
	}

	async validateRemark({ remark }) {
		await this.validateElementVisibility(sprintf(this.remarkText, remark));
	}
}
