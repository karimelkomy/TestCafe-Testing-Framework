import { sprintf } from 'sprintf-js';
import { formatedNumber, isGaiat } from '../../../../utilities/helpers';
import UnitProductPrice from '../../shared/UnitProductPrice';
import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class RfqProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element =
			'//tr[@data-test-id="product-row"][.//penny-product-view[@data-test-id="product-and-service-text"]//div[contains(text(), "%s")]]';
		const productNameText = `${element}//penny-product-view[@data-test-id="product-and-service-text"]//div[contains(text(), "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and contains(text(), "%s")]`;
		const skuText = `${element}//span[@data-test-id="sku-text" and contains(text(), "%s")]`;
		const qtyText = `${element}//span[@data-test-id="qty-text" and text()="%s"]`;
		const taxText = `${element}/td[5]//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]`;
		const unitPriceText = `(${element}/td[4]//span[@data-test-id="subtotal-%s-text" and contains(., "%s")])[1]`;
		const totalText = `${element}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			taxText,
			unitPriceText,
			totalText,
		});
		this.unitProductPrice = new UnitProductPrice();
		this.negotiatedUnitPriceText = `${element}//td[./span[text()=" Negotiation "]]//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]`;
		this.acceptNegotiatedTotalText = `${element}//td[./span[text()=" Negotiation "]]//span[text()="ACCEPT"]`;
		this.etaInput = `${element}//p-inputnumber[@data-test-id="eta-input"]//input`;
		this.etaText = `${element}//span[@data-test-id="eta-text" and contains(text(), "%s")]`;
		this.etaInputText = `${element}//span[@data-test-id="eta-text"]`;
		this.pricePerUnitInput = `${element}//p-inputnumber[@data-test-id="unit-price-input"]//input`;
		this.taxesDropdown = '//thead//p-multiselect[@placeholder="Select"]';
		this.taxesDropdownItem = '//thead//p-multiselectitem//div[@class="p-checkbox-box"]';
	}

	async validateSku({ productDetails }) {
		const { productName, sku } = productDetails;

		if (sku !== '-') {
			await this.validateElementVisibility(sprintf(this.skuText, productName, sku));
		}
	}

	async validateETA({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { ETA } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.etaText, productName, ETA));
	}

	async fillETA({ productName, rfqDetails }) {
		const { ETA } = rfqDetails;

		await this.click(sprintf(this.etaInputText, productName));
		await this.fill(sprintf(this.etaInput, productName), ETA.toString());
	}

	async selectTaxes({ rfqDetails }) {
		const { tax, taxType } = rfqDetails;

		if (tax && taxType) {
			await this.click(this.taxesDropdown);
			await this.click(this.taxesDropdownItem);
		}
	}

	async fillPricePerUnit({ rfqDetails, productName, basePrice, markupDetails }) {
		const price = this.productPrice.getUnitPrice({ rfqDetails, basePrice, markupDetails });

		await this.fill(sprintf(this.pricePerUnitInput, productName), formatedNumber(price));
	}

	async fillProductAndServiceInfo({ rfqDetails, productsDetails, markupDetails }) {
		await this.selectTaxes({ rfqDetails });

		for (const productDetails of productsDetails) {
			const { productName, basePrice } = productDetails;

			await this.fillETA({ productName, rfqDetails });
			await this.fillPricePerUnit({ rfqDetails, productName, basePrice, markupDetails });
			await this.click(sprintf(this.etaInputText, productName)); // TODO: to be removed once we have automatic update for price field after change the value
		}
	}

	async validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;
		const subTotal = this.productPrice.getSubTotalPrice({ requestDetails, rfqDetails, basePrice, markupDetails });
		const taxes = this.productPrice.getTaxAmount({ subTotal, rfqDetails });

		await this.validateElementVisibility(sprintf(this.taxText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.taxText, productName, 'price', formatedNumber(taxes)));
	}

	async validateNegotiatedUnitPrice({ productName, rfqDetails, organizationDetails }) {
		const { currencyCode } = organizationDetails;
		const price = isGaiat(organizationDetails) ? this.unitProductPrice.getUnitPriceWithTax({ rfqDetails }) : rfqDetails.pricePerUnit;

		await this.validateElementVisibility(sprintf(this.negotiatedUnitPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.negotiatedUnitPriceText, productName, 'price', formatedNumber(price)));
	}

	async validateContractPrice({ requestDetails, vendorDetails, organizationDetails }) {
		const { currencyCode } = organizationDetails;
		const { contractDetails, rfqDetails } = vendorDetails;
		const { qty } = requestDetails;

		// TODO: handle base price and negoitated and revision price
		if (contractDetails) {
			const { productsDetails } = contractDetails;

			for (const productDetails of productsDetails) {
				const { productName, contractPrice } = productDetails;
				const taxes = this.productPrice.getTaxAmount({ subTotal: contractPrice, rfqDetails });

				const contractUnitPrice = contractPrice + taxes;
				const contractSubTotalPrice = contractUnitPrice * qty;

				if (isGaiat(organizationDetails)) {
					await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'currency', currencyCode));
					await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'price', formatedNumber(contractUnitPrice)));
				}

				await this.validateElementVisibility(sprintf(this.totalText, productName, 'currency', currencyCode));
				await this.validateElementVisibility(sprintf(this.totalText, productName, 'price', formatedNumber(contractSubTotalPrice)));
			}
		}
	}

	async acceptNegotiatedUnitPrice({ productName }) {
		await this.click(sprintf(this.acceptNegotiatedTotalText, productName));
	}

	async validateProductAndService({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
		}
	}

	async submitProductAndServiceInfo({ organizationDetails, requestDetails, rfqDetails, productsDetails, vendorDetails, markupDetails }) {
		// TODO: Mark product unavailable
		await this.validateContractPrice({ requestDetails, vendorDetails, organizationDetails });
		await this.fillProductAndServiceInfo({ rfqDetails, productsDetails, markupDetails });
		await this.validateProductAndService({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });
	}

	async validateSubmittedProductAndServiceTable({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		await this.validateProductAndService({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails });

		for (const productDetails of productsDetails) {
			await this.validateETA({ productDetails, rfqDetails });

			if (isGaiat(organizationDetails)) {
				await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails });
			}
		}
	}

	async submitNegotiation({ organizationDetails, rfqDetails, productsDetails }) {
		for (const productDetails of productsDetails) {
			const { productName } = productDetails;

			await this.fillETA({ productName, rfqDetails });
			await this.validateNegotiatedUnitPrice({ productName, rfqDetails, organizationDetails });
			await this.acceptNegotiatedUnitPrice({ productName });
		}
	}
}
