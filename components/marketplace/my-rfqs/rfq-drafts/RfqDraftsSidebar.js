import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber, formatedNumberWithoutComma } from '../../../../utilities/helpers';

export default class RfqDraftsSidebar extends GenericElement {
	constructor() {
		super();
		this.elemnet = '//penny-marketplace-review-draft-sidebar';
		this.supplierOrganizationNameText = `${this.elemnet}//penny-marketplace-chips//span[text()="%s"]`;
		this.rfqDetailsText = `${this.elemnet}//span[contains(text(), "%s")]`;
		this.productNameText = `${this.elemnet}//div[@data-test-id="product-name-text" and text()=" %s "]`;
		this.brandNameText = `${this.elemnet}//span[@data-test-id="brand-text" and text()=" %s "]`;
		this.moqText = `${this.elemnet}//td[2]/span[text()="%s unit"]`;
		this.etaText = `${this.elemnet}//td[3]/span[text()="%s"]`;
		this.qtyText = `${this.elemnet}//td[4]//span[text()="%s"]`;
		this.remarkText = `${this.elemnet}//p[contains(@class, "custom-editor-remarks") and .="%s"]`;
		this.uploadedDocumentChip = `${this.elemnet}//penny-marketplace-remarks-attachment//ul`;
		this.sendRfqButton = `${this.elemnet}//button[@data-test-id="confirm-button"]`;
	}

	async validateSupplierOrganizationName({ organizationName }) {
		await this.validateElementVisibility(sprintf(this.supplierOrganizationNameText, organizationName));
	}

	async validateRequestTitle({ requestTitle }) {
		await this.validateElementVisibility(sprintf(this.rfqDetailsText, requestTitle));
	}

	async validateDeliveryLocation({ locationName }) {
		await this.validateElementVisibility(sprintf(this.rfqDetailsText, locationName));
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName));
	}

	async validateBrandName({ brand }) {
		await this.validateElementVisibility(sprintf(this.brandNameText, brand));
	}

	async validateMoq({ moqRfq }) {
		await this.validateElementVisibility(sprintf(this.moqText, moqRfq));
	}

	async validateEta({ ETA, ETAUnit }) {
		await this.validateElementVisibility(sprintf(this.etaText, `${formatedNumber(ETA, 0)} ${ETAUnit}`));
	}

	async validateQty({ qty }) {
		await this.validateElementVisibility(sprintf(this.qtyText, formatedNumberWithoutComma(qty, 0)));
	}

	async validateRemark({ remark }) {
		await this.validateElementVisibility(sprintf(this.remarkText, remark));
	}

	async validateUploadedDocument() {
		await this.validateElementVisibility(this.uploadedDocumentChip);
	}

	async clickSendRfqButton() {
		await this.click(this.sendRfqButton);
	}

	async submitTable({ productInfo, productDetails, productPricing }, rfqDetails) {
		await this.validateProductName(productInfo);
		await this.validateBrandName(productDetails);
		await this.validateMoq(productPricing);
		await this.validateEta(rfqDetails);
		await this.validateQty(rfqDetails);
	}

	async submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails }) {
		await this.validateSupplierOrganizationName(supplierDetails);
		await this.validateRequestTitle(rfqDetails);
		await this.validateDeliveryLocation(deliveryLocationDetails);
		await this.submitTable(productDetails, rfqDetails);
		await this.validateRemark(rfqDetails);
		await this.validateUploadedDocument();
		await this.clickSendRfqButton();
	}
}
