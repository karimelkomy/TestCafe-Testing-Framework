import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumberWithoutComma } from '../../../../utilities/helpers';

export default class MarkupOverview extends GenericElement {
	constructor() {
		super();
		this.markupsNameText =
			'//div[contains(@class, "overview-row")][./div[contains(@class, "overview-title") and .="Markups  Name"]]/div[text()=" %s "]';
		this.markupsValueText =
			'//div[contains(@class, "overview-row")][./div[contains(@class, "overview-title") and .="Markups  Value"]]/div[text()="%s"]';
		this.markupsCatalogText =
			'//div[contains(@class, "overview-row")][./div[contains(@class, "overview-title") and .="Markups  Catalog"]]/div[text()=" %s "]';
		this.markupsTypeText =
			'//div[contains(@class, "overview-row")][./div[contains(@class, "overview-title") and .="Markups  Type"]]/div[text()=" %s "]';
		this.paidByText =
			'//div[contains(@class, "overview-row")][./div[contains(@class, "overview-title") and .="Paid By"]]/div[text()=" %s "]';
	}

	async validateMarkupsName({ markupDetails }) {
		const { markupName } = markupDetails;

		await this.validateElementVisibility(sprintf(this.markupsNameText, markupName));
	}

	async validateMarkupsValue({ markupDetails }) {
		const { markupValue, markupValueCurrency } = markupDetails;

		await this.validateElementVisibility(
			sprintf(this.markupsValueText, `${formatedNumberWithoutComma(markupValue, 0)} ${markupValueCurrency}`)
		); // BUG: we should only integer markup value
	}

	async validateMarkupsCatalog({ markupDetails }) {
		const { catalog } = markupDetails;

		await this.validateElementVisibility(sprintf(this.markupsCatalogText, catalog));
	}

	async validateMarkupsValueType({ markupDetails }) {
		const { markupValueTypeAlt } = markupDetails;

		await this.validateElementVisibility(sprintf(this.markupsTypeText, markupValueTypeAlt));
	}

	async validatePaidBy({ markupDetails }) {
		const { paidBy } = markupDetails;

		await this.validateElementVisibility(sprintf(this.paidByText, paidBy));
	}

	async validate({ markupDetails }) {
		await this.validateMarkupsName({ markupDetails });
		await this.validateMarkupsValue({ markupDetails });
		await this.validateMarkupsCatalog({ markupDetails });
		await this.validateMarkupsValueType({ markupDetails });
		await this.validatePaidBy({ markupDetails });
	}
}
