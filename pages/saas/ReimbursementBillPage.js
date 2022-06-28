import BillInfoBox from '../../components/saas/bills/reimbursement-bill/BillInfoBox';
import BillPriceSummary from '../../components/saas/bills/reimbursement-bill/BillPriceSummary';
import BillExpenseAccount from '../../components/saas/bills/reimbursement-bill/BillExpenseAccount';
import BillSubmitFooter from '../../components/saas/bills/reimbursement-bill/BillSubmitFooter';
import BillSuccess from '../../components/saas/bills/reimbursement-bill/BillSuccess';
import BillExpenseTable from '../../components/saas/bills/reimbursement-bill/BillExpenseTable';

export default class ReimbursementBillPage {
	constructor() {
		this.billInfoBox = new BillInfoBox();
		this.billExpenseTable = new BillExpenseTable();
		this.billPriceSummary = new BillPriceSummary();
		this.billSubmitFooter = new BillSubmitFooter();
		this.billExpenseAccount = new BillExpenseAccount();
		this.billSuccess = new BillSuccess();
	}

	async validateReimbursementBill({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails }) {
		await this.billInfoBox.validateBillInfoBox({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails });
		await this.billExpenseTable.validateExpenseTable({ reimbursementDetails, organizationDetails });
		await this.billPriceSummary.validateSummary({ reimbursementDetails, organizationDetails });
	}

	async submitReimbursementBillWithoutBudget({ reimbursementRequest }) {
		const { reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails } = reimbursementRequest;

		await this.validateReimbursementBill({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails });

		await this.billInfoBox.uploadInvoice();
		await this.billInfoBox.validateUploadedInvoice();

		await this.billSubmitFooter.submitBill();

		const billId = await this.billSuccess.submit();

		await this.billInfoBox.validateUploadedInvoice();

		await this.validateReimbursementBill({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails });

		reimbursementRequest.setBillId(billId);
	}

	async submitReimbursementBillWithBudget({ reimbursementRequest }) {
		const { reimbursementDetails, workspaceDetails, budgetDetails, organizationDetails, requesterUserDetails } = reimbursementRequest;

		await this.validateReimbursementBill({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails });

		await this.billExpenseAccount.submit({ reimbursementDetails, budgetDetails, organizationDetails });

		await this.billInfoBox.uploadInvoice();
		await this.billInfoBox.validateUploadedInvoice();

		await this.billSubmitFooter.submitBill();

		const billId = await this.billSuccess.submit();

		const newBudgetDetails = await this.billExpenseAccount.calculateNewBudgetDetails({ budgetDetails, reimbursementDetails });

		await this.billInfoBox.validateUploadedInvoice();

		await this.billExpenseAccount.validateExpenseAccountBalance(reimbursementDetails, newBudgetDetails, organizationDetails);

		await this.validateReimbursementBill({ reimbursementDetails, workspaceDetails, organizationDetails, requesterUserDetails });

		reimbursementRequest.setBillId(billId);
		reimbursementRequest.updateBudget(newBudgetDetails);
	}
}
