import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class ProductPricing extends GenericElement {
	constructor() {
		super();
		this.basePriceInput = '//p-inputnumber[@data-test-id="base-price-input"]//input';
		this.priceInfoLabel = '//h2[@data-test-id="price-info-label"]';
		this.unitPriceText = '//span[@data-test-id="unit-%s-text" and contains(., "%s")]';
		this.totalPriceText = '//span[@data-test-id="total-%s-text" and contains(., "%s")]';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async fillBasePrice({ basePrice }) {
		await this.fill(this.basePriceInput, formatedNumber(basePrice));
		await this.click(this.priceInfoLabel); // TODO: to be removed once we have auto update for info box after fill input fields
	}

	async validateUnitPriceInfoBox({ basePrice, organizationDetails }) {
		await this.validatePrice(this.unitPriceText, basePrice, organizationDetails);
	}

	async validateTotalPriceInfoBox({ basePrice, organizationDetails }) {
		// TODO: to be modified after add taxes
		await this.validatePrice(this.totalPriceText, basePrice, organizationDetails);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submitProductPricing({ productDetails, organizationDetails }) {
		const { basePrice } = productDetails;
		// TODO: add taxes and validate on taxes info box

		await this.fillBasePrice({ basePrice });
		await this.validateUnitPriceInfoBox({ basePrice, organizationDetails });
		await this.validateTotalPriceInfoBox({ basePrice, organizationDetails });
		await this.clickSaveAndContinueButton();
	}
}
