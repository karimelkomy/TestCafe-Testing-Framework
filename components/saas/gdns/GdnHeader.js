import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class GdnHeader extends GenericElement {
	constructor() {
		super();
		this.profileBadgeText = '//penny-profile-badge//span[text()="%s"]';
		this.pendingGdnButton = '//div[./h4[contains(text(), "Pending GDNs")]]//button';
		this.generatedGdnButton = '(//div[./h4[contains(text(), "Generated GDNs")]]//button)[1]';
	}

	async validateRequesterFirstName({ clientRequesterUserDetails }) {
		const { firstName } = clientRequesterUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async validateGdnHeader({ productRequest }) {
		const { clientRequesterUserDetails } = productRequest;

		await this.validateRequesterFirstName({ clientRequesterUserDetails });
	}

	async openPendingGdn() {
		await this.click(this.pendingGdnButton);
	}

	async openGeneratedGdn() {
		await this.wait(3); // Wait for GDN button to show
		await this.click(this.generatedGdnButton);
	}
}
