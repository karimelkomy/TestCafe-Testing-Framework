import { getTaxValue } from '../../../utilities/helpers';

export default class ProductsPrice {
	getUnitPrice({ rfqDetails, productsDetails, markupDetails }) {
		if (markupDetails) {
			let unitPrice = 0;

			for (const productDetails of productsDetails) {
				unitPrice += productDetails.basePrice + markupDetails.markupValue;
			}

			return unitPrice;
		}

		return rfqDetails.pricePerUnit;
	}

	getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const { qty } = requestDetails;
		const unitPrice = this.getUnitPrice({ rfqDetails, productsDetails, markupDetails });

		if (markupDetails) {
			return unitPrice * qty;
		}

		return unitPrice * qty * productsDetails.length;
	}

	getSubTotalWithShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const subTotal = this.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const { productShippingFee, shippingFee } = rfqDetails;
		const shippingFeeValue = productShippingFee || shippingFee;

		return subTotal + shippingFeeValue;
	}

	getTotalWithTaxPrice({ requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const subTotal = this.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const taxes = this.getTaxAmount({ subTotal, rfqDetails });

		return subTotal + taxes;
	}

	getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const totalWithTax = this.getTotalWithTaxPrice({ requestDetails, rfqDetails, productsDetails, markupDetails });
		const { productShippingFee, shippingFee } = rfqDetails;
		const shippingFeeValue = productShippingFee || shippingFee;

		return totalWithTax + shippingFeeValue;
	}

	getTaxAmount({ subTotal, rfqDetails }) {
		const { tax, taxType } = rfqDetails;

		if (tax && taxType) {
			return getTaxValue(subTotal, tax, taxType);
		}

		return 0;
	}
}
