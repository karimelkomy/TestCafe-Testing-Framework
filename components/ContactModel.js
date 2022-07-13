import { sprintf } from "sprintf-js";
import GenericElement from "./shared/core/GenericElement";

export default class ContactModel extends GenericElement {
  constructor() {
    super();
    this.element = "//form";
    this.contactUsButton = '//button[./span[@data-alt="Contact us"]]';
    this.nameInput = `${this.element}//input[@name="your-name"]`;
    this.emailInput = `${this.element}//input[@name="your-email"]`;
    this.mobileInput = `${this.element}//input[@name="mobile-number"]`;
    this.subjectInput = `${this.element}//input[@name="your-subject"]`;
    this.messageInput = `${this.element}//textarea[@name="your-message"]`;
    this.sendButton = `${this.element}//input[@value="Send"]`;
    this.errorMessage = `${this.element}//span[contains(@class, "your-email")]/span[text()="%s"]`;
  }

  async clickContactUsButton() {
    await this.click(this.contactUsButton);
  }

  async fillName(name) {
    await this.fill(this.nameInput, name);
  }

  async fillEmail(email) {
    await this.fill(this.emailInput, email);
  }

  async fillMobile(mobile) {
    await this.fill(this.mobileInput, mobile);
  }

  async fillSubject(subject) {
    await this.fill(this.subjectInput, subject);
  }

  async fillMessage(message) {
    await this.fill(this.messageInput, message);
  }

  async clickSendButton() {
    await this.click(this.sendButton);
  }

  async validateErrorMessage(errorMessage) {
    await this.validateElementVisibility(
      sprintf(this.errorMessage, errorMessage)
    );
  }

  async submit(contactDetails) {
    const { name, email, mobile, subject, message } = contactDetails;

    await this.clickContactUsButton();

    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillMobile(mobile);
    await this.fillSubject(subject);
    await this.fillMessage(message);
    await this.clickSendButton();
  }
}
