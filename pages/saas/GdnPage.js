import GdnHeader from '../../components/saas/gdns/GdnHeader';
import GdnProductAndServiceTable from '../../components/saas/gdns/GdnProductAndServiceTable';
import GdnSubmitFooter from '../../components/saas/gdns/GdnSubmitFooter';
import grnQty from '../../data/saas/constants/grnQty';
import GdnInfoBox from '../../components/saas/gdns/GdnInfoBox';
import GdnSidebar from '../../components/saas/gdns/GdnSidebar';
import GrnStatus from '../../data/saas/constants/grnStatus';

export default class GdnPage {
	constructor() {
		this.gdnHeader = new GdnHeader();
		this.gdnProductAndServiceTable = new GdnProductAndServiceTable();
		this.gdnSubmitFooter = new GdnSubmitFooter();
		this.gdnInfoBox = new GdnInfoBox();
		this.gdnSidebar = new GdnSidebar();
	}

	async submitGdn({ productRequest }) {
		const { requestDetails } = productRequest;

		await this.gdnHeader.validateGdnHeader({ productRequest });
		await this.gdnInfoBox.validateGdnInfoBox({ productRequest });
		await this.gdnInfoBox.uploadInvoice();
		await this.gdnInfoBox.validateUploadedInvoice();
		await this.gdnProductAndServiceTable.submit({ deliveredQty: grnQty.INITIAL, recievedQty: grnQty.INITIAL, productRequest });

		await this.gdnSubmitFooter.submitQuantity();

		await this.gdnHeader.openGeneratedGdn();

		await this.gdnSidebar.validate({ recievedQty: grnQty.INITIAL, productRequest });

		await this.gdnInfoBox.validateGdnInfoBox({ productRequest });
		await this.gdnProductAndServiceTable.validate({ deliveredQty: requestDetails.qty, recievedQty: grnQty.INITIAL, productRequest });
	}
}
