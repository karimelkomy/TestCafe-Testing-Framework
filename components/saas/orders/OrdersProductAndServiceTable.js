import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../utilities/helpers';
import ProductAndServiceTable from '../../shared/ProductAndServiceTable';

export default class OrdersProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element = '//p-table[@data-test-id="product-and-service-table"]//tr[@data-test-id="product-row"][.//div[contains(text(), "%s")]]';
		const productNameText = `${element}//div[contains(text(), "%s")]`;
		const brandText = `${element}//span[text()= " %s "]`;
		const skuText = `${element}//span[@data-test-id="sku-text" and text()="%s"]`;
		const qtyText = `${element}//span[@data-test-id="qty-text" and text()="%s"]`;
		const etaText = `${element}//span[@data-test-id="eta-text" and text()="%s"]`;
		const unitPriceText = `${element}//penny-currency-text//span[@data-test-id="unit-%s-text" and contains(., "%s")]`;
		const subTotalText = `${element}//span[@data-test-id="sub-total-%s-text" and contains(., "%s")]`;
		const taxText = `${element}//penny-tax-summary[@data-test-id="taxes-text"]//span[text()="%s"]`;
		const totalText = `${element}//span[@data-test-id="total-with-tax-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			etaText,
			unitPriceText,
			subTotalText,
			taxText,
			totalText,
		});
	}

	async validateETA({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { ETA, ETAUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.etaText, productName, `${formatedNumber(ETA, 0)} ${ETAUnit}`));
	}

	async validateProductAndServiceTable({ requestDetails, rfqDetails, organizationDetails, productsDetails, markupDetails }) {
		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateETA({ productDetails, rfqDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails });
			await this.validateSubtotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
		}
	}
}
