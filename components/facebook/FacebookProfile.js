import GenericElement from "../shared/core/GenericElement";

export default class FacebookProfile extends GenericElement {
  constructor() {
    super();
    this.profilePicture = '//div[@aria-label="Page profile photo"]';
  }

  async validateProfilePicture() {
    await this.validateElementVisibility(this.profilePicture);
  }
}
