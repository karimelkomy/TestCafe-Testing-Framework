import { t } from 'testcafe';
import { sprintf } from 'sprintf-js';
import { selectorXP, getCurrentUrl, formatedNumber, validateElementVisibility } from '../../../utilities/helpers';

export default class GenericElement {
	async click(elementXP) {
		try {
			await this.validateElementVisibility(elementXP);
			await t.click(selectorXP(elementXP));
		} catch (e) {
			throw new Error(`
		click failed - "${elementXP}" element does not exist.
		Current URL: ${await getCurrentUrl()}
	    `);
		}
	}

	async selectOption(elementXP) {
		await t.click(selectorXP(elementXP));
	}

	async hover(elementXP) {
		await this.validateElementVisibility(elementXP);
		await t.hover(selectorXP(elementXP));
	}

	async clear(elementXP) {
		await this.click(elementXP);
		await t.pressKey('ctrl+a delete');
	}

	async fill(elementXP, value) {
		await this.clear(elementXP);
		await t.typeText(selectorXP(elementXP), value);
	}

	async uploadFile(filePath, inputXP) {
		await t.setFilesToUpload(selectorXP(inputXP), [filePath]);
	}

	async getText(elementXP) {
		await this.validateElementVisibility(elementXP);

		return selectorXP(elementXP).innerText;
	}

	async getInputText(elementXP) {
		await this.validateElementVisibility(elementXP);

		return selectorXP(elementXP).value;
	}

	async getAttributeValue(elementXP, attribute) {
		await this.validateElementVisibility(elementXP);

		return selectorXP(elementXP).getAttribute(attribute);
	}

	async switchToIframe(iframeXP) {
		await this.validateElementVisibility(iframeXP);
		await t.switchToIframe(selectorXP(iframeXP));
	}

	async wait(seconds) {
		await t.wait(seconds * 1000);
	}

	async validateEqual(actual, expected) {
		await t.expect(actual).eql(expected);
	}

	async validateInputTextEqual(elementXP, expected) {
		const actual = await this.getInputText(elementXP);

		await t.expect(actual).eql(expected, `validateInputTextEqual failed - "${elementXP}". Current URL: ${await getCurrentUrl()}`);
	}

	async pressEnter() {
		await t.pressKey('enter');
	}

	async getCount(elementXP) {
		return selectorXP(elementXP).count;
	}

	async validateElementVisibility(elementXP) {
		await validateElementVisibility(elementXP);
	}

	async validatePrice(elementXP, price, organizationDetails) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(elementXP, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(elementXP, 'price', formatedNumber(price)));
	}
}
