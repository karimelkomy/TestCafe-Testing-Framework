import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';
import { imagePath } from '../../../data/saas/constants/documentsPath';

export default class MyProfile extends GenericElement {
	constructor() {
		super();
		this.profilePhotoInput = '//label[.="CHANGE PICTURE"]//input';
		this.saveChangesButton = '//button[@data-test-id="save-changes-button"]';
		this.photoUploadedSuccessfully = '//img[contains(@class, "profile-picture") and contains(@src, "")]';
		this.myDefaultWorkspaceDropdown = '//span[./label[text()="My Default Workspace"]]/p-dropdown';
		this.myDefaultWorkspaceDropdownItem = '//p-dropdownitem/li[.="%s"]';
	}

	async clickSaveChangestButton() {
		await this.click(this.saveChangesButton);
	}

	async uploadPhoto() {
		await this.uploadFile(imagePath.profile, this.profilePhotoInput);
		await this.clickSaveChangestButton();
		await this.validateElementVisibility(this.photoUploadedSuccessfully);
	}

	async selectMyDefaultWorkspace({ details }) {
		await this.click(this.myDefaultWorkspaceDropdown);
		await this.click(sprintf(this.myDefaultWorkspaceDropdownItem, details.name));
		await this.clickSaveChangestButton();
	}
}
