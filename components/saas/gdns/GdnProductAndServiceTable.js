import { sprintf } from 'sprintf-js';
import ProductAndServiceTable from '../../shared/ProductAndServiceTable';

export default class GdnProductAndServiceTable extends ProductAndServiceTable {
	constructor() {
		const element =
			'//div[contains(@class, "bill-section")]//div[contains(@class, "grns-detail-table")]//div[contains(@class, "product-content")][.//div[@class="product-name" and contains(., "%s")]]';
		const productNameText = `${element}//div[@class="product-name" and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const skuText = `${element}/div[2]/span[text()="%s"]`;
		const qtyText = `${element}/div[4]/span[text()="%s"]`;
		const recievedQtyText = `${element}/div[6]/span[text()="%s"]`;
		const deliveredQtyText = `${element}/div[5]/span[text()="%s"]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			recievedQtyText,
			deliveredQtyText,
		});
		this.recievedQtyInput = `${element}//input`;
		this.recievedQtyAllInput =
			'//div[contains(@class, "bill-section")]//div[contains(@class, "grns-detail-table")]//div[contains(@class, "product-content")][.//div[@class="product-name"]]//input[not(@disabled)]';
	}

	async resetRecievedQty() {
		const elementCount = await this.getCount(this.recievedQtyAllInput);

		for (let rowId = 1; rowId <= elementCount; rowId++) {
			await this.fill(`(${this.recievedQtyAllInput})[${rowId}]`, '0');
		}
	}

	async fillReceivedQty({ productDetails, requestDetails }) {
		const { qty } = requestDetails;
		const { productName } = productDetails;

		await this.fill(sprintf(this.recievedQtyInput, productName), qty.toString());
		await this.click(sprintf(this.qtyText, productName, qty.toString())); // Click anywhere to show the submit button after filling
	}

	async validate({ deliveredQty, recievedQty, productRequest }) {
		const { requestDetails, productDetails, productsDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		for (const productDetails of productsDetailsValue) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateRecievedQty({ productDetails, recievedQty });
			await this.validateDeliveredQty({ productDetails, deliveredQty });
		}
	}

	async submit({ deliveredQty, recievedQty, productRequest }) {
		const { requestDetails, productDetails, productsDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		await this.resetRecievedQty();

		for (const productDetails of productsDetailsValue) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateRecievedQty({ productDetails, recievedQty });
			await this.validateDeliveredQty({ productDetails, deliveredQty });
			await this.fillReceivedQty({ productDetails, requestDetails });
		}
	}
}
