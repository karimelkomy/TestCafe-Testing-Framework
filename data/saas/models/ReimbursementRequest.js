export default class ReimbursementRequest {
	constructor({
		organizationDetails,
		workspaceDetails,
		budgetDetails,
		requesterUserDetails,
		requestDetails,
		reimbursementDetails,
		billId,
	}) {
		this.organizationDetails = organizationDetails;
		this.workspaceDetails = workspaceDetails;
		this.budgetDetails = budgetDetails;
		this.requesterUserDetails = requesterUserDetails;
		this.requestDetails = requestDetails;
		this.reimbursementDetails = reimbursementDetails;
		this.billDetails = reimbursementDetails;
		this.billId = billId;
	}

	updateBudget(budgetDetails) {
		this.budgetDetails = budgetDetails;
	}

	setBillId(billId) {
		this.billId = billId;
	}
}
