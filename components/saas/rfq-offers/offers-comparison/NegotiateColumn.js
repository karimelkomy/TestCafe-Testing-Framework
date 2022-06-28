import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import ProductPrice from '../../shared/ProductPrice';
import UnitProductPrice from '../../shared/UnitProductPrice';
import { formatedNumber, isGaiat } from '../../../../utilities/helpers';

export default class NegotiateColumn extends GenericElement {
	constructor() {
		super();
		this.productPrice = new ProductPrice();
		this.unitProductPrice = new UnitProductPrice();
		this.elementXP = 'div[contains(@col-id,"%s") and contains(@col-id,"negotiate")]';
		this.arrowIcon = `//${this.elementXP}//mat-icon`;
		this.shippingFeeText = `//div[@row-index="t-4"]//${this.elementXP}`;
		this.shippingFeeTextAlt = `//div[@row-index="t-5"]//${this.elementXP}`;
		this.shippingTermDropdown = `//div[@row-index="t-5"]//${this.elementXP}`;
		this.shippingTermDropdownAlt = `//div[@row-index="t-6"]//${this.elementXP}`;
		this.shippingTermDropdownItem = '//div[@role="option" and .="%s"]';
		this.paymentTermText = `//div[@row-index="t-6"]//${this.elementXP}`;
		this.paymentTermTextAlt = `//div[@row-index="t-7"]//${this.elementXP}`;
		this.etaText = `//div[@row-index="t-7"]//${this.elementXP}`;
		this.etaTextAlt = `//div[@row-index="t-8"]//${this.elementXP}`;
		this.subTotalWithTaxesText = `//div[@row-index="%s"]//${this.elementXP}`;
		this.submitNegotiationButton = '//div[.="Submit Negotiation"]';
	}

	async fillShippingFee({ rfqId, rfqDetails, organizationDetails }) {
		const { shippingFee } = rfqDetails;
		const shippingFeeText = isGaiat(organizationDetails) ? this.shippingFeeText : this.shippingFeeTextAlt;

		await this.fill(sprintf(this.shippingFeeText, rfqId), formatedNumber(shippingFee));
	}

	async fillShippingTerm({ rfqId, rfqDetails, organizationDetails }) {
		const { shippingTerm } = rfqDetails;
		const shippingTermDropdown = isGaiat(organizationDetails) ? this.shippingTermDropdown : this.shippingTermDropdownAlt;

		await this.click(sprintf(this.shippingTermDropdown, rfqId));
		await this.click(sprintf(this.shippingTermDropdownItem, shippingTerm));
	}

	async fillPaymentTerm({ rfqId, rfqDetails, organizationDetails }) {
		const { paymentTerm } = rfqDetails;
		const paymentTermText = isGaiat(organizationDetails) ? this.paymentTermText : this.paymentTermTextAlt;

		await this.fill(sprintf(this.paymentTermText, rfqId), formatedNumber(paymentTerm, 0));
	}

	async fillETA({ rfqId, rfqDetails, organizationDetails }) {
		const { ETA } = rfqDetails;
		const etaText = isGaiat(organizationDetails) ? this.etaText : this.etaTextAlt;

		await this.fill(sprintf(this.etaText, rfqId), ETA.toString());
	}

	async fillUnitPrice({ rfqId, productsDetails, rfqDetails, organizationDetails }) {
		const price = isGaiat(organizationDetails) ? this.unitProductPrice.getUnitPriceWithTax({ rfqDetails }) : rfqDetails.pricePerUnit;

		// TODO: to be improved when we have different price for each product
		for (const productNumber in productsDetails) {
			await this.click(sprintf(this.subTotalWithTaxesText, productNumber.toString(), rfqId));
			await this.fill(sprintf(this.subTotalWithTaxesText, productNumber.toString(), rfqId), price.toString()); // NOTE: Fill without formate
		}
	}

	async clickArrowIcon({ rfqId }) {
		await this.click(sprintf(this.arrowIcon, rfqId));
	}

	async clickSubmitNegotiationButton() {
		await this.click(this.submitNegotiationButton);
	}

	async submitNegotiationColumn({ rfqId }) {
		await this.clickArrowIcon({ rfqId });
		await this.clickSubmitNegotiationButton();
	}

	async submit({ rfqId, productsDetails, rfqDetails, organizationDetails }) {
		await this.fillShippingTerm({ rfqId, rfqDetails, organizationDetails });
		await this.fillShippingFee({ rfqId, rfqDetails, organizationDetails });
		await this.fillPaymentTerm({ rfqId, rfqDetails, organizationDetails });
		await this.fillETA({ rfqId, rfqDetails, organizationDetails });
		await this.fillUnitPrice({ rfqId, productsDetails, rfqDetails, organizationDetails });
		await this.submitNegotiationColumn({ rfqId });
	}
}
