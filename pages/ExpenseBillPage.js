import ExpenseBill from "../components/saas/bills/expense-bill/ExpenseBill";
import BillExpenseAccount from "../components/saas/bills/expense-bill/BillExpenseAccount";
import BillInfoBox from "../components/saas/bills/expense-bill/BillInfoBox";
import BillSubmitFooter from "../components/saas/bills/expense-bill/BillSubmitFooter";
import BillSuccess from "../components/saas/bills/expense-bill/BillSuccess";
import BillPriceSummary from "../components/saas/bills/expense-bill/BillPriceSummary";
import BillExpenseTable from "../components/saas/bills/expense-bill/BillExpenseTable";

export default class ExpenseBillPage {
  constructor() {
    this.expenseBill = new ExpenseBill();
    this.billExpenseAccount = new BillExpenseAccount();
    this.billInfoBox = new BillInfoBox();
    this.billExpenseTable = new BillExpenseTable();
    this.billPriceSummary = new BillPriceSummary();
    this.billSubmitFooter = new BillSubmitFooter();
    this.billSuccess = new BillSuccess();
  }

  async validateExpenseBill({ bill }) {
    await this.billInfoBox.validateBillInfoBox({ bill });
    await this.billExpenseTable.validateExpenseTable({ bill });
    await this.billPriceSummary.validateSummary({ bill });
  }

  async createAndSubmitBillWithoutBudget({ bill }) {
    await this.expenseBill.create({ bill });

    await this.validateExpenseBill({ bill });

    await this.billInfoBox.uploadInvoice();

    await this.billInfoBox.validateUploadedInvoice();

    await this.billSubmitFooter.submitBill();

    const billId = await this.billSuccess.submit();

    await this.billInfoBox.validateUploadedInvoice();

    await this.validateExpenseBill({ bill });

    bill.setBillId(billId);
  }

  async createAndSubmitBillWithBudget({ bill }) {
    const { billDetails, organizationDetails } = bill;

    await this.expenseBill.create({ bill });

    await this.validateExpenseBill({ bill });

    await this.billInfoBox.uploadInvoice();
    await this.billInfoBox.validateUploadedInvoice();

    await this.billExpenseAccount.submit({ bill });

    await this.billSubmitFooter.submitBill();

    const billId = await this.billSuccess.submit();

    const newBudgetDetails = await this.billExpenseAccount.calculateNewBudgetDetails(
      { bill }
    );

    await this.billInfoBox.validateUploadedInvoice();

    await this.billExpenseAccount.validateExpenseAccountBalance({
      billDetails,
      budgetDetails: newBudgetDetails,
      organizationDetails
    });

    await this.validateExpenseBill({ bill });

    bill.setBillId(billId);
    bill.updateBudget(newBudgetDetails);
  }
}
