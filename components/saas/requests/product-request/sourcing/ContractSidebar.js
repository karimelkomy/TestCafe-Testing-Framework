import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { formatedNumber, formatedNumberWithoutComma } from '../../../../../utilities/helpers';

export default class ContractSidebar extends GenericElement {
	constructor() {
		super();
		this.element =
			'//penny-contract-sidebar//div[@data-test-id="product-and-service-text"][.//penny-product-view//div[contains(text(), "%s")]]';
		this.contractNumberButton =
			'//tr[@data-test-id="product-row"][.//penny-product-view[@data-test-id="product-name-text"]//div[contains(text(), "%s")]]//td[./span[text()="CONTRACT"]]//span[contains(text(), "#")]';
		this.vendorNameText = '//penny-contract-sidebar//div[@data-test-id="vendor-name-value" and .="%s"]';
		this.paymentTermText = '//penny-contract-sidebar//div[@data-test-id="payment-term-value" and .="%s"]';
		this.productNameText = `${this.element}//div[@data-test-id="product-name-text" and contains(., "%s")]`;
		this.brandText = `${this.element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		this.skuText = `${this.element}//div[@data-test-id="sku-text" and text()="%s"]`;
		this.qtyText = `${this.element}//div[@data-test-id="qty-text" and text()="%s"]`;
		this.closeButton = '//penny-contract-sidebar//button[contains(@class, "p-sidebar-close")]';
	}

	async clickContractNumberButton({ productName }) {
		await this.click(sprintf(this.contractNumberButton, productName));
	}

	async clickCloseButton() {
		await this.click(this.closeButton);
	}

	async validateVendorName({ vendorName }) {
		await this.validateElementVisibility(sprintf(this.vendorNameText, vendorName));
	}

	async validatePaymentTerm({ paymentTerm, paymentTermUnit }) {
		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName, productName));
	}

	async validateBrand({ productName, brand }) {
		await this.validateElementVisibility(sprintf(this.brandText, productName, brand));
	}

	async validateSku({ productName, sku }) {
		await this.validateElementVisibility(sprintf(this.skuText, productName, sku));
	}

	async validateQty({ productName, qty }) {
		await this.validateElementVisibility(sprintf(this.qtyText, productName, formatedNumberWithoutComma(qty, 0)));
	}

	async validate({ vendorDetails }) {
		// TODO: validate contract start and end date
		const { vendorName, contractDetails } = vendorDetails;
		const { productsDetails, qty, paymentTerm, paymentTermUnit } = contractDetails;

		for (const productDetails of productsDetails) {
			const { productName } = productDetails;

			await this.clickContractNumberButton({ productName });
			await this.validateVendorName({ vendorName });
			// await this.validatePaymentTerm({ paymentTerm, paymentTermUnit }); // BUG: payment term removed

			for (const productDetails of productsDetails) {
				const { productName, brand, sku } = productDetails;

				await this.validateProductName({ productName });
				await this.validateBrand({ productName, brand });
				await this.validateSku({ productName, sku });
				await this.validateQty({ productName, qty });
			}

			await this.clickCloseButton();
		}
	}
}
