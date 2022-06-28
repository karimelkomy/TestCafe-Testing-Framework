import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class ModulesSettingsSideBar extends GenericElement {
	constructor() {
		super();
		this.moduleInputSwitch = '//tr[.//input[@placeholder="%s"]]//p-inputswitch';
		this.condirmButton = '//div[contains(@class, "display-m-block")]//button[@data-test-id="confirm-button"]';
	}

	async clickModuleInputSwitch({ moduleName }) {
		await this.click(sprintf(this.moduleInputSwitch, moduleName));
	}

	async clickConfirmButton() {
		await this.click(this.condirmButton);
	}

	async submit({ modulesName }) {
		for (let moduleName of modulesName) {
			await this.clickModuleInputSwitch({ moduleName });
		}

		await this.clickConfirmButton();
	}
}
