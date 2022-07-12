import ContactModel from "../components/ContactModel";

export default class ContactPage {
  constructor() {
    this.contactModel = new ContactModel();
  }

  async submitContact(contactDetails) {
    await this.contactModel.submit(contactDetails);
  }
}
