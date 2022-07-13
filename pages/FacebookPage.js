import FacebookProfile from "../components/facebook/FacebookProfile";

export default class FacebookPage {
  constructor() {
    this.facebookProfile = new FacebookProfile();
  }

  async validateProfilePicture() {
    await this.facebookProfile.validateProfilePicture();
  }
}
