import { t } from 'testcafe';
import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { navigateTo, switchToMainWindow, waitElementVisibility, getCurrentUrl } from '../../../utilities/helpers';
import { urls } from '../../../data/saas/constants/urls';

export default class OrgEmail extends GenericElement {
	constructor() {
		super();
		this.welcomeToPennyEmail = '//tr[contains(@id, "row")][1]//td[contains(text(), "Welcome to")]';
		this.setYourPasswordButton = '//td/a[text()= "SET YOUR PASSWORD"]';
		this.messageIframe = '//div[contains(@class, "show")]//iframe[@id="html_msg_body"]';
	}

	async navigateToOrgEmail({ userDetails }) {
		const { email } = userDetails;

		const emailWithoutDomain = email.replace('@mailinator.com', '');

		await navigateTo(sprintf(urls.mailBox, emailWithoutDomain));
	}

	async openEmail() {
		await waitElementVisibility(this.welcomeToPennyEmail);
		await this.click(this.welcomeToPennyEmail);
	}

	async openSetPasswordPage() {
		while (true) {
			const emailUrl = await getCurrentUrl();
			await this.switchToMessageIframe();
			const setYourPasswordUrl = await this.getAttributeValue(this.setYourPasswordButton, 'href');
			await switchToMainWindow();
			await t.navigateTo(setYourPasswordUrl);

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

	async openSetPassword({ userDetails }) {
		await this.navigateToOrgEmail({ userDetails });
		await this.openEmail();
		await this.openSetPasswordPage();
	}
}
