import ProductsBox from "../components/saas/product-and-catalogues/ProductsBox";
import ProductInfo from "../components/saas/product-and-catalogues/create-new-product/product-info/ProductInfo";
import ProductDetails from "../components/saas/product-and-catalogues/create-new-product/ProductDetails";
import ProductMedia from "../components/saas/product-and-catalogues/create-new-product/ProductMedia";
import ProductPricing from "../components/saas/product-and-catalogues/create-new-product/ProductPricing";
import TechnicalSpecs from "../components/saas/product-and-catalogues/create-new-product/TechnicalSpecs";
import ProductSuccess from "../components/saas/product-and-catalogues/create-new-product/ProductSuccess";
import ViewProductPage from "./ViewProductPage";
import ModulesSideBar from "../components/saas/shared/ModulesSideBar";

export default class CreateNewProductPage {
  constructor() {
    this.productsBox = new ProductsBox();
    this.productInfo = new ProductInfo();
    this.productDetails = new ProductDetails();
    this.productMedia = new ProductMedia();
    this.productPricing = new ProductPricing();
    this.technicalSpecs = new TechnicalSpecs();
    this.productSuccess = new ProductSuccess();
    this.modulesSideBar = new ModulesSideBar();
    this.viewProductPage = new ViewProductPage();
  }

  async deleteCategory({ productsDetails }) {
    await this.modulesSideBar.clickProductAndCataloguesLink();

    await this.productsBox.clickCreateProductButton();

    for (let productDetails of productsDetails) {
      const { categoryName } = productDetails;

      await this.productInfo.deleteCategory({ categoryName });
    }
  }

  async createProduct({
    organizationDetails,
    catalogueDetails,
    productsDetails,
    preferredVendorDetails
  }) {
    for (let productDetails of productsDetails) {
      await this.modulesSideBar.clickProductAndCataloguesLink();
      await this.productsBox.clickCreateProductButton();
      await this.productInfo.submit({
        productDetails,
        catalogueDetails,
        preferredVendorDetails
      });
      await this.productDetails.submitProductDetails({ productDetails });
      await this.productMedia.submitProductMedia();
      await this.productPricing.submitProductPricing({
        productDetails,
        organizationDetails
      });
      await this.technicalSpecs.submitTechnicalSpecs({ productDetails });
      await this.productSuccess.submitProductSuccess({ productDetails });
      await this.viewProductPage.validateProduct({
        productDetails,
        organizationDetails
      });
    }
  }
}
