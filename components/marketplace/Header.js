import { sprintf } from 'sprintf-js';
import GenericElement from '../shared/core/GenericElement';
import { waitForUrlChanged } from '../../utilities/helpers';
import marketplaceUrls from '../../data/marketplace/constants/urls';
import { t } from 'testcafe';

export default class Header extends GenericElement {
	constructor() {
		super();
		this.signInButton = '//span[@class="p-button-label" and .="Login"]';
		this.rfqsCartButton = '//div[@ptooltip="My RFQs"]';
		this.ordersCartButton = '//div[@ptooltip="My Orders"]';
		this.userDropdown = '//penny-marketplace-app-header//p-dropdown//span[contains(text(), "%s")]';
		this.rfqOffersButton = '//p-dropdownitem[.="RFQs/Offers"]/li';
		this.ordersButton = '//p-dropdownitem[.="Orders"]/li';
		this.billsButton = '//p-dropdownitem[.="Bills"]/li';
		this.payementsButton = '//p-dropdownitem[.="Payments"]/li';
		this.grnButton = '//p-dropdownitem[.="GRN"]/li';
		this.myProfileButton = '//p-dropdownitem//span[.="My Profile"]';
		this.locationsButton = '//p-dropdownitem//span[.="Locations"]';
		this.signOutButton = '//p-dropdownitem//span[.="Sign Out"]';
	}

	async openUserDropdown({ firstName }) {
		await this.click(sprintf(this.userDropdown, firstName));
	}

	async clickSignInButton() {
		await this.click(this.signInButton);
	}

	async clickSignOutButton(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.signOutButton);
	}

	async openUserProfile(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.myProfileButton);

		await waitForUrlChanged(marketplaceUrls.userProfile);
	}

	async openRfqs(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.rfqOffersButton);

		await waitForUrlChanged(marketplaceUrls.rfqs);
	}

	async openOrders(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.ordersButton);

		await waitForUrlChanged(marketplaceUrls.orders);
	}

	async openBills(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.billsButton);

		await waitForUrlChanged(marketplaceUrls.billsAndPayments);
	}

	async openPayments(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.payementsButton);

		await waitForUrlChanged(marketplaceUrls.billsAndPayments);
	}

	async openGRN(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.grnButton);

		await waitForUrlChanged(marketplaceUrls.grns);
	}

	async openLocations(marketplaceBuyerDetails) {
		await this.openUserDropdown(marketplaceBuyerDetails);
		await this.click(this.locationsButton);

		await waitForUrlChanged(marketplaceUrls.locations);
	}

	async validateSignIn({ firstName }) {
		await this.validateElementVisibility(sprintf(this.userDropdown, firstName));
	}

	async validateSignOut() {
		await this.validateElementVisibility(this.signInButton);
	}
}
