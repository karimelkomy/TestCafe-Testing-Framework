import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class UsersTable extends GenericElement {
	constructor() {
		super();
		this.userNameText = '//div[@col-id="userName"]//span[text()="%s"]';
		this.emailText = '//div[@col-id="email"]//span[text()="%s"]';
		this.positionText = '//div[@col-id="position"]//span[text()="%s"]';
	}

	async validateUsername({ firstName, lastName }) {
		await this.validateElementVisibility(sprintf(this.userNameText, `${firstName} ${lastName}`));
	}

	async validateEmail({ email }) {
		await this.validateElementVisibility(sprintf(this.emailText, email));
	}

	async validatePosition({ position }) {
		await this.validateElementVisibility(sprintf(this.positionText, position));
	}

	async validateUser({ userDetails }) {
		const { firstName, lastName, email, position } = userDetails;

		await this.validateUsername({ firstName, lastName });
		await this.validateEmail({ email });
		await this.validatePosition({ position });
	}
}
