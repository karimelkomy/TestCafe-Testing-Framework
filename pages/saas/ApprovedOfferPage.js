import OfferSubmitFooter from '../../components/saas/orders/approved-offer/OfferSubmitFooter';
import OfferInfoBox from '../../components/saas/orders/approved-offer/OfferInfoBox';
import OfferHeader from '../../components/saas/orders/approved-offer/OfferHeader';
import OfferProductAndServiceTable from '../../components/saas/orders/approved-offer/OfferProductAndServiceTable';
import OfferPriceSummary from '../../components/saas/orders/approved-offer/OfferPriceSummary';

export default class ApprovedOfferPage {
	constructor() {
		this.offerHeader = new OfferHeader();
		this.offerInfoBox = new OfferInfoBox();
		this.offerProductAndServiceTable = new OfferProductAndServiceTable();
		this.offerPriceSummary = new OfferPriceSummary();
		this.offerSubmitFooter = new OfferSubmitFooter();
	}

	async submit({ productRequest }) {
		await this.offerHeader.validate({ productRequest });

		await this.offerInfoBox.validate({ productRequest });

		await this.offerProductAndServiceTable.validate({ productRequest });

		await this.offerPriceSummary.validate({ productRequest });

		await this.offerSubmitFooter.submit({ productRequest });
	}

	async submitClient({ productRequest }) {
		await this.offerHeader.validateClient({ productRequest });

		await this.offerInfoBox.validateClient({ productRequest });

		await this.offerProductAndServiceTable.validateClient({ productRequest });

		await this.offerPriceSummary.validateClient({ productRequest });

		await this.offerSubmitFooter.submit({ productRequest });
	}
}
