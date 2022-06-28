import { t } from 'testcafe';
import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { navigateTo, switchToMainWindow, waitElementVisibility, getCurrentUrl } from '../../../utilities/helpers';
import { urls } from '../../../data/saas/constants/urls';

export default class VendorAppAccess extends GenericElement {
	constructor() {
		super();
		this.emailByIdAndText = '//tr[contains(@id, "row")][1]//td[contains(text(), "%s") and contains(text(), "%s")]';
		this.submitYourQuoteButton = '//td/a[contains(text(), "QUOTE")]';
		this.viewOrderButton = '//td/a[text()= "VIEW ORDER"]';
		this.messageIframe = '//div[contains(@class, "show")]//iframe[@id="html_msg_body"]';
	}

	async navigateToVendorApp({ vendorDetails }) {
		const { email } = vendorDetails;
		const emailWithoutDomain = email.replace('@mailinator.com', '');

		await navigateTo(sprintf(urls.mailBox, emailWithoutDomain));
	}

	async openEmailByIdAndText({ id, text }) {
		const elementXP = sprintf(this.emailByIdAndText, id, text);

		await waitElementVisibility(elementXP);
		await this.click(elementXP);
	}

	async openVendorRfq() {
		while (true) {
			const emailUrl = await getCurrentUrl();
			await this.switchToMessageIframe();
			const vendorRfqUrl = await this.getAttributeValue(this.submitYourQuoteButton, 'href');
			await switchToMainWindow();
			await t.navigateTo(vendorRfqUrl);

			const currentUrl = await getCurrentUrl();

			if (currentUrl.includes('penny.co')) {
				break;
			} else {
				await t.navigateTo(emailUrl);
			}
		}
	}

	async switchToMessageIframe() {
		await waitElementVisibility(this.messageIframe);
		await this.switchToIframe(this.messageIframe);
	}

	async openRfq({ rfqId, vendorDetails, text }) {
		await this.navigateToVendorApp({ vendorDetails });
		await this.openEmailByIdAndText({ id: rfqId, text });
		await this.openVendorRfq();
	}

	async openVendorOrder() {
		while (true) {
			const emailUrl = await getCurrentUrl();
			await this.switchToMessageIframe();
			const vendorOrderUrl = await this.getAttributeValue(this.viewOrderButton, 'href');
			await switchToMainWindow();
			await t.navigateTo(vendorOrderUrl);

			const currentUrl = await getCurrentUrl();

			if (currentUrl.includes('penny.co')) {
				break;
			} else {
				await t.navigateTo(emailUrl);
			}
		}
	}

	async openOrder({ orderId, vendorDetails, text }) {
		await this.navigateToVendorApp({ vendorDetails });
		await this.openEmailByIdAndText({ id: orderId, text });
		await this.openVendorOrder();
	}

	async navigateToVendorUrl({ vendorUrl }) {
		await navigateTo(vendorUrl);
	}
}
