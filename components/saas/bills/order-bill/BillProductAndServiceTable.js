import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class BillProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element = '//div[contains(@class, "bill-detail-container")]//tbody//tr[.//div[@class="product-name" and contains(., "%s")]]';
		const productNameText = `${element}//div[@class="product-name" and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const skuText = `${element}//span[@data-test-id="sku-text" and text()="%s"]`;
		const qtyText = `${element}//span[@data-test-id="qty-text" and text()="%s"]`;
		const taxText = `${element}//penny-tax-summary//span[text()="%s"]`;
		const unitPriceText = `${element}//span[@data-test-id="unit-%s-text" and contains(., "%s")]`;
		const subTotalText = `${element}//span[@data-test-id="subtotal-%s-text" and contains(., "%s")]`;
		const totalText = `${element}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			unitPriceText,
			taxText,
			subTotalText,
			totalText,
		});
	}

	async validateProductAndServiceTable({ requestDetails, rfqDetails, productsDetails, organizationDetails, markupDetails }) {
		for (const productDetails of productsDetails) {
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
