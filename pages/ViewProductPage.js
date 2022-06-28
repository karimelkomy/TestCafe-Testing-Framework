import DescriptionModule from "../components/saas/product-and-catalogues/all-products/ProductView/DescriptionModule";
import ProductDetailsModule from "../components/saas/product-and-catalogues/all-products/ProductView/ProductDetailsModule";
import ProductSpecsModule from "../components/saas/product-and-catalogues/all-products/ProductView/ProductSpecsModule";
import ProductSummary from "../components/saas/product-and-catalogues/all-products/ProductView/ProductSummary";

export default class ViewProductPage {
  constructor() {
    this.descriptionModule = new DescriptionModule();
    this.productDetailsModule = new ProductDetailsModule();
    this.productSpecsModule = new ProductSpecsModule();
    this.productSummary = new ProductSummary();
  }

  async validateProduct({ productDetails, organizationDetails }) {
    await this.descriptionModule.validateDescriptionModule({ productDetails });
    await this.productDetailsModule.validateProductDetailsModule({
      productDetails
    });
    await this.productSpecsModule.validateProductSpecsModule({
      productDetails
    });
    await this.productSummary.validateProductSummaryModule({
      productDetails,
      organizationDetails
    });
  }
}
