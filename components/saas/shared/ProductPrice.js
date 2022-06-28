import { getTaxValue } from '../../../utilities/helpers';

export default class ProductPrice {
	getUnitPrice({ rfqDetails, basePrice, markupDetails }) {
		if (markupDetails) {
			return basePrice + markupDetails.markupValue; // TODO: handle markup % value
		}

		return rfqDetails.pricePerUnit;
	}

	getSubTotalPrice({ requestDetails, rfqDetails, basePrice, markupDetails }) {
		const unitPrice = this.getUnitPrice({ rfqDetails, basePrice, markupDetails });

		return unitPrice * requestDetails.qty;
	}

	getTotalWithTaxPrice({ requestDetails, rfqDetails, basePrice, markupDetails }) {
		const subTotal = this.getSubTotalPrice({ requestDetails, rfqDetails, basePrice, markupDetails });
		const taxes = this.getTaxAmount({ subTotal, rfqDetails });

		return subTotal + taxes;
	}

	getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, basePrice, markupDetails }) {
		const totalWithTax = this.getTotalWithTaxPrice({ requestDetails, rfqDetails, basePrice, markupDetails });
		const { shippingFee } = rfqDetails;

		return totalWithTax + shippingFee;
	}

	getTaxAmount({ subTotal, rfqDetails }) {
		const { tax, taxType } = rfqDetails;

		if (tax && taxType) {
			return getTaxValue(subTotal, tax, taxType);
		}

		return 0;
	}
}
