import { sprintf } from 'sprintf-js';
import { formatedNumber, isStc, isEnterprise } from '../../../../utilities/helpers';
import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class OfferProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element =
			'//penny-rfq-details-table-product-list[@data-test-id="rfq-details-table-product-list"]//div[contains(@class, "rfq-table-product-row")][.//div[contains(@class, "product-name") and contains(., "%s")]]';
		const productNameText = `${element}//div[contains(@class, "product-name") and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and contains(text(), "%s")]`;
		const skuText = `${element}//div[@data-test-id="sku-text" and contains(text(), "%s")]`;
		const qtyText = `${element}//div[@data-test-id="qty-text" and contains(text(), "%s")]`;
		const etaText = `${element}//div[@data-test-id="eta-text" and contains(., "%s")]`;
		const unitPriceText = `${element}//span[@data-test-id="unit-%s-text" and contains(., "%s")]`;
		const totalText = `${element}//span[@data-test-id="total-%s-text" and contains(., "%s")]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			etaText,
			unitPriceText,
			totalText,
		});
		this.taxText = `${element}//penny-tax-summary[@data-test-id="taxes-text"]//span[text()="%s"]`;
	}

	async validateTaxPrice({ productDetails, requestDetails, rfqDetails, organizationDetails, markupDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;

		// BUG: Taxes is missed from bulk product request in reseller
		if (isEnterprise(organizationDetails) || isStc(organizationDetails)) {
			const subTotal = this.productPrice.getSubTotalPrice({ requestDetails, rfqDetails, basePrice, markupDetails });
			const taxes = this.productPrice.getTaxAmount({ subTotal, rfqDetails });

			await this.validateElementVisibility(sprintf(this.taxText, productName, currencyCode));
			await this.validateElementVisibility(sprintf(this.taxText, productName, formatedNumber(taxes)));
		}
	}

	async validateProductAndServiceTable({ productsDetails, requestDetails, rfqDetails, organizationDetails, markupDetails }) {
		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateETA({ productDetails, rfqDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails, markupDetails });
			await this.validateTaxPrice({ productDetails, requestDetails, rfqDetails, organizationDetails, markupDetails });
			await this.validateTotalPrice({ productDetails, rfqDetails, requestDetails, organizationDetails, markupDetails });
		}
	}
}
