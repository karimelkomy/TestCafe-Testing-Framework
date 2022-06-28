import GenericElement from '../../shared/core/GenericElement';
import { getCurrentUrl } from '../../../utilities/helpers';

export default class GdnSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.submitButton = '//button[@data-test-id="submit-button"]';
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async getGdnUrl() {
		return getCurrentUrl();
	}

	async submitQuantity() {
		await this.clickSubmitButton();
	}
}
