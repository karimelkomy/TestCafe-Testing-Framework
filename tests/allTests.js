import HomePage from "../pages/HomePage";
import { urls } from "../data/urls";
import { ContactsDetails } from "../data/ContactDetails";
import CompanyPage from "../pages/CompanyPage";
import FacebookPage from "../pages/FacebookPage";
import NavigationBar from "../components/shared/NavigationBar";
import FooterBar from "../components/shared/FooterBar";
import CookiesModel from "../components/shared/CookiesModel";
import CareerPage from "../pages/CareerPage";
import { JobDetails, JobDetailsByCity } from "../data/JobDetails";

fixture`Musala Soft `.page(urls.home).beforeEach(async t => {
  await t.maximizeWindow();
  await t.setNativeDialogHandler(() => true);
});

test("Contact us with invalid email show error message", async t => {
  const homePage = new HomePage();
  const cookiesModel = new CookiesModel();

  await cookiesModel.accept();
  await homePage.submitContactsWithInvalidEmail(ContactsDetails);
}).meta({
  customTest: "contact-us-with-invalid-email-show-error-message"
});

test("Verify company page and facebook page urls", async t => {
  const cookiesModel = new CookiesModel();
  const companyPage = new CompanyPage();
  const facebookPage = new FacebookPage();
  const navigationBar = new NavigationBar();
  const footerBar = new FooterBar();

  await cookiesModel.accept();
  await navigationBar.navToCompanyPage();
  await companyPage.validateLeadershipSection();
  await footerBar.navToFacebookPage();
  await facebookPage.validateProfilePicture();
}).meta({
  customTest: "verify-company-page-and-facebook-page-urls"
});

test("Apply for job", async t => {
  const cookiesModel = new CookiesModel();
  const careerPage = new CareerPage();
  const navigationBar = new NavigationBar();

  await cookiesModel.accept();
  await navigationBar.navToCareersPage();
  await careerPage.applyForJob(JobDetails);
}).meta({
  customTest: "apply-for-job"
});

test("Log all positions in Sofia and Skopje", async t => {
  const cookiesModel = new CookiesModel();
  const careerPage = new CareerPage();
  const navigationBar = new NavigationBar();

  await cookiesModel.accept();
  await navigationBar.navToCareersPage();
  await careerPage.logAllPositions(JobDetailsByCity);
}).meta({
  customTest: "log-all-positions-in-sofia-and-skopje"
});
