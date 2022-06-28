import CataloguesBox from '../../components/saas/product-and-catalogues/CataloguesBox';
import CataloguesList from '../../components/saas/product-and-catalogues/all-catalogues/CataloguesList';
import CategoryList from '../../components/saas/product-and-catalogues/all-catalogues/CategoryList';
import ProductsList from '../../components/saas/product-and-catalogues/ProductsList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class ProductsPage {
	constructor() {
		this.cataloguesBox = new CataloguesBox();
		this.cataloguesList = new CataloguesList();
		this.categoryList = new CategoryList();
		this.productsList = new ProductsList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async deleteProduct({ catalogueDetails, productsDetails }) {
		for (let productDetails of productsDetails) {
			await this.modulesSideBar.clickProductAndCataloguesLink();
			await this.cataloguesBox.clickShowAllCataloguesButton();
			await this.cataloguesList.selectCatalogue({ catalogueDetails });
			await this.categoryList.selectCategory({ productDetails });
			await this.productsList.deleteProduct({ productDetails });
		}
	}
}
