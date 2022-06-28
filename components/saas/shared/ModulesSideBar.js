import GenericElement from '../../shared/core/GenericElement';
import { waitForUrlContains } from '../../../utilities/helpers';
import { urls } from '../../../data/saas/constants/urls';
import ModulesSettingsSideBar from './ModulesSettingsSideBar';

export default class ModulesSideBar extends GenericElement {
	constructor() {
		super();
		this.modulesSettingsSideBar = new ModulesSettingsSideBar();
		this.element = '//div[contains(@class, "display-m-block")]';
		this.orgsLink = `${this.element}//a[@data-test-id="orgs"]`;
		this.actionboardLink = `${this.element}//a[@data-test-id="actionboard"]`;
		this.requestsLink = `${this.element}//a[@data-test-id="requests"]`;
		this.rfqsLink = `${this.element}//a[@data-test-id="rfqs"]`;
		this.productAndCataloguesLink = `${this.element}//a[@data-test-id="catalogs"]`;
		this.vendorLink = `${this.element}//a[@data-test-id="vendors"]`;
		this.clientsLink = `${this.element}//a[@data-test-id="clients"]`;
		this.markupsLink = `${this.element}//a[@data-test-id="markups"]`;
		this.ordersLink = `${this.element}//a[@data-test-id="orders"]`;
		this.grnLink = `${this.element}//a[@data-test-id="grns"]`;
		this.billsLink = `${this.element}//a[@data-test-id="bills"]`;
		this.paymentsLink = `${this.element}//a[@data-test-id="payments"]`;
		this.budgetsLink = `${this.element}//a[@data-test-id="budgets"]`;
		this.workspaceLink = `${this.element}//a[@data-test-id="workspaces"]`;
		this.settingsLink = `${this.element}//a[@data-test-id="settings"]`;
		this.invoicesLink = `${this.element}//a[@data-test-id="seller_invoice"]`;
		this.receivedPaymentLink = `${this.element}//a[@data-test-id="seller_payment"]`;
		this.moduleSettingsIcon = `${this.element}//mat-icon[@data-test-id="menu-open-button" and @ptooltip="Module Settings"]`;
	}

	async clickModuleSettingsIcon() {
		await this.click(this.moduleSettingsIcon);
	}

	async clickOrgsLink() {
		await this.click(this.orgsLink);

		await this.wait(3); // TODO: wait until page stability
	}

	async clickActionboardLink() {
		await this.click(this.actionboardLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.actionboard);
	}

	async clickRequestsLink() {
		await this.click(this.requestsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.requests);
	}

	async clickRfqsLink() {
		await this.click(this.rfqsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.rfqs);
	}

	async clickProductAndCataloguesLink() {
		await this.click(this.productAndCataloguesLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.productAndCatalogues);
	}

	async clickVendorLink() {
		await this.click(this.vendorLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.vendors);
	}

	async clickClientsLink() {
		await this.click(this.clientsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.clients);
	}

	async clickMarkupsLink() {
		await this.click(this.markupsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.markups);
	}

	async clickOrdersLink() {
		await this.click(this.ordersLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.orders);
	}

	async clickGrnLink() {
		await this.click(this.grnLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.grns);
	}

	async clickBillsLink() {
		await this.click(this.billsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.bills);
	}

	async clickPaymentsLink() {
		await this.click(this.paymentsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.payments);
	}

	async clickBudgetsLink() {
		await this.click(this.budgetsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.budgets);
	}

	async clickWorkspaceLink() {
		await this.click(this.workspaceLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.workspace);
	}

	async clickSettingsLink() {
		await this.click(this.settingsLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.settings);
	}

	async clickInvoicesLink() {
		await this.click(this.invoicesLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.invoices);
	}

	async clickReceivedPaymentLink() {
		await this.click(this.receivedPaymentLink);

		await this.wait(3); // TODO: wait until page stability

		await waitForUrlContains(urls.receivedPayment);
	}

	async enableModules({ modulesName }) {
		await this.clickModuleSettingsIcon();
		await this.modulesSettingsSideBar.submit({ modulesName });
	}
}
