import HomePage from "../pages/HomePage";
import { bookmarks } from "../data/bookmarks";
import { urls } from "../data/urls";
import { searchInput, searchResult } from "../data/search";
import ContactPage from "../pages/ContactPage";
import { ContactDetails } from "../data/ContactDetails";

fixture`Mostly.AI `.page(urls.home).beforeEach(async t => {
  await t.maximizeWindow();
  await t.setNativeDialogHandler(() => true);
});

test("Verify home page bookmarks", async t => {
  const homePage = new HomePage();

  await homePage.validateBookmarks(bookmarks);
}).meta({
  customTest: "verify-home-page-bookmarks"
});

test("Empty result search", async t => {
  const homePage = new HomePage();

  await homePage.search(searchInput, searchResult);
}).meta({
  customTest: "empty-result-search"
});

test("Contact support team", async t => {
  const homePage = new HomePage();
  const contactPage = new ContactPage();

  await homePage.goToContactPage();
  await contactPage.submitContact(ContactDetails);
}).meta({
  customTest: "contact-support-team"
});
