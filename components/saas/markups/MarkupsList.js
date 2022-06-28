import GenericElement from '../../shared/core/GenericElement';

export default class MarkupsList extends GenericElement {
	constructor() {
		super();
		this.createMarkupsButton = '//button[@data-test-id="create-markups-button"]';
		this.markupIdButton = '(//div[@col-id="markupId"]//button)[1]';
	}

	async clickCreateNewMarkupButton() {
		await this.click(this.createMarkupsButton);
	}

	async clickMarkupIdButton() {
		await this.click(this.markupIdButton);
	}
}
