import GenericElement from '../../shared/core/GenericElement';
import { imagePath } from '../../../data/saas/constants/documentsPath';
import { formatedNumberWithoutComma } from '../../../utilities/helpers';

export default class OrganizationSettings extends GenericElement {
	constructor() {
		super();
		this.uploadLogoInput = '//penny-upload//input';
		this.buildingNumberInput = '//p-inputnumber[@data-test-id="building-number-input"]//input';
		this.districtInput = '//input[@data-test-id="district-input"]';
		this.additionalNumberInput = '//p-inputnumber[@data-test-id="additional-number-input"]//input';
		this.unitNumberInput = '//p-inputnumber[@data-test-id="unit-number-input"]//input';
		this.saveButton = '//div[contains(@class, "display-none")]/button[.="Save" or .="SAVE CHANGES"]';
	}

	async updateOrganizationImage() {
		await this.uploadFile(imagePath.organization, this.uploadLogoInput);
	}

	async fillBuildingNumber({ buildingNumber }) {
		await this.fill(this.buildingNumberInput, formatedNumberWithoutComma(buildingNumber, 0));
	}

	async fillDistrict({ district }) {
		await this.fill(this.districtInput, district);
	}

	async fillAdditionalNumber({ additionalNumber }) {
		await this.fill(this.additionalNumberInput, formatedNumberWithoutComma(additionalNumber, 0));
	}

	async fillUnitNumber({ unitNumber }) {
		await this.fill(this.unitNumberInput, formatedNumberWithoutComma(unitNumber, 0));
	}

	async fillAddressInfo({ organizationDetails }) {
		const { buildingNumber, district, additionalNumber, unitNumber } = organizationDetails;

		await this.fillBuildingNumber({ buildingNumber });
		await this.fillDistrict({ district });
		await this.fillAdditionalNumber({ additionalNumber });
		await this.fillUnitNumber({ unitNumber });
	}

	async clickSaveButton() {
		await this.click(this.saveButton);
	}

	async submit({ organizationDetails }) {
		await this.updateOrganizationImage();
		await this.fillAddressInfo({ organizationDetails });
		await this.clickSaveButton();

		await this.wait(2);
	}
}
