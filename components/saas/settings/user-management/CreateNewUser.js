import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import AddRoleSidebar from './AddRoleSidebar';

export default class CreateNewUser extends GenericElement {
	constructor() {
		super();
		this.addRoleSidebar = new AddRoleSidebar();
		this.firstNameInput = '//input[@data-test-id="first-name-input"]';
		this.lastNameInput = '//input[@data-test-id="last-name-input"]';
		this.emailInput = '//input[@data-test-id="email-input"]';
		this.phoneNumberInput = '//input[@data-test-id="phone-number-input"]';
		this.positionInput = '//input[@data-test-id="position-input"]';
		this.defaultRoleChip = '//span[@data-test-id="privilege-chip" and text()=" %s "]';
		this.roleChip = '//div[./div/h5[contains(.,"Privileges")]]//p-chips//li[contains(text(), "%s")]';
		this.saveButton = '//button[@data-test-id="save-button"]';
	}

	async fillFirstName({ firstName }) {
		await this.fill(this.firstNameInput, firstName);
	}

	async fillLastName({ lastName }) {
		await this.fill(this.lastNameInput, lastName);
	}

	async fillEmail({ email }) {
		await this.fill(this.emailInput, email);
	}

	async fillPhoneNumber({ phoneNumber }) {
		await this.fill(this.phoneNumberInput, phoneNumber);
	}

	async fillPosition({ position }) {
		await this.fill(this.positionInput, position);
	}

	async validateRoles({ defaultRoleName, rolesName }) {
		if (defaultRoleName) {
			await this.validateElementVisibility(sprintf(this.defaultRoleChip, defaultRoleName));
		}

		if (rolesName) {
			for (const roleName of rolesName) {
				await this.validateElementVisibility(sprintf(this.roleChip, roleName));
			}
		}
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async submit({ userDetails }) {
		const { firstName, lastName, email, phoneNumber, position, defaultRoleName, rolesName } = userDetails;

		await this.fillFirstName({ firstName });
		await this.fillLastName({ lastName });
		await this.fillEmail({ email });
		await this.fillPhoneNumber({ phoneNumber });
		await this.fillPosition({ position });
		await this.addRoleSidebar.submit({ rolesName });
		await this.validateRoles({ defaultRoleName, rolesName });
		await this.clickSaveButton();
	}
}
