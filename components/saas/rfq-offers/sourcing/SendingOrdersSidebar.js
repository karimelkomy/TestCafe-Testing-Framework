import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../../utilities/helpers';
import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class SendingOrdersSidebar extends ProductAndServiceTable {
	constructor() {
		const element = '//p-sidebar[@data-test-id="sennding-orders-sidebar"]';
		const productRow = `${element}//div[contains(@class, "items-container")][.//div[@data-test-id="product-name-text" and contains(., "%s")]]`;
		const productNameText = `${productRow}//div[@data-test-id="product-name-text" and contains(., "%s")]`;
		const brandText = `${productRow}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const qtyText = `${productRow}//span[@data-test-id="qty-text" and text()="%s"]`;
		const taxDropdown = `${productRow}//p-multiselect[@defaultlabel="TAX"]`;
		const taxDropdownItem = `${productRow}//p-multiselectitem//div[@class="p-checkbox-box"]`;
		super({
			productNameText,
			brandText,
			qtyText,
			taxDropdown,
			taxDropdownItem,
		});
		this.vendorNameText = `${element}//span[contains(text(), "ORDER #") and contains(text(), "%s")]`;
		this.totalPriceText = `${productRow}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
		this.pricePerUnitInput = `${productRow}//p-inputnumber[@data-test-id="price-unit-input"]//input`;
		this.shippingFeeInput = `${element}//p-inputnumber[@data-test-id="shipping-fee-input"]//input`;
		this.shippingTermDropdown = `${element}//p-dropdown[@data-test-id="shipping-term-dropdown"]`;
		this.shippingTermDropdownItem = `${element}//p-dropdownitem/li[@aria-label="%s"]`;
		this.paymentTermInput = `${element}//p-inputnumber[@data-test-id="payment-term-input"]//input`;
		this.etaInput = `${element}//p-inputnumber[@data-test-id="eta-for-order-input"]//input`;
		this.submitOrdersButton = `${element}//button[@data-test-id="submit-orders-button"]`;
	}

	async validateVendorName({ vendorDetails }) {
		const { vendorName } = vendorDetails;

		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validateCatalogPrice({ requestDetails, productDetails, organizationDetails }) {
		const { productName, basePrice, contractPrice } = productDetails;
		const { qty } = requestDetails;
		const { currencyCode } = organizationDetails;
		const unitPrice = contractPrice || basePrice;
		const totalPrice = formatedNumber(unitPrice * qty);

		await this.validateElementVisibility(sprintf(this.totalPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.totalPriceText, productName, 'price', formatedNumber(totalPrice)));
	}

	async fillPricePerUnit({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { pricePerUnit } = rfqDetails;

		await this.fill(sprintf(this.pricePerUnitInput, productName), formatedNumber(pricePerUnit));
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

	async fillEta({ rfqDetails }) {
		const { ETA } = rfqDetails;

		await this.fill(this.etaInput, ETA.toString());
	}

	async clickSubmitOrdersButton() {
		await this.click(this.submitOrdersButton);
	}

	async submit({ vendorsDetails, requestDetails, rfqDetails, productsDetails, organizationDetails }) {
		// TODO: Create service request
		// TODO: add comment and attachment to validate on them
		// TODO: add taxes
		const vendorDetails = vendorsDetails[0];

		await this.validateVendorName({ vendorDetails });

		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateCatalogPrice({ requestDetails, productDetails, organizationDetails });

			if (!vendorDetails.contractDetails) {
				await this.fillPricePerUnit({ productDetails, rfqDetails });
				await this.selectTax({ productDetails, rfqDetails });
			}
		}

		await this.fillShippingFee({ rfqDetails });
		await this.selectShippingTerm({ rfqDetails });
		await this.fillPaymentTerm({ rfqDetails });
		await this.fillEta({ rfqDetails });
		await this.clickSubmitOrdersButton();
	}
}
