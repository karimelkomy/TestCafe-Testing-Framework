import ProductAndServiceTable from '../../shared/ProductAndServiceTable';

export default class EInvoiceProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element = '//tbody[@class="p-datatable-tbody"]//tr[.//div[@class="product-name" and contains(., "%s")]]';
		const productNameText = `${element}//div[@class="product-name" and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const qtyText = `${element}//td[2]/span[text()="%s"]`;
		const unitPriceText = `${element}//td[3]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]`;
		const taxText = `${element}//penny-tax-summary[@data-test-id="taxes-text"]//span[text()="%s"]`;
		const subTotalText = `${element}//td[4]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]`;
		const totalText = `${element}//td[6]//span[@data-test-id="unit-price-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			qtyText,
			unitPriceText,
			taxText,
			subTotalText,
			totalText,
		});
	}

	async validate({ productRequest }) {
		const { requestDetails, rfqDetails, productDetails, productsDetails, organizationDetails, markupDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		for (const productDetails of productsDetailsValue) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails });
			await this.validateSubtotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
		}
	}
}
