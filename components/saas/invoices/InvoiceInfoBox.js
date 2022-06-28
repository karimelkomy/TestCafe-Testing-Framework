import { sprintf } from 'sprintf-js';
import ProductsPrice from '../shared/ProductsPrice';
import { formatedNumber } from '../../../utilities/helpers';
import GenericElement from '../../shared/core/GenericElement';

export default class InvoiceInfoBox extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.workspaceName = '//h1[@data-test-id="org-name-text" and text()="%s"]';
		this.invoiceIdText = '//h1[@data-test-id="bill-header" and contains(text(), "%s")]';
		this.totalAmountText = '//div[@data-test-id="total-amount-value" and .="%s"]';
		this.shippingFeeText = '//div[@data-test-id="shipping-fee-value" and .="%s"]';
		this.deliveryToText = '//div[@data-test-id="delivery-to-value" and .="%s"]';
	}

	async validateWorkspaceName({ workspaceDetails }) {
		const { details } = workspaceDetails;

		await this.validateElementVisibility(sprintf(this.workspaceName, details.name));
	}

	async validateInvoiceId({ invoiceId }) {
		await this.validateElementVisibility(sprintf(this.invoiceIdText, invoiceId));
	}

	async validateTotalAmount({ organizationDetails, requestDetails, rfqDetails, productsDetails, markupDetails }) {
		const { currencyCode } = organizationDetails;
		const price = this.productsPrice.getTotalWithTaxAndShippingFeePrice({ requestDetails, rfqDetails, productsDetails, markupDetails });

		await this.validateElementVisibility(sprintf(this.totalAmountText, `${currencyCode} ${formatedNumber(price)}`));
	}

	async validateClientShippingFee({ organizationDetails, rfqDetails }) {
		const { currencyCode } = organizationDetails;
		const { productShippingFee, shippingFee } = rfqDetails;
		const shippingFeeValue = productShippingFee || shippingFee;

		await this.validateElementVisibility(sprintf(this.shippingFeeText, `${currencyCode} ${formatedNumber(shippingFeeValue)}`));
	}

	async validateDeliveryTo({ locationDetails }) {
		const { name } = locationDetails;

		await this.validateElementVisibility(sprintf(this.deliveryToText, name));
	}

	async validateInvoiceInfoBox({ productRequest }) {
		const {
			invoiceId,
			requestDetails,
			rfqDetails,
			productDetails,
			productsDetails,
			workspaceDetails,
			organizationDetails,
			organizationLocation,
			markupDetails,
		} = productRequest;
		const productsDetailsValue = productDetails || productsDetails;

		const locationDetails = organizationLocation || workspaceDetails.location;

		await this.validateWorkspaceName({ workspaceDetails });
		await this.validateInvoiceId({ invoiceId });
		await this.validateTotalAmount({
			organizationDetails,
			requestDetails,
			rfqDetails,
			productsDetails: productsDetailsValue,
			markupDetails,
		});
		await this.validateClientShippingFee({ organizationDetails, rfqDetails });
		await this.validateDeliveryTo({ locationDetails });
	}
}
