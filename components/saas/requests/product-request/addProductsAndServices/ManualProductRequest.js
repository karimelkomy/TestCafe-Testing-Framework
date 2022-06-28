import GenericElement from '../../../../shared/core/GenericElement';
import { imagePath } from '../../../../../data/saas/constants/documentsPath';

export default class ManualProductRequest extends GenericElement {
	constructor() {
		super();
		this.addItemManuallyButton = '//div[contains(@class, "display-none")]//button[@data-test-id="add-item-manually-button"]';
		this.englishProductNameInput = '//input[@data-test-id="product-name-english-input"]';
		this.arabicProductNameInput = '//input[@data-test-id="product-name-arabic-input"]';
		this.qtyInput = '//p-inputnumber[@data-test-id="quantity-input"]//input';
		this.brandInput = '//input[@data-test-id="product-brand-input"]';
		this.descriptionInput = '//textarea[@data-test-id="description-input"]';
		this.uploadImageInput = '//penny-upload[@data-test-id="upload-images"]//input';
		this.addItemButton = '//button[@data-test-id="add-item-button"]';
	}

	async clickAddItemManuallyButton() {
		await this.click(this.addItemManuallyButton);
	}

	async fillEnglishProductName({ productName }) {
		await this.fill(this.englishProductNameInput, productName);
	}

	async fillArabicProductName({ productName }) {
		await this.fill(this.arabicProductNameInput, productName);
	}

	async fillQty({ qty }) {
		await this.fill(this.qtyInput, qty.toString());
	}

	async fillBrand({ brand }) {
		await this.fill(this.brandInput, brand);
	}

	async fillDescription({ description }) {
		await this.fill(this.descriptionInput, description);
	}

	async uploadProductImage() {
		await this.uploadFile(imagePath.product, this.uploadImageInput);
	}

	async clickAddItemButton() {
		await this.click(this.addItemButton);
	}

	async submit({ productsDetails, requestDetails }) {
		const { qty } = requestDetails;

		await this.clickAddItemManuallyButton();

		for (const productDetails of productsDetails) {
			const { productName, brand, description } = productDetails;

			await this.fillEnglishProductName({ productName });
			// await this.fillArabicProductName({ productName }); // Arabic field appear only for Saudi Arabia
			await this.fillQty({ qty });
			await this.fillBrand({ brand });
			await this.fillDescription({ description });
			await this.uploadProductImage();
			await this.clickAddItemButton();
		}
	}
}
