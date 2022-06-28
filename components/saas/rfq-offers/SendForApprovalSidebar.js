import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { formatedNumber, formatedNumberWithoutComma } from '../../../utilities/helpers';
import ProductsPrice from '../shared/ProductsPrice';
import UnitProductPrice from '../shared/UnitProductPrice';

export default class SendForApprovalSidebar extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.unitProductPrice = new UnitProductPrice();
		this.rfqIdText = '//div[@data-test-id="offer-received-date-text" and contains(., "%s")]';
		this.vendorNameText = '//h2[@data-test-id="vendor-name-text" and contains(text(), "%s")]';
		this.totalWithTaxesndShippingFeeText = '//span[@data-test-id="vendor-total-order-value-price-text" and contains(., "%s")]';
		this.totalWithTaxesText = '//span[@data-test-id="vendor-total-excl-shipping-price-text" and contains(., "%s")]';
		this.taxesText = '//div[contains(@class, "rfq-product-row")][./div[text()=" TAXES "]]/div[contains(., "%s")]';
		this.shippingFeeText =
			'//div[contains(@class, "rfq-product-row")][./div[text()=" SHIPPING FEE "]]//penny-currency-text[contains(., "%s")]';
		this.shippingTermText = '//div[contains(@class, "rfq-product-row")][./div[text()=" SHIPPING TERM "]]/div[contains(., "%s")]';
		this.paymentTermText = '//div[contains(@class, "rfq-product-row")][./div[text()=" PAYMENT TERM "]]/div[contains(., "%s")]';
		this.etaText = '//div[contains(@class, "rfq-product-row")][./div[text()=" TOTAL ETA "]]/div[contains(., "%s")]';
		this.vendorOfferCurrency = '//div[@data-test-id="vendor-offer-currency-text" and contains(., "%s")]';
		this.productRow = '//div[contains(@class, "rfq-product-row")][.//penny-product-view[contains(., "%s")]]';
		this.subTotalWithTaxesText = `${this.productRow}//penny-currency-text[contains(., "%s")]`;
		this.qtyText = `${this.productRow}/div[.=" %s "]`;
		this.brandText = `${this.productRow}//span[text()=" %s "]`;
		this.remarkText = '//div[contains(@class, "p-editor-content")]//p[text()="%s"]';
		this.sendButton = '//penny-offer-action-sidebar//button[.="SEND"]';
	}

	async validateOfferId({ rfqId }) {
		await this.validateElementVisibility(sprintf(this.rfqIdText, rfqId));
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validateVendorOfferCurrency({ organizationDetails }) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.vendorOfferCurrency, currencyCode));
	}

	async validateShippingFee({ rfqDetails }) {
		const { shippingFee } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.shippingFeeText, formatedNumber(shippingFee)));
	}

	async validateShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.shippingTermText, shippingTerm));
	}

	async validatePaymentTerm({ rfqDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;

		await this.validateElementVisibility(
			sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit.toUpperCase()}`)
		);
	}

	async validateETA({ rfqDetails }) {
		const { ETA, ETAUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.etaText, `${formatedNumber(ETA, 0)} ${ETAUnit.toUpperCase()}`));
	}

	async validateQty({ productName, qty }) {
		await this.validateElementVisibility(sprintf(this.qtyText, productName, formatedNumberWithoutComma(qty, 0)));
	}

	async validateBrand({ productName, brand }) {
		await this.validateElementVisibility(sprintf(this.brandText, productName, brand));
	}

	async validateUnitPrice({ productName, rfqDetails }) {
		const price = rfqDetails.pricePerUnit;

		await this.validateElementVisibility(sprintf(this.subTotalWithTaxesText, productName, formatedNumber(price)));
	}

	async validateTotalWithTaxes({ productsDetails, requestDetails, rfqDetails }) {
		const price = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails });

		await this.validateElementVisibility(sprintf(this.totalWithTaxesText, formatedNumber(price)));
	}

	async validateTotalWithTaxesAndShippingFee({ productsDetails, requestDetails, rfqDetails }) {
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
		});

		await this.validateElementVisibility(sprintf(this.totalWithTaxesndShippingFeeText, formatedNumber(totalWithTaxAndShippingFeePrice)));
	}

	async validateTaxes({ productsDetails, requestDetails, rfqDetails }) {
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails });
		const taxValue = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validateElementVisibility(sprintf(this.taxesText, formatedNumber(taxValue)));
	}

	async validateRemark({ rfqDetails }) {
		const { remark } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.remarkText, remark));
	}

	async clickSendButton() {
		await this.click(this.sendButton);
	}

	async submit({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails, vendorDetails }) {
		const { qty } = requestDetails;

		// TODO: add comment and validate on it later on
		await this.validateOfferId({ rfqId });
		await this.validateVendorName({ vendorDetails });
		await this.validateVendorOfferCurrency({ organizationDetails });
		await this.validateTotalWithTaxesAndShippingFee({ productsDetails, requestDetails, rfqDetails });
		// await this.validateTotalWithTaxes({ productsDetails, requestDetails, rfqDetails }); // BUG: removed
		await this.validateTaxes({ productsDetails, requestDetails, rfqDetails });
		await this.validateShippingFee({ rfqDetails });
		await this.validateShippingTerm({ rfqDetails });
		// await this.validatePaymentTerm({ rfqDetails }); // BUG: payment term removed
		await this.validateETA({ rfqDetails });

		for (const productDetails of productsDetails) {
			const { productName, brand } = productDetails;

			await this.validateBrand({ productName, brand });
			await this.validateQty({ productName, qty });
			await this.validateUnitPrice({ productName, rfqDetails });
		}

		await this.validateRemark({ rfqDetails });
		await this.clickSendButton();
	}
}
