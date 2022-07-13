import BookmarksHeader from "../components/BookmarksHeader/BookmarksHeader";
import SearchModel from "../components/SearchModel";
import PrivacyModel from "../components/PrivacyModel";

export default class HomePage {
  constructor() {
    this.privacyModel = new PrivacyModel();
    this.bookmarksHeader = new BookmarksHeader();
    this.searchModel = new SearchModel();
  }

  async validateBookmarks(bookmarks) {
    await this.privacyModel.accept();
    await this.bookmarksHeader.validateBookmarksVisibility(bookmarks);
  }

  async search(searchInput, searchResult) {
    await this.privacyModel.accept();
    await this.searchModel.search(searchInput, searchResult);
  }

  async goToContactPage() {
    await this.privacyModel.accept();
    await this.bookmarksHeader.openContactPage();
  }
}
