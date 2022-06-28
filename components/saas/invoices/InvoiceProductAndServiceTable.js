import ProductAndServiceTable from '../../shared/ProductAndServiceTable';

export default class InvoiceProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element =
			'//div[contains(@class, "table-container")]//div[contains(@class, "product-content")][.//div[@class="product-name" and contains(., "%s")]]';
		const productNameText = `${element}//div[@class="product-name" and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const skuText = `${element}//div[@data-test-id="sku-text" and text()="%s"]`;
		const qtyText = `${element}//span[@data-test-id="qty-text" and text()="%s"]`;
		const unitPriceText = `${element}//span[@data-test-id="unit-price-price-text-%s-text" and contains(., "%s")]`;
		const subTotalText = `${element}//span[@data-test-id="subtotal-price-text-%s-text" and contains(., "%s")]`;
		const taxText = `${element}//penny-tax-summary[@data-test-id="taxes-text"]//span[text()="%s"]`;
		const totalText = `${element}//span[@data-test-id="total-price-text-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			unitPriceText,
			subTotalText,
			taxText,
			totalText,
		});
	}

	async validateProductAndServiceTable({ productRequest }) {
		const { requestDetails, rfqDetails, productDetails, productsDetails, organizationDetails, markupDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		for (const productDetails of productsDetailsValue) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails });
			await this.validateSubtotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
		}
	}
}
