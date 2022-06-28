import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../../utilities/helpers';

export default class ContractOverview extends GenericElement {
	constructor() {
		super();
		this.contractsTab = '//a[.="Contracts"]';
		this.contractNameText = '//penny-contract-detail//h2[text()="%s"]';
		this.contractDescriptionText = '//penny-contract-detail//h4[text()="%s"]';
		this.contractNumberText = '//div[@data-test-id="contract-number-value" and .="%s"]';
		this.paymentTermText = '//div[@data-test-id="payment-term-value" and .="%s"]';
		this.productRow = '//tr[.//div[@data-test-id="product-name-text" and contains(text(), "%s")]]';
		this.productNameText = `${this.productRow}//div[@data-test-id="product-name-text" and contains(., "%s")]`;
		this.brandText = `${this.productRow}//span[@data-test-id="brand-text" and text()=" %s "]`;
		this.contractPriceText = `${this.productRow}//span[@data-test-id="price-%s-text" and contains(., "%s")]`;
		this.qtyText = `${this.productRow}//span[@data-test-id="total-qty-text" and text()="%s"]`;
	}

	async clickContractsTab() {
		await this.click(this.contractsTab);
	}

	async validateContractName({ contractDetails }) {
		const { contractName } = contractDetails;

		await this.validateElementVisibility(sprintf(this.contractNameText, contractName));
	}

	async validateContractDescription({ contractDetails }) {
		const { description } = contractDetails;

		await this.validateElementVisibility(sprintf(this.contractDescriptionText, description));
	}

	async validateContractNumber({ contractDetails }) {
		const { referenceContractNumber } = contractDetails;

		await this.validateElementVisibility(sprintf(this.contractNumberText, formatedNumber(referenceContractNumber)));
	}

	async validatePaymentTerm({ contractDetails }) {
		const { paymentTerm, paymentTermUnit } = contractDetails;

		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateProductName({ productName }) {
		await this.validateElementVisibility(sprintf(this.productNameText, productName, productName));
	}

	async validateBrand({ productName, brand }) {
		await this.validateElementVisibility(sprintf(this.brandText, productName, brand));
	}

	async validateContractPrice({ productName, contractPrice, organizationDetails }) {
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.contractPriceText, productName, 'currency', currencyCode));
		await this.validateElementVisibility(sprintf(this.contractPriceText, productName, 'price', formatedNumber(contractPrice)));
	}

	async validateQty({ productName, qty }) {
		await this.validateElementVisibility(sprintf(this.qtyText, productName, formatedNumber(qty, 0)));
	}

	async validate({ contractDetails, organizationDetails }) {
		const { productsDetails, qty } = contractDetails;

		// TODO: validate contract start and end date
		await this.validateContractName({ contractDetails });
		await this.validateContractDescription({ contractDetails });
		await this.validateContractNumber({ contractDetails });
		await this.validatePaymentTerm({ contractDetails });

		for (const productDetails of productsDetails) {
			const { productName, brand, contractPrice } = productDetails;

			await this.validateProductName({ productName });
			await this.validateBrand({ productName, brand });
			await this.validateContractPrice({ productName, contractPrice, organizationDetails });
			await this.validateQty({ productName, qty });
		}
	}
}
