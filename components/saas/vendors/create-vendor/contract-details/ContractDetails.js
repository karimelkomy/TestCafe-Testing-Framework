import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import AddProducts from './AddProducts';
import { selectDate, getTodayDate, getNextYearDate, formatedNumber } from '../../../../../utilities/helpers';
import contracts from '../../../../../data/saas/constants/contracts';
import ContractOverview from './ContractOverview';

export default class ContractDetails extends GenericElement {
	constructor() {
		super();
		this.addProducts = new AddProducts();
		this.contractOverview = new ContractOverview();
		this.addContractButton = '//button[@data-test-id="add-contract-button"]';
		this.startDateDropdown = '//p-calendar[@data-test-id="start-date-calendar"]//input';
		this.endDateDropdown = '//p-calendar[@data-test-id="end-date-calender"]//input';
		this.referenceContractNumberInput = '//input[@data-test-id="reference-contract-number-input"]';
		this.contractNameInput = '//input[@data-test-id="contract-name-input"]';
		this.descriptionInput = '//input[@data-test-id="description-input"]';
		this.paymentTermInput = '//input[@placeholder="Payment Term"]';
		this.addProductsButton = '//button[@data-test-id="add-products-button"]';
		this.productRow = '//tr[.//div[@data-test-id="product-name-text" and contains(text(), "%s")]]';
		this.priceInput = `${this.productRow}//td[./span[text()="PRICE"]]//input`;
		this.taxesDropdown = `${this.productRow}//td//p-multiselect`;
		this.taxesDropdownItem = `${this.productRow}//td//p-multiselectitem//div[@class="p-checkbox-box"]`;
		this.totalQtyInput = `${this.productRow}//td[./span[text()="TOTAL QTY"]]//input`;
		this.saveButton = '//div[contains(@class, "contract-detail")]//button[@data-test-id="save-button"]';
		this.contractsNumberText = '//penny-contracts-list//h2[contains(., "Contracts(%s)")]';
		this.paymentTermText = '//div[@row-id="0"]//div[@col-id="paymentTerm"]//span[text()="%s"]';
		this.contractIdButton = '//div[@row-id="0"]//div[@col-id="contractId"]//button';
	}

	async clickAddContractButton() {
		await this.click(this.addContractButton);
	}

	async clickContractIdButton() {
		await this.click(this.contractIdButton);
	}

	async selectStartDate({ day, month, year }) {
		await this.click(this.startDateDropdown);

		await selectDate(day, month, year);
	}

	async selectEndDate({ day, month, year }) {
		await this.click(this.endDateDropdown);

		await selectDate(day, month, year);
	}

	async fillReferenceContractNumber({ contractDetails }) {
		const { referenceContractNumber } = contractDetails;

		await this.fill(this.referenceContractNumberInput, formatedNumber(referenceContractNumber));
	}

	async fillContractName({ contractDetails }) {
		const { contractName } = contractDetails;

		await this.fill(this.contractNameInput, contractName);
	}

	async fillDescription({ contractDetails }) {
		const { description } = contractDetails;

		await this.fill(this.descriptionInput, description);
	}

	async fillPaymentTerm({ contractDetails }) {
		const { paymentTerm } = contractDetails;

		await this.fill(this.paymentTermInput, formatedNumber(paymentTerm, 0));
	}

	async clickAddProductsButton() {
		await this.click(this.addProductsButton);
	}

	async fillContractPrice({ productDetails }) {
		const { contractPrice, productName } = productDetails;

		await this.fill(sprintf(this.priceInput, productName), formatedNumber(contractPrice));
	}

	async selectTaxes({ productDetails, rfqDetails }) {
		const { tax, taxType } = rfqDetails;
		const { productName } = productDetails;

		if (tax && taxType) {
			await this.click(sprintf(this.taxesDropdown, productName));
			await this.click(sprintf(this.taxesDropdownItem, productName));
		}
	}

	async fillTotalQty({ productDetails, contractDetails }) {
		const { qty } = contractDetails;
		const { productName } = productDetails;

		await this.fill(sprintf(this.totalQtyInput, productName), qty.toString());
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async createContract({ vendorDetails, organizationDetails }) {
		const { contractDetails, rfqDetails } = vendorDetails;
		const { productsDetails, catalogueDetails } = contractDetails;
		const { day, month, year } = await getTodayDate();
		const { nextDay, nextMonth, nextYear } = await getNextYearDate();

		await this.selectStartDate({ day, month, year });
		await this.selectEndDate({ day: nextDay, month: nextMonth, year: nextYear });
		await this.fillReferenceContractNumber({ contractDetails });
		await this.fillContractName({ contractDetails });
		await this.fillDescription({ contractDetails });
		await this.fillPaymentTerm({ contractDetails });

		for (const productDetails of productsDetails) {
			await this.clickAddProductsButton();
			await this.addProducts.submit({ productDetails, catalogueDetails, organizationDetails });
			await this.fillContractPrice({ productDetails });
			await this.selectTaxes({ productDetails, rfqDetails });
			await this.fillTotalQty({ productDetails, contractDetails });
		}

		await this.clickSaveButton();
	}

	async validateContractNumbers({ contractNumbers }) {
		await this.validateElementVisibility(sprintf(this.contractsNumberText, contractNumbers));
	}

	async validatePaymentTerm({ contractDetails }) {
		const { paymentTerm, paymentTermUnit } = contractDetails;

		await this.validateElementVisibility(sprintf(this.paymentTermText, `${formatedNumber(paymentTerm, 0)} ${paymentTermUnit}`));
	}

	async validateCreatedContract({ vendorDetails, organizationDetails }) {
		const { contractDetails } = vendorDetails;

		await this.validateContractNumbers({ contractNumbers: contracts.ONE });
		await this.validatePaymentTerm({ contractDetails });
		await this.clickContractIdButton();
		await this.contractOverview.validate({ contractDetails, organizationDetails });
	}

	async openContractsTab() {
		await this.contractOverview.clickContractsTab();
	}

	async submit({ vendorDetails, organizationDetails }) {
		const { contractDetails } = vendorDetails;

		await this.validateContractNumbers({ contractNumbers: contracts.ZERO });

		if (contractDetails) {
			await this.clickAddContractButton();
			await this.createContract({ vendorDetails, organizationDetails });
			await this.validateCreatedContract({ vendorDetails, organizationDetails });
		}
	}
}
