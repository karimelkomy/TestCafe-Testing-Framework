import { sprintf } from 'sprintf-js';
import { formatedNumber } from '../../../../utilities/helpers';
import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class OrderProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element = '//p-table//tr[.//div[@class="product-name"]/div[contains(., "%s")]]';
		const productNameText = `${element}//div[@class="product-name"]/div[contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const skuText = `${element}//td[2]//div[text()="%s"]`;
		const qtyText = `${element}//span[@data-test-id="qty-text" and text()="%s"]`;
		const etaText = `${element}//span[@data-test-id="eta-text"]/span[contains(., "%s")]`;
		const taxText = `${element}//penny-tax-summary[@data-test-id="taxes-text"]//span[text()="%s"]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			etaText,
			taxText,
		});
		this.unitPriceText = `${element}//span[@data-test-id="unit-price-price-text-%s-text" and contains(., "%s")]`;
		this.totalText = `${element}//span[@data-test-id="total-price-text-%s-text" and contains(., "%s")]`;
	}

	async validateETA({ productDetails, rfqDetails }) {
		const { productName } = productDetails;
		const { ETA, ETAUnit } = rfqDetails;

		await this.validateElementVisibility(sprintf(this.etaText, productName, `${formatedNumber(ETA, 0)}`));
		await this.validateElementVisibility(sprintf(this.etaText, productName, `${ETAUnit}`));
	}

	async validateAvailability({ productDetails }) {
		const { productName } = productDetails;

		await this.validateElementVisibility(sprintf(this.etaText, productName, 'Available'));
	}

	async validateUnitPrice({ productDetails, rfqDetails, organizationDetails }) {
		const { productName } = productDetails;
		const { currencyCode } = organizationDetails;
		const price = this.productPrice.getUnitPrice({ rfqDetails });

		await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'price', formatedNumber(price)));
	}

	async validateTotalPrice({ productDetails, requestDetails, rfqDetails, organizationDetails }) {
		const { productName } = productDetails;
		const { currencyCode } = organizationDetails;
		const totalWithTaxPrice = this.productPrice.getTotalWithTaxPrice({ requestDetails, rfqDetails });

		await this.validateElementVisibility(sprintf(this.totalText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.totalText, productName, 'price', formatedNumber(totalWithTaxPrice)));
	}

	async validateProductAndServiceTable({ productRequest }) {
		const { organizationDetails, requestDetails, rfqDetails, productsDetails } = productRequest;

		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateETA({ productDetails, rfqDetails });
			await this.validateAvailability({ productDetails });
			await this.validateUnitPrice({ productDetails, rfqDetails, organizationDetails });
			await this.validateTaxPrice({ productDetails, rfqDetails, requestDetails, organizationDetails });
			await this.validateTotalPrice({ productDetails, requestDetails, rfqDetails, organizationDetails });
		}
	}
}
