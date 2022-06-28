import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ProductsPrice from '../../shared/ProductsPrice';
import { formatedNumber, formatedNumberWithoutComma, isGaiat, isStc } from '../../../../utilities/helpers';
import UnitProductPrice from '../../shared/UnitProductPrice';

export default class VendorColumn extends GenericElement {
	constructor() {
		super();
		this.productsPrice = new ProductsPrice();
		this.unitProductPrice = new UnitProductPrice();
		this.elementXP = 'div[contains(@col-id,"%s")]';
		this.productNameText = '//penny-offer-compare-table//div[contains(text(), "%s")]';
		this.qtyText = '//penny-offer-compare-table//div[@role="row"][.//div[contains(text(), "%s")]]//div[@col-id="quantity" and .="%s"]';
		this.totalWithTaxesndShippingFeeText = `//div[@row-index="t-0"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.totalWithTaxesText = `//div[@row-index="t-2"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.taxesText = `//div[@row-index="t-3"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.taxesTextAlt = `//div[@row-index="t-4"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.shippingFeeText = `//div[@row-index="t-4"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.shippingFeeTextAlt = `//div[@row-index="t-5"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.shippingTermText = `//div[@row-index="t-5"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.shippingTermTextAlt = `//div[@row-index="t-6"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.paymentTermText = `//div[@row-index="t-6"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.paymentTermTextAlt = `//div[@row-index="t-7"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.etaText = `//div[@row-index="t-7"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.etaTextAlt = `//div[@row-index="t-8"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.subTotalWithTaxesText = `//div[@row-index="%s"]//${this.elementXP}//div[contains(text(), "%s")]`;
		this.arrowIcon = `//${this.elementXP}//div[contains(@class, "cursor-pointer")]/mat-icon`;
		this.viewOfferButton = '//div[.="View Offer"]';
		this.acceptOfferButton = '//div[.="Accept Offer"]';
		this.sendForApprovalButton = '//div[.="Send for Approval"]';
		this.sendForRevisionAllButton = '//div[.="Send For Revision (all)"]';
		this.negotiateButton = '//div[.="Negotiate"]';
		this.updateOfferOfflineButton = '//div[.="Update Offer (offline)"]';
		this.approveOfferButton = '//div[.="Approve Offer"]';
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName));
	}

	async validateQty({ productName, qty }) {
		await this.validateElementVisibility(sprintf(this.qtyText, productName, formatedNumberWithoutComma(qty, 0)));
	}

	async validateShippingFee({ rfqId, rfqDetails, organizationDetails }) {
		const { shippingFee } = rfqDetails;
		const shippingFeeText = isGaiat(organizationDetails) ? this.shippingFeeText : this.shippingFeeTextAlt;

		await this.validateElementVisibility(sprintf(this.shippingFeeText, rfqId, formatedNumber(shippingFee)));
	}

	async validateShippingTerm({ rfqId, rfqDetails, organizationDetails }) {
		const { shippingTerm } = rfqDetails;
		const shippingTermText = isGaiat(organizationDetails) ? this.shippingTermText : this.shippingTermTextAlt;

		await this.validateElementVisibility(sprintf(this.shippingTermText, rfqId, shippingTerm));
	}

	async validatePaymentTerm({ rfqId, rfqDetails, organizationDetails }) {
		const { paymentTerm, paymentTermUnit } = rfqDetails;
		const paymentTermText = isGaiat(organizationDetails) ? this.paymentTermText : this.paymentTermTextAlt;

		await this.validateElementVisibility(
			sprintf(this.paymentTermText, rfqId, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit.toUpperCase()}`)
		);
	}

	async validateETA({ rfqId, rfqDetails, organizationDetails }) {
		const { ETA, ETAUnit } = rfqDetails;
		const etaText = isGaiat(organizationDetails) ? this.etaText : this.etaTextAlt;

		await this.validateElementVisibility(sprintf(this.etaText, rfqId, `${formatedNumber(ETA, 0)} ${ETAUnit.toUpperCase()}`));
	}

	async validateUnitPrice({ rfqId, productsDetails, rfqDetails, organizationDetails }) {
		const price = isGaiat(organizationDetails) ? this.unitProductPrice.getUnitPriceWithTax({ rfqDetails }) : rfqDetails.pricePerUnit;

		// TODO: to be improved when we have different price for each product
		for (const productNumber in productsDetails) {
			await this.validateElementVisibility(sprintf(this.subTotalWithTaxesText, productNumber.toString(), rfqId, formatedNumber(price)));
		}
	}

	async validateTotalWithTaxes({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails }) {
		const price = isGaiat(organizationDetails)
			? this.productsPrice.getTotalWithTaxPrice({ requestDetails, rfqDetails, productsDetails })
			: this.productsPrice.getSubTotalWithShippingFeePrice({ requestDetails, rfqDetails, productsDetails });

		await this.validateElementVisibility(sprintf(this.totalWithTaxesText, rfqId, formatedNumber(price)));
	}

	async validateTaxes({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails }) {
		const subTotal = this.productsPrice.getSubTotalPrice({ requestDetails, rfqDetails, productsDetails });
		const taxValue = this.productsPrice.getTaxAmount({ subTotal, rfqDetails });
		const taxesText = isGaiat(organizationDetails) ? this.taxesText : this.taxesTextAlt;

		await this.validateElementVisibility(sprintf(this.taxesText, rfqId, formatedNumber(taxValue)));
	}

	async validateTotalWithTaxesAndShippingFee({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails }) {
		const { currencyCode } = organizationDetails;
		const totalWithTaxAndShippingFeePrice = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
			requestDetails,
			rfqDetails,
			productsDetails,
		});

		await this.validateElementVisibility(sprintf(this.totalWithTaxesndShippingFeeText, rfqId, currencyCode));
		await this.validateElementVisibility(
			sprintf(this.totalWithTaxesndShippingFeeText, rfqId, formatedNumber(totalWithTaxAndShippingFeePrice))
		);
	}

	async clickArrowIcon({ rfqId }) {
		await this.click(sprintf(this.arrowIcon, rfqId));
	}

	async clickAcceptOfferButton() {
		await this.click(this.acceptOfferButton);
	}

	async clickApproveOfferButton() {
		await this.click(this.approveOfferButton);
	}

	async clickSendForApprovalButton() {
		await this.click(this.sendForApprovalButton);
	}

	async clickViewOfferButton() {
		await this.click(this.viewOfferButton);
	}

	async clickSendForRevisionAllButton() {
		await this.click(this.sendForRevisionAllButton);
	}

	async clickNegotiateButton() {
		await this.click(this.negotiateButton);
	}

	async clickUpdateOfferOfflineButton() {
		await this.click(this.updateOfferOfflineButton);
	}

	async openViewOfferSidebar({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickViewOfferButton();
	}

	async openAcceptOfferSidebar({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickAcceptOfferButton();
	}

	async openSendForApprovalSidebar({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickSendForApprovalButton();
	}

	async openSendForRevisionAllSidebar({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickSendForRevisionAllButton();
	}

	async openNegotiateColumn({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickNegotiateButton();
	}

	async openUpdateOfferSidebar({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickUpdateOfferOfflineButton();
	}

	async openApproveOfferSidebar({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickApproveOfferButton();
	}

	async validateOfferDetailsColumn({ rfqId, requestDetails, rfqDetails, organizationDetails, productsDetails }) {
		const { qty } = requestDetails;

		for (const productDetails of productsDetails) {
			const { productName } = productDetails;

			await this.validateProductName({ productName });
			await this.validateQty({ productName, qty });
		}

		await this.validateShippingFee({ rfqId, rfqDetails, organizationDetails });
		await this.validateShippingTerm({ rfqId, rfqDetails, organizationDetails });
		// await this.validatePaymentTerm({ rfqId, rfqDetails, organizationDetails }); // BUG: payment term removed
		await this.validateETA({ rfqId, rfqDetails, organizationDetails });
		await this.validateUnitPrice({ rfqId, productsDetails, rfqDetails, organizationDetails });
		await this.validateTotalWithTaxes({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails });
		await this.validateTotalWithTaxesAndShippingFee({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails });
		await this.validateTaxes({ rfqId, productsDetails, requestDetails, rfqDetails, organizationDetails });
	}
}
