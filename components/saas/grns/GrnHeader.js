import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class GrnHeader extends GenericElement {
	constructor() {
		super();
		this.grnHeader = '//penny-grn-details//h2[contains(., "%s")]';
		this.profileBadgeText = '//penny-profile-badge//span[text()="%s"]';
		this.pendingGrnButton = '//div[./h4[contains(text(), "Pending GRNs")]]//button';
		this.completedGrnButton = '(//div[./h4[contains(text(), "Completed GRNs")]]//button)[1]';
	}

	async validateRequesterFirstName({ requesterUserDetails }) {
		const { firstName } = requesterUserDetails;

		await this.validateElementVisibility(sprintf(this.profileBadgeText, firstName));
	}

	async validateOrderId({ orderId }) {
		await this.validateElementVisibility(sprintf(this.grnHeader, orderId));
	}

	async validateGrnHeader({ productRequest }) {
		const { orderId, requesterUserDetails } = productRequest;

		await this.validateOrderId({ orderId });
		await this.validateRequesterFirstName({ requesterUserDetails });
	}

	async validateClientGrnHeader({ productRequest }) {
		const { clientRequesterUserDetails } = productRequest;

		await this.validateRequesterFirstName({ requesterUserDetails: clientRequesterUserDetails });
	}

	async openPendingGrn() {
		await this.click(this.pendingGrnButton);
	}

	async openCompletedGrn() {
		await this.wait(3); // Wait for GRN button to show
		await this.click(this.completedGrnButton);
	}
}
