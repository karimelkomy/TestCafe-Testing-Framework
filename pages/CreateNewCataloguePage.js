import CataloguesBox from "../components/saas/product-and-catalogues/CataloguesBox";
import CatalogueInfo from "../components/saas/product-and-catalogues/create-new-catalogue/CatalogueInfo";
import AddUsers from "../components/saas/product-and-catalogues/create-new-catalogue/AddUsers/AddUsers";
import AddProducts from "../components/saas/product-and-catalogues/create-new-catalogue/AddProducts";
import CatalogueSuccess from "../components/saas/product-and-catalogues/create-new-catalogue/CatalogueSuccess";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class CreateNewCataloguePage {
  constructor() {
    this.cataloguesBox = new CataloguesBox();
    this.catalogueInfo = new CatalogueInfo();
    this.addUsers = new AddUsers();
    this.addProducts = new AddProducts();
    this.catalogueSuccess = new CatalogueSuccess();
    this.modulesSideBar = new ModulesSideBar();
  }

  async createCatalogue({ catalogueDetails, usersDetails, clientsDetails }) {
    await this.modulesSideBar.clickProductAndCataloguesLink();

    await this.cataloguesBox.clickCreateCatalogueButton();
    await this.catalogueInfo.submitCatalogueInfo({ catalogueDetails });
    await this.addUsers.submitUser({ usersDetails, clientsDetails });
    await this.addProducts.submitAddProducts();
    await this.catalogueSuccess.validateCatalogueSuccess({ catalogueDetails });
  }
}
