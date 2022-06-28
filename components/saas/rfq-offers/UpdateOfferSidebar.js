import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../utilities/helpers';
import ProductAndServiceTable from '../../shared/ProductAndServiceTable';

export default class UpdateOfferSidebar extends ProductAndServiceTable {
	constructor() {
		const productRow = '//div[contains(@class, "rfq-product-row")][.//penny-product-view[contains(., "%s")]]';
		const brandText = `${productRow}//span[text()=" %s "]`;
		const qtyText = `${productRow}/div[.=" %s "]`;
		const taxDropdown = `${productRow}//p-multiselect[@defaultlabel="SELECT TAX"]`;
		const taxDropdownItem = `${productRow}//div[@class="p-checkbox-box"]`;
		super({
			brandText,
			qtyText,
			taxDropdown,
			taxDropdownItem,
		});
		this.rfqIdText = '//div[@data-test-id="offer-received-date-text" and contains(., "%s")]';
		this.vendorNameText = '//h2[@data-test-id="vendor-name-text" and contains(text(), "%s")]';
		this.vendorOfferCurrency = '//div[@data-test-id="vendor-offer-currency-text" and contains(., "%s")]';
		this.shippingFeeInput = '//div[contains(@class, "rfq-product-row")][./div[text()=" SHIPPING FEE "]]//p-inputnumber//input';
		this.shippingTermDropdown = '//div[contains(@class, "rfq-product-row")][./div[text()=" SHIPPING TERM "]]//p-dropdown';
		this.shippingTermDropdownItem =
			'//div[contains(@class, "rfq-product-row")][./div[text()=" SHIPPING TERM "]]//p-dropdownitem[.="%s"]/li';
		this.paymentTermInput = '//div[contains(@class, "rfq-product-row")][./div[text()=" PAYMENT TERM "]]//input';
		this.etaInput = '//div[contains(@class, "rfq-product-row")][./div[text()=" TOTAL ETA "]]//input';
		this.subTotalWithTaxesInput = `${productRow}//p-inputnumber//input`;
		this.remarkInput = '//penny-offer-action-sidebar//p-editor//div[contains(@class, "p-editor-content")]/div[1]';
		this.updateButton = '//button[.="UPDATE"]';
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

	async fillShippingFee({ rfqDetails }) {
		const { shippingFee } = rfqDetails;

		await this.fill(this.shippingFeeInput, formatedNumber(shippingFee));
	}

	async selectShippingTerm({ rfqDetails }) {
		const { shippingTerm } = rfqDetails;

		await this.click(this.shippingTermDropdown);
		await this.click(sprintf(this.shippingTermDropdownItem, shippingTerm));
	}

	async fillPaymentTerm({ rfqDetails }) {
		const { paymentTerm } = rfqDetails;

		await this.fill(this.paymentTermInput, formatedNumber(paymentTerm, 0));
	}

	async fillETA({ rfqDetails }) {
		const { ETA } = rfqDetails;

		await this.fill(this.etaInput, ETA.toString());
	}

	async fillUnitPrice({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { pricePerUnit } = rfqDetails;

		await this.fill(sprintf(this.subTotalWithTaxesInput, productName), formatedNumber(pricePerUnit));
	}

	async fillRemark({ rfqDetails }) {
		const { offerOfflineRemark } = rfqDetails;

		await this.fill(this.remarkInput, offerOfflineRemark);
	}

	async clickUpdateButton() {
		await this.click(this.updateButton);
	}

	async submit({ rfqId, productsDetails, vendorDetails, requestDetails, rfqDetails, organizationDetails }) {
		await this.validateOfferId({ rfqId });
		await this.validateVendorName({ vendorDetails });
		await this.validateVendorOfferCurrency({ organizationDetails });
		await this.fillShippingFee({ rfqDetails });
		await this.selectShippingTerm({ rfqDetails });
		await this.fillPaymentTerm({ rfqDetails });
		await this.fillETA({ rfqDetails });

		for (const productDetails of productsDetails) {
			await this.validateBrand({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.fillUnitPrice({ productDetails, rfqDetails });
			await this.selectTax({ productDetails, rfqDetails });
		}

		await this.fillRemark({ rfqDetails });
		await this.clickUpdateButton();

		await this.wait(2); // Wait for update offer offline to show up
	}
}
