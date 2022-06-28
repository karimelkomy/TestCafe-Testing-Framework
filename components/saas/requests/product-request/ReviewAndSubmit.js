import { sprintf } from 'sprintf-js';
import ProductAndServiceTable from '../../../shared/ProductAndServiceTable';

export default class ReviewAndSubmit extends ProductAndServiceTable {
	constructor() {
		const productRow = '//div[contains(@class, "products-content")][.//div[@class="product-name" and contains(., "%s")]]';
		const productNameText = `${productRow}//div[@class="product-name" and contains(., "%s")]`;
		const brandText = `${productRow}//span[@data-test-id="brand-text" and text()=" %s "]`;
		const skuText = `${productRow}//span[@data-test-id="qty-text" and text()="%s"]`;
		super({
			productNameText,
			brandText,
			skuText,
		});
		this.requestTitleText = '//penny-review-submit-product/div//h3[@data-test-id="request-title-text" and contains(text(), "%s")]';
		this.workspaceText = '//div[@data-test-id="workspace-value" and .= "%s"]';
		this.requestTypeText = '//div[@data-test-id="type-value" and .= "%s"]';
		this.deliveryToText = '//div[@data-test-id="delivery-to-value" and .= "%s"]';
		this.requestorRemarkText = '//penny-requestor-remarks//p[text()="%s"]';
		this.submitRequestButton = '//button[@data-test-id="submit-request-button"]';
	}

	async validateRequestTitle({ requestDetails }) {
		const { requestTitle } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTitleText, requestTitle));
	}

	async validateWorkspace({ details }) {
		const { name } = details;

		await this.validateElementVisibility(sprintf(this.workspaceText, name));
	}

	async validateRequestType({ requestDetails }) {
		const { requestType } = requestDetails;

		await this.validateElementVisibility(sprintf(this.requestTypeText, requestType));
	}

	async validateDeliveryTo({ locationDetails }) {
		const { name } = locationDetails;

		await this.validateElementVisibility(sprintf(this.deliveryToText, name));
	}

	async validateRequestorRemark({ requestDetails }) {
		const { requestInfoRemark } = requestDetails;

		if (requestInfoRemark) {
			await this.validateElementVisibility(sprintf(this.requestorRemarkText, requestInfoRemark));
		}
	}

	async clickSubmitRequestButton() {
		await this.click(this.submitRequestButton);
	}

	async submit({ productRequest }) {
		const { workspaceDetails, productsDetails, organizationLocation, requestDetails } = productRequest;
		const { details, location } = workspaceDetails;
		const locationDetails = organizationLocation || location;

		await this.validateRequestTitle({ requestDetails });
		await this.validateWorkspace({ details });
		await this.validateDeliveryTo({ locationDetails });
		await this.validateRequestType({ requestDetails });

		for (const productDetails of productsDetails) {
			await this.validateProductName({ productDetails });
			await this.validateBrand({ productDetails });
			await this.validateSku({ productDetails });
		}

		await this.validateRequestorRemark({ requestDetails });
		await this.clickSubmitRequestButton();
	}
}
