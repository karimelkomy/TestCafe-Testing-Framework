import { getTaxValue } from '../../../utilities/helpers';

export default class UnitProductPrice {
	getUnitPriceWithTax({ rfqDetails }) {
		const { pricePerUnit } = rfqDetails;
		const taxes = this.getTaxAmount({ rfqDetails });

		return pricePerUnit + taxes;
	}

	getTaxAmount({ rfqDetails }) {
		const { tax, taxType, pricePerUnit } = rfqDetails;

		if (tax && taxType) {
			return getTaxValue(pricePerUnit, tax, taxType);
		}

		return 0;
	}
}
