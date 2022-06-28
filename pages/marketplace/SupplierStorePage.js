import SupplierStore from '../../components/marketplace/supplier-stores/SupplierStore';

export default class SupplierStorePage {
	constructor() {
		this.supplierStore = new SupplierStore();
	}

	async validateSupplierDetails({ supplierDetails }) {
		await this.supplierStore.validateSupplierDetails(supplierDetails);
	}

	async openProductCard({ productDetails }) {
		await this.supplierStore.searchProduct(productDetails);
		await this.supplierStore.openProductCard(productDetails);
	}
}
