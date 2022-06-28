import GenericElement from '../../../shared/core/GenericElement';
import RfqsSubmittedList from './RfqsSubmittedList';
import RfqSubmittedHeader from './RfqSubmittedHeader';
import RfqSubmittedTable from './RfqSubmittedTable';
import RfqSubmittedFooter from './RfqSubmittedFooter';

export default class RfqsSubmitted extends GenericElement {
	constructor() {
		super();
		this.rfqsSubmittedList = new RfqsSubmittedList();
		this.rfqSubmittedHeader = new RfqSubmittedHeader();
		this.rfqSubmittedTable = new RfqSubmittedTable();
		this.rfqSubmittedFooter = new RfqSubmittedFooter();
	}

	async submit({ productDetails, rfqDetails, supplierDetails, deliveryLocationDetails, status }) {
		await this.rfqsSubmittedList.openFirstSubmittedRfq({ rfqDetails, supplierDetails, deliveryLocationDetails, status });
		await this.rfqSubmittedHeader.submit({ rfqDetails, supplierDetails, deliveryLocationDetails, status });
		await this.rfqSubmittedTable.submit(productDetails, rfqDetails);
		await this.rfqSubmittedFooter.submit(rfqDetails);
	}
}
