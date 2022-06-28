export default class Bill {
	constructor({
		organizationDetails,
		vendorDetails,
		budgetDetails,
		workspaceDetails,
		rfqDetails,
		requestDetails,
		billDetails,
		billId,
		billUrl,
	}) {
		this.organizationDetails = organizationDetails;
		this.vendorDetails = vendorDetails;
		this.budgetDetails = budgetDetails;
		this.workspaceDetails = workspaceDetails;
		this.rfqDetails = rfqDetails;
		this.requestDetails = requestDetails;
		this.billDetails = billDetails;
		this.billId = billId;
		this.billUrl = billUrl;
	}

	updateBudget(budgetDetails) {
		this.budgetDetails = budgetDetails;
	}

	setBillId(billId) {
		this.billId = billId;
	}

	setBillUrl(billUrl) {
		this.billUrl = billUrl;
	}
}
