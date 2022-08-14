import ProductItem from "../components/ProductsList/ProductItem";

export default class ProductsListPage {
  constructor() {
    this.productItem = new ProductItem();
  }

  async addToCart(productDetails) {
    await this.productItem.submit({ productDetails });
  }
}
