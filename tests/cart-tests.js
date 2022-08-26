import NavigationBar from "../components/shared/NavigationBar";
import ProductsListPage from "../pages/ProductsListPage";
import CartPage from "../pages/CartPage";
import { urls } from "../data/urls";
import { ProductDetails } from "../data/ProductDetails";

fixture`Floward Tests `.page(urls.home).beforeEach(async t => {
  await t.maximizeWindow();
  await t.setNativeDialogHandler(() => true);
});

test("Add product to cart successfully", async t => {
  const navigationBar = new NavigationBar();
  const productsListPage = new ProductsListPage();
  const cartPage = new CartPage();

  await navigationBar.navToFlowersAndJewelryPage();

  await productsListPage.addToCart(ProductDetails);

  await cartPage.validateProduct(ProductDetails);
}).meta({
  customTest: "add-product-to-cart-successfully"
});
