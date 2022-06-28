import GenericElement from '../../../shared/core/GenericElement';
import RfqDraftsSidebar from './RfqDraftsSidebar';
import RfqDraftsSuccess from './RfqDraftsSuccess';
import RfqDraftHeader from './RfqDraftHeader';
import RfqDraftsTable from './RfqDraftsTable';
import RfqDraftsFooter from './RfqDraftsFooter';

export default class RfqDrafts extends GenericElement {
	constructor() {
		super();
		this.rfqDraftHeader = new RfqDraftHeader();
		this.rfqDraftsTable = new RfqDraftsTable();
		this.rfqDraftsFooter = new RfqDraftsFooter();
		this.rfqDraftsSidebar = new RfqDraftsSidebar();
		this.rfqDraftsSuccess = new RfqDraftsSuccess();
	}

	async submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails }) {
		await this.rfqDraftHeader.submit({ rfqDetails, supplierDetails, deliveryLocationDetails });
		await this.rfqDraftsTable.submit(productDetails, rfqDetails);
		await this.rfqDraftsFooter.submit(rfqDetails);
		await this.rfqDraftsSidebar.submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails });
		await this.rfqDraftsSuccess.submit();
	}
}
