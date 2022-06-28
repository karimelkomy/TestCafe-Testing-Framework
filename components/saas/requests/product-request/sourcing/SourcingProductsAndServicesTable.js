import { sprintf } from 'sprintf-js';
import { formatedNumber, formatedNumberWithoutComma } from '../../../../../utilities/helpers';
import ProductAndServiceTable from '../../../../shared/ProductAndServiceTable';

export default class SourcingProductsAndServicesTable extends ProductAndServiceTable {
	constructor() {
		const element =
			'//tr[@data-test-id="product-row"][.//penny-product-view[@data-test-id="product-name-text"]//div[contains(text(), "%s")]]';
		const productNameText = `${element}//penny-product-view[@data-test-id="product-name-text"]//div[contains(text(), "%s")]`;
		const brandText = `${element}//penny-product-view[@data-test-id="product-name-text"]//span[text()= " %s "]`;
		const skuText = `${element}//span[@data-test-id="sku-text" and text()="%s"]`;
		const qtyText = `${element}//span[@data-test-id="qty-text" and text()="%s"]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
		});
		this.unitPriceText = `${element}//span[@data-test-id="unit-%s-text" and contains(., "%s")]`;
		this.contractPriceText = `${element}//span[@data-test-id="contract-%s-text" and contains(., "%s")]`;
		this.contractQuantityText = `${element}//span[@data-test-id="quantity-text" and text()= "%s"]`;
		this.notApplicableContract = `${element}//td[./span[text()="CONTRACT"]]//span[text()="NA"]`;
	}

	async validateUnitPrice({ productDetails, organizationDetails }) {
		const { productName, basePrice } = productDetails;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.unitPriceText, productName, 'price', formatedNumber(basePrice)));
	}

	async validateContractPrice({ productName, contractPrice, rfqDetails, organizationDetails }) {
		const { currencyCode } = organizationDetails;
		const price = contractPrice + this.productPrice.getTaxAmount({ subTotal: contractPrice, rfqDetails });

		await this.validateElementVisibility(sprintf(this.contractPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.contractPriceText, productName, 'price', formatedNumber(price)));
	}

	async validateContractQuantity({ productName, contractDetails }) {
		const { qty } = contractDetails;

		await this.validateElementVisibility(sprintf(this.contractQuantityText, productName, formatedNumberWithoutComma(qty, 0)));
	}

	async validateNoContract({ productName }) {
		await this.validateElementVisibility(sprintf(this.notApplicableContract, productName));
	}

	async validateContract({ productDetails, vendorsDetails, organizationDetails }) {
		const { productName, contractPrice } = productDetails;

		if (vendorsDetails && vendorsDetails[0] && vendorsDetails[0].contractDetails) {
			const vendorDetails = vendorsDetails[0];
			const { rfqDetails, contractDetails } = vendorDetails;

			await this.validateContractPrice({ productName, contractPrice, rfqDetails, organizationDetails });
			await this.validateContractQuantity({ productName, contractDetails });
		} else {
			await this.validateNoContract({ productName });
		}
	}

	async validate({ productsDetails, requestDetails, organizationDetails, vendorsDetails }) {
		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateUnitPrice({ productDetails, organizationDetails });
			await this.validateContract({ productDetails, vendorsDetails, organizationDetails });
		}
	}
}
