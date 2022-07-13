import GenericElement from "./shared/core/GenericElement";

export default class ContactModel extends GenericElement {
  constructor() {
    super();
    this.youText = '//span[text()="you"]';
    this.firstNameInput = '//input[@name="firstname"]';
    this.lastNameInput = '//input[@name="lastname"]';
    this.emailInput = '//input[@name="email"]';
    this.phoneInput = '//input[@name="mobilephone"]';
    this.companyInput = '//input[@name="company"]';
    this.messageInput = '//textarea[@name="message"]';
    this.legalCheckbox =
      '//input[@type="checkbox" and contains(@id, "LEGAL_CONSENT")]';
    this.sendMessageButton = '//input[@value="SEND MESSAGE"]';
  }

  async activateComponent() {
    await this.click(this.youText);
  }

  async fillFirstName(firstName) {
    await this.fill(this.firstNameInput, firstName);
  }

  async fillLastName(lastName) {
    await this.fill(this.lastNameInput, lastName);
  }

  async fillEmail(email) {
    await this.fill(this.emailInput, email);
  }

  async fillPhone(phone) {
    await this.fill(this.phoneInput, phone);
  }

  async fillCompany(company) {
    await this.fill(this.companyInput, company);
  }

  async fillMessage(message) {
    await this.fill(this.messageInput, message);
  }

  async clickLegalCheckbox() {
    await this.click(this.legalCheckbox);
  }

  async hoverSendMessage() {
    await this.hover(this.sendMessageButton);
  }

  async submit(contactDetails) {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      message
    } = contactDetails;

    await this.activateComponent();
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPhone(phone);
    await this.fillCompany(company);
    await this.fillMessage(message);
    await this.clickLegalCheckbox();
    await this.hoverSendMessage();
  }
}
