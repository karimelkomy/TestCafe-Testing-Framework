import SignInForm from "../components/shared/SignInForm";
import Header from "../components/saas/shared/Header";
import { defaultPassword } from "../../data/saas/constants/credentials";

export default class SignInPage {
  constructor() {
    this.header = new Header();
    this.signInForm = new SignInForm();
  }

  async signIn({ user, logged = true }) {
    const { email, password } = user;
    const passwordValue = password || defaultPassword;

    if (logged) {
      await this.header.logOut();
    }

    await this.signInForm.submitSignIn({ email, password: passwordValue });
  }
}
