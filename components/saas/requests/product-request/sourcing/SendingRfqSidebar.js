import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { formatedNumberWithoutComma } from '../../../../../utilities/helpers';
import PaymentTermMode from '../../../../../data/saas/constants/PaymentTermMode';

export default class SendingRfqSidebar extends GenericElement {
	constructor() {
		super();
		this.submitRfqButton = '//button[@data-test-id="submit-rfq-button"]';
		this.vendorText = '//penny-sourcing-sidebar-item//span[contains(text(), "%s")]';
		this.plusMinusButton = '//penny-sourcing-sidebar-item[.//span[contains(text(), "%s")]]//i';
		this.productRow =
			'//penny-sourcing-sidebar-item[.//span[contains(text(), "%s")]]//div[contains(@class, "items-container")][.//div[@class="product-name" and contains(., "%s")]]';
		this.productNameText = `${this.productRow}//div[@class="product-name" and contains(., "%s")]`;
		this.brandText = `${this.productRow}//span[@data-test-id="brand-text" and contains(., "%s")]`;
		this.qtyText = `${this.productRow}//span[@data-test-id="qty-text" and text()="%s"]`;
		this.contactInfoText = '//p-dropdown[@data-test-id="contact-info-dropdown" and .="%s (%s)"]';
		this.copyRequestRemarksButton = '//button[@data-test-id="copy-req-remarks-button"]';
		this.remarkInput = '//p-editor[@data-test-id="comments-input"]//div[contains(@class, "ql-editor")]';
		this.remarkText = `${this.remarkInput}/p[text()="%s"]`;
		this.creditTermDropdown = '//span[./label[text()="Payment Term"]]//p-multiselect';
		this.creditTermSelectAllDropdownItem =
			'(//span[./label[text()="Payment Term"]]//p-multiselect//div[contains(@class, "p-multiselect-header")]//span)[1]';
	}

	async clickSubmitRfqButton() {
		await this.click(this.submitRfqButton);
	}

	async clickPlusMinusButton({ vendorName }) {
		await this.click(sprintf(this.plusMinusButton, vendorName));
	}

	async validateVendorName({ vendorName }) {
		await this.validateElementVisibility(sprintf(this.vendorText, vendorName));
	}

	async validateProductName({ productName, vendorName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, vendorName, productName, productName));
	}

	async validateBrand({ productName, brand, vendorName }) {
		await this.validateElementVisibility(sprintf(this.brandText, vendorName, productName, brand));
	}

	async validateQty({ productName, qty, vendorName }) {
		await this.validateElementVisibility(sprintf(this.qtyText, vendorName, productName, formatedNumberWithoutComma(qty, 0)));
	}

	async validateContactInfo({ eSourceAdminUserDetails }) {
		const { firstName, lastName, email } = eSourceAdminUserDetails;

		await this.validateElementVisibility(sprintf(this.contactInfoText, `${firstName} ${lastName}`, email));
	}

	async clickCopyRequestRemarksButton() {
		await this.click(this.copyRequestRemarksButton);
	}

	async fillRemark({ remark }) {
		await this.fill(this.remarkInput, remark);
	}

	async validateRemark({ remark }) {
		await this.validateElementVisibility(sprintf(this.remarkText, remark));
	}

	async selectPaymentTermItem({ paymentTermMode }) {
		if (paymentTermMode === PaymentTermMode.TEXT) {
			await this.click(this.creditTermDropdown);
			await this.click(this.creditTermSelectAllDropdownItem);
		}
	}

	async addRemark({ requestDetails }) {
		const { requestInfoRemark, sourcingRemark } = requestDetails;
		const remark = requestInfoRemark || sourcingRemark;

		if (requestInfoRemark) {
			await this.clickCopyRequestRemarksButton();
		} else {
			await this.fillRemark({ remark: sourcingRemark });
		}

		await this.validateRemark({ remark });
	}

	async validateVendorRfqDetails({ vendorsDetails, productsDetails, requestDetails }) {
		const { qty } = requestDetails;

		for (let vendorDetails of vendorsDetails) {
			const { vendorName } = vendorDetails;

			await this.clickPlusMinusButton(vendorDetails);

			for (const productDetails of productsDetails) {
				const { productName, brand } = productDetails;

				await this.validateVendorName({ vendorName });
				await this.validateProductName({ productName, vendorName });
				await this.validateBrand({ productName, brand, vendorName });
				await this.validateQty({ productName, qty, vendorName });
			}
		}
	}

	async submit({ paymentTermMode, vendorsDetails, productsDetails, eSourceAdminUserDetails, requestDetails }) {
		// TODO: Change expiry and delivery date to validate on them on vendor app
		// TODO: Create service request
		// TODO: add attachment to validate on them on vendor app
		await this.selectPaymentTermItem({ paymentTermMode });
		await this.addRemark({ requestDetails });
		await this.validateVendorRfqDetails({ vendorsDetails, productsDetails, requestDetails });
		await this.validateContactInfo({ eSourceAdminUserDetails });
		await this.clickSubmitRfqButton();
	}
}
