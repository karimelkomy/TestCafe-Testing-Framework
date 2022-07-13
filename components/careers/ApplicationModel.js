import { sprintf } from "sprintf-js";
import GenericElement from "../shared/core/GenericElement";
import { documentPath } from "../../data/documentsPath";
import { checkElementVisibility } from "../../utilities/helpers";

export default class ApplicationModel extends GenericElement {
  constructor() {
    super();
    this.element = "//form";
    this.nameInput = `${this.element}//input[@name="your-name"]`;
    this.emailInput = `${this.element}//input[@name="your-email"]`;
    this.mobileInput = `${this.element}//input[@name="mobile-number"]`;
    this.resumeUploadInput = `${this.element}//input[@name="upload-cv"]`;
    this.agreeCheckbox = `${this.element}//div[./input[@id="adConsentChx"]]`;
    this.sendButton = `${this.element}//input[@value="Send"]`;
    this.errorMessage = `(${this.element}//span[text()="%s"])[1]`;
    this.closeButton = `${this.element}//button[@class="close-form"]`;
  }

  async fillName(name) {
    if (name) {
      await this.fill(this.nameInput, name);
    }
  }

  async fillEmail(email) {
    if (email) {
      await this.fill(this.emailInput, email);
    }
  }

  async fillMobile(mobile) {
    if (mobile) {
      await this.fill(this.mobileInput, mobile);
    }
  }

  async uploadResume() {
    await this.uploadFile(documentPath.resume, this.resumeUploadInput);
  }

  async markAgreeCheckbox() {
    await this.click(this.agreeCheckbox);
  }

  async clickSendButton() {
    await this.click(this.sendButton);
  }

  async validateErrorMessage(error) {
    await this.validateElementVisibility(sprintf(this.errorMessage, error));
  }

  async clickCloseButton() {
    if (await checkElementVisibility(this.closeButton)) {
      await this.click(this.closeButton);
    }
  }

  async submit({ applications }) {
    await this.markAgreeCheckbox();

    for (let application of applications) {
      const { name, email, mobile, error } = application;

      await this.fillName(name);
      await this.fillEmail(email);
      await this.fillMobile(mobile);
      await this.uploadResume();
      await this.clickSendButton();
      await this.clickCloseButton();
      await this.validateErrorMessage(error);
    }
  }
}
