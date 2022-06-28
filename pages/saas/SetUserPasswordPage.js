import { t } from 'testcafe';
import OrgEmail from '../../components/saas/orgs/OrgEmail';
import SetPassword from '../../components/saas/orgs/SetPassword';
import { waitForUrlChanged } from '../../utilities/helpers';
import { urls, email } from '../../data/saas/constants/urls';
import SetPasswordApi from '../../api/requests/SetPasswordApi';

export default class SetUserPasswordPage {
	constructor() {
		this.orgEmail = new OrgEmail();
		this.setPassword = new SetPassword();
	}

	async navigateToSetPasswordUrl({ userDetails }) {
		const { email } = userDetails;

		const setPasswordUrl = await SetPasswordApi.getSetPasswordUrl(email);
		await t.navigateTo(setPasswordUrl);
	}

	async openSetPassword({ userDetails }) {
		if (email === 'true') {
			await this.orgEmail.openSetPassword({ userDetails });
		} else {
			await this.navigateToSetPasswordUrl({ userDetails });
		}
	}

	async setUsersPassword({ organizationDetails, usersDetails }) {
		for (let userDetails of usersDetails) {
			const orgDetails = organizationDetails || userDetails;

			await this.openSetPassword({ userDetails });
			await this.setPassword.submit({ organizationDetails: orgDetails, userDetails });
			await waitForUrlChanged(urls.buyerLogin);
		}
	}
}
