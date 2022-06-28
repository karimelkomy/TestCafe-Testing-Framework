import ProductView from '../../components/marketplace/products/product-view/ProductView';

export default class ProductViewPage {
	constructor() {
		this.productView = new ProductView();
	}

	async addToRfq({ productDetails, marketplaceBuyerDetails }) {
		await this.productView.validateProductDetails(productDetails, marketplaceBuyerDetails);
		await this.productView.addToRfq();
	}
}
