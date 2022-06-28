import {t} from 'testcafe';
import GenericElement from '../../shared/core/GenericElement';

export default class SupplierSideBar extends GenericElement {
    constructor() {
        super();
        this.element = '//div[contains(@class, "display-m-block")]';
        this.actionboardLink = `${this.element}//a[@data-test-id="actionboard"]`;
        this.billsLink = `${this.element}//a[@data-test-id="bills"]`;
        this.receivedRfqsLink = `${this.element}//a[@data-test-id="seller_rfq"]`;
        this.receivedOrdersLink = `${this.element}//a[@data-test-id="seller_order"]`;
        this.deliveryNotesLink = `${this.element}//a[@data-test-id="seller_gdn"]`;
        this.eInvoicesLink = `${this.element}//a[@data-test-id="e_invoice"]`;
        this.receivedPaymentsLink = `${this.element}//a[@data-test-id="seller_payment"]`;
        this.productAndCatalogsLink = `${this.element}//a[@data-test-id="catalogs"]`;
        this.settingsLink = `${this.element}//a[@data-test-id="settings"]`;
    }

    async clickActionboard() {
        await this.click(this.actionboardLink);
    }

    async clickResolvedRfqs() {
        await this.click(this.receivedRfqsLink);
    }    
}