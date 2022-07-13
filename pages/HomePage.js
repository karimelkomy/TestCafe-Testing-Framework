import ContactModel from "../components/ContactModel";
import { InvalidEmailError } from "../data/ErrorMessage";

export default class HomePage {
  constructor() {
    this.contactModel = new ContactModel();
  }

  async submitContactsWithInvalidEmail(contactsDetails) {
    for (let contactDetails of contactsDetails) {
      await this.contactModel.submit(contactDetails);
      await this.contactModel.validateErrorMessage(InvalidEmailError);
    }
  }
}
