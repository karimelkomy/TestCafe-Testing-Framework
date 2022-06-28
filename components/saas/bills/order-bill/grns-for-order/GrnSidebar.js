import ProductAndServiceTable from '../../../../shared/ProductAndServiceTable';

export default class GrnSidebar extends ProductAndServiceTable {
	constructor() {
		const element =
			'//p-sidebar[@data-test-id="grn-sidebar"]//div[contains(@class, "product-content")][.//div[@class="product-name" and contains(., "%s")]]';
		const productNameText = `${element}//div[@class="product-name" and contains(., "%s")]`;
		const brandText = `${element}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const skuText = `${element}/div[2]/span[text()="%s"]`;
		const qtyText = `${element}/div[3]/span[text()="%s "]`;
		const recievedQtyText = `${element}/div[4]/span[text()="%s "]`;
		super({
			productNameText,
			brandText,
			skuText,
			qtyText,
			recievedQtyText,
		});
		this.closeButton = '//p-sidebar[@data-test-id="grn-sidebar"]//button[contains(@class, "p-sidebar-close")]';
	}

	async validateProductAndServiceTable({ requestDetails, productsDetails }) {
		const { qty } = requestDetails;

		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateRecievedQty({ productDetails, recievedQty: qty });
		}
	}

	async clickCloseButton() {
		await this.click(this.closeButton);
	}

	async submit({ requestDetails, productsDetails }) {
		await this.validateProductAndServiceTable({ requestDetails, productsDetails });
		await this.clickCloseButton();
	}
}
