import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class OfferProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element = '//div[@class="request-table"]//div[contains(@class, "rfq-table-product-row")][.//div[contains(text(), "%s")]]';
		const productNameText = `${element}//div[contains(text(), "%s")]`;
		const brandText = `${element}//span[text()= " %s "]`;
		const skuText = `${element}//div[@data-test-id="sku-text" and text()=" %s "]`;
		const qtyText = `${element}//div[@data-test-id="qty-text" and text()=" %s "]`;
		const etaText = `${element}//div[@data-test-id="eta-text" and .=" %s"]`;
		const unitPriceText = `${element}//span[@data-test-id="unit-%s-text" and contains(., "%s")]`;
		const taxText = `${element}//penny-tax-summary[@data-test-id="taxes-text"]//span[text()="%s"]`;
		const totalText = `${element}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			etaText,
			unitPriceText,
			taxText,
			totalText,
		});
	}

	async validate({ productRequest }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails } = productRequest;

		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateETA({ productDetails, rfqDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails });
		}
	}

	async validateClient({ productRequest }) {
		const { requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails } = productRequest;

		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateETA({ productDetails, rfqDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
		}
	}
}
