import ProductAndServiceTable from '../../shared/ProductAndServiceTable';

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
		this.saveButton = '//p-sidebar[@data-test-id="grn-sidebar"]//button[@data-test-id="submit-button"]';
		this.closeButton = '//p-sidebar[@data-test-id="grn-sidebar"]//button[contains(@class, "p-sidebar-close")]';
		this.uploadedInvoiceChip = '//p-sidebar[@data-test-id="grn-sidebar"]//div[contains(@class, "files-container")][.//a]';
	}

	async validateUploadedInvoice() {
		await this.validateElementVisibility(this.uploadedInvoiceChip);
	}

	async validateProductAndServiceTable({ recievedQty, productRequest }) {
		const { requestDetails, productDetails, productsDetails } = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		for (const productDetails of productsDetailsValue) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
			await this.validateQty({ productDetails, requestDetails });
			await this.validateRecievedQty({ productDetails, recievedQty });
		}
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async clickCloseButton() {
		await this.click(this.closeButton);
	}

	async submit({ recievedQty, productRequest }) {
		await this.validateProductAndServiceTable({ recievedQty, productRequest });
		await this.clickSaveButton();
	}

	async validate({ recievedQty, invoice, productRequest }) {
		if (invoice) {
			await this.validateUploadedInvoice();
		}

		await this.validateProductAndServiceTable({ recievedQty, productRequest });

		await this.clickCloseButton();
	}
}
