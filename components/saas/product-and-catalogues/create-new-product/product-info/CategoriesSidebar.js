import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { checkElementVisibility } from '../../../../../utilities/helpers';
import { imagePath } from '../../../../../data/saas/constants/documentsPath';

export default class CategoriesSidebar extends GenericElement {
	constructor() {
		super();
		this.createNewCategoryButton = '//p-sidebar//button[@data-test-id="create-new-category-button"]';
		this.categoryNameEnglishInput = '//p-sidebar//input[@data-test-id="category-name-input-english"]';
		this.categoryNameArabicInput = '//p-sidebar//input[@data-test-id="category-name-input-arabic"]';
		this.uploadImageInput = '//penny-upload[@data-test-id="choose-image-upload"]//input';
		this.uploadedImage = '//button[@label="Remove"]';
		this.createCategoryButton = '//p-sidebar//button[@data-test-id="create-category-button"]';
		this.categoryCheckbox =
			'//div[@data-test-id="category-row"][.//p[@data-test-id="category-name-text" and .="%s"]]//p-checkbox[@data-test-id="category-checkbox"]';
		this.categoryDeleteButton =
			'//div[@data-test-id="category-row"][.//p[@data-test-id="category-name-text" and .="%s"]]//button[@data-test-id="delete-category-button"]';
		this.deleteButton = '//p-confirmdialog//button[@data-test-id="delete-button"]';
		this.doneButton = '//penny-categories-sidebar//button[@data-test-id="done-button"]';
	}

	async selectCategory({ categoryName }) {
		await this.click(sprintf(this.categoryCheckbox, categoryName));
		await this.click(this.doneButton);
	}

	async createNewCategory({ categoryName }) {
		await this.click(this.createNewCategoryButton);
		await this.fill(this.categoryNameEnglishInput, categoryName);
		// await this.fill(this.categoryNameArabicInput, categoryName); // Arabic field appear only for Saudi Arabia
		await this.uploadFile(imagePath.category, this.uploadImageInput);
		await this.validateElementVisibility(this.uploadedImage);
		await this.click(this.createCategoryButton);
	}

	async create({ categoryName }) {
		const categoryCheckbox = sprintf(this.categoryCheckbox, categoryName);

		if (!(await checkElementVisibility(categoryCheckbox))) {
			await this.createNewCategory({ categoryName });
		}

		await this.selectCategory({ categoryName });
	}

	async delete({ categoryName }) {
		await this.click(sprintf(this.categoryDeleteButton, categoryName));
		await this.click(this.deleteButton);
	}
}
