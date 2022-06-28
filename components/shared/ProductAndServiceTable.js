import { sprintf } from 'sprintf-js';
import GenericElement from './core/GenericElement';
import ProductPrice from '../saas/shared/ProductPrice';
import { formatedNumber, formatedNumberWithoutComma } from '../../utilities/helpers';

export default class ProductAndServiceTable extends GenericElement {
	constructor({
		productNameText,
		brandText,
		skuText,
		qtyText,
		recievedQtyText,
		deliveredQtyText,
		etaText,
		unitPriceText,
		subTotalText,
		taxText,
		totalText,
		taxDropdown,
		taxDropdownItem,
	}) {
		super();
		this.productPrice = new ProductPrice();
		this.productNameText = productNameText;
		this.brandText = brandText;
		this.skuText = skuText;
		this.qtyText = qtyText;
		this.recievedQtyText = recievedQtyText;
		this.deliveredQtyText = deliveredQtyText;
		this.etaText = etaText;
		this.unitPriceText = unitPriceText;
		this.subTotalText = subTotalText;
		this.taxText = taxText;
		this.totalText = totalText;
		this.taxDropdown = taxDropdown;
		this.taxDropdownItem = taxDropdownItem;
	}

	async validateProductName({ productDetails }) {
		const { productName } = productDetails;

		await this.validateElementVisibility(sprintf(this.productNameText, productName, productName));
	}

	async validateBrand({ productDetails }) {
		const { productName, brand } = productDetails;

		await this.validateElementVisibility(sprintf(this.brandText, productName, brand));
	}

	async validateSku({ productDetails }) {
		const { productName, sku } = productDetails;

		await this.validateElementVisibility(sprintf(this.skuText, productName, sku));
	}

	async validateQty({ productDetails, requestDetails }) {
		const { productName } = productDetails;
		const { qty } = requestDetails;

		await this.validateElementVisibility(sprintf(this.qtyText, productName, formatedNumberWithoutComma(qty, 0)));
	}

	async validateRecievedQty({ productDetails, recievedQty }) {
		const { productName } = productDetails;

		await this.validateElementVisibility(sprintf(this.recievedQtyText, productName, recievedQty));
	}

	async validateDeliveredQty({ productDetails, deliveredQty }) {
		const { productName } = productDetails;

		await this.validateElementVisibility(sprintf(this.deliveredQtyText, productName, deliveredQty));
	}

	async validateETA({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { ETA, ETAUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.etaText, productName, `${formatedNumber(ETA, 0)}  ${ETAUnit}`));
	}

	async validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;

		const price = this.productPrice.getUnitPrice({ rfqDetails, basePrice, markupDetails });

		await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'price', formatedNumber(price)));
	}

	async validateSubtotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;

		const subTotal = this.productPrice.getSubTotalPrice({ requestDetails, rfqDetails, basePrice, markupDetails });

		await this.validateElementVisibility(sprintf(this.subTotalText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.subTotalText, productName, 'price', formatedNumber(subTotal)));
	}

	async validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;

		const subTotal = this.productPrice.getSubTotalPrice({ requestDetails, rfqDetails, basePrice, markupDetails });
		const taxes = this.productPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validateElementVisibility(sprintf(this.taxText, productName, currencyCode));
		await this.validateElementVisibility(sprintf(this.taxText, productName, formatedNumber(taxes)));
	}

	async validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;

		const price = this.productPrice.getTotalWithTaxPrice({ requestDetails, rfqDetails, basePrice, markupDetails });

		await this.validateElementVisibility(sprintf(this.totalText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.totalText, productName, 'price', formatedNumber(price)));
	}

	async selectTax({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { tax, taxType } = rfqDetails;

		if (tax && taxType) {
			await this.click(sprintf(this.taxDropdown, productName));
			await this.click(sprintf(this.taxDropdownItem, productName));
		}
	}
}
