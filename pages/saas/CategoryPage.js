import CataloguesBox from '../../components/saas/product-and-catalogues/CataloguesBox';
import CataloguesList from '../../components/saas/product-and-catalogues/all-catalogues/CataloguesList';
import CategoryList from '../../components/saas/product-and-catalogues/all-catalogues/CategoryList';
import ModulesSideBar from '../../components/saas/shared/ModulesSideBar';

export default class CategoryPage {
	constructor() {
		this.cataloguesBox = new CataloguesBox();
		this.cataloguesList = new CataloguesList();
		this.categoryList = new CategoryList();
		this.modulesSideBar = new ModulesSideBar();
	}

	async deleteCatalogue({ catalogueDetails }) {
		await this.modulesSideBar.clickProductAndCataloguesLink();

		await this.cataloguesBox.clickShowAllCataloguesButton();

		await this.cataloguesList.selectCatalogue({ catalogueDetails });

		await this.categoryList.deleteCatalogue();
	}
}
