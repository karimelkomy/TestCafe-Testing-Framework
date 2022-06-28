import PaymentTable from "../components/saas/payments/PaymentTable";
import PaymentExpenseTable from "../components/saas/payments/PaymentExpenseTable";
import VendorCredit from "../components/saas/payments/VendorCredit";
import SelectBank from "../components/saas/payments/SelectBank";
import PaymentSubmitFooter from "../components/saas/payments/PaymentSubmitFooter";
import PaymentSuccess from "../components/saas/payments/PaymentSuccess";
import TotalPaid from "../../data/saas/constants/totalPaid";
import ProductsPrice from "../components/saas/shared/ProductsPrice";
import Receipt from "../components/saas/payments/Receipt";
import { formatedNumber } from "../utilities/helpers";

export default class SubmitPaymentPage {
  constructor() {
    this.productsPrice = new ProductsPrice();
    this.paymentTable = new PaymentTable();
    this.paymentExpenseTable = new PaymentExpenseTable();
    this.vendorCredit = new VendorCredit();
    this.selectBank = new SelectBank();
    this.paymentSubmitFooter = new PaymentSubmitFooter();
    this.paymentSuccess = new PaymentSuccess();
    this.receipt = new Receipt();
  }

  async submitPayment({ productRequest, bill }) {
    const payment = productRequest || bill;
    const {
      billId,
      productDetails,
      productsDetails,
      vendorDetails,
      workspaceDetails,
      requestDetails,
      rfqDetails,
      organizationDetails,
      billDetails
    } = payment;
    const productsDetailsValue = productDetails || productsDetails;

    const totalPaid =
      billDetails && billDetails.totalAdvanceAmount
        ? billDetails.totalAdvanceAmount
        : this.productsPrice.getTotalWithTaxAndShippingFeePrice({
            requestDetails,
            rfqDetails,
            productsDetails: productsDetailsValue
          });

    // TODO: pay bill from vendor credit
    await this.receipt.submit();

    await this.paymentTable.validatePaymentTable({
      billId,
      totalPaid: TotalPaid.INITIAL,
      productsDetails: productsDetailsValue,
      workspaceDetails,
      requestDetails,
      rfqDetails,
      organizationDetails,
      billDetails
    });

    let availableCredit = await this.vendorCredit.getTotalCreditAvailable();

    if (billDetails && billDetails.totalAdvanceAmount) {
      availableCredit += billDetails.totalAdvanceAmount;
    }

    await this.selectBank.submitBankAccount({
      totalPaid: TotalPaid.INITIAL,
      productsDetails: productsDetailsValue,
      requestDetails,
      rfqDetails,
      organizationDetails,
      billDetails
    });

    await this.paymentSubmitFooter.submit();

    await this.paymentSuccess.submit();

    await this.receipt.validate();

    await this.paymentTable.validatePaymentTable({
      billId,
      totalPaid,
      productsDetails: productsDetailsValue,
      workspaceDetails,
      requestDetails,
      rfqDetails,
      organizationDetails,
      billDetails
    });

    await this.vendorCredit.validateVendorCreditSection({
      availableCredit,
      vendorDetails,
      organizationDetails
    });

    await this.selectBank.validate({ totalPaid, organizationDetails });

    const billUrl = await this.paymentTable.getBillUrl(billId);

    payment.setBillUrl(billUrl);
  }

  async submitClientPayment({ productRequest }) {
    const {
      clientBillId,
      workspaceDetails,
      requestDetails,
      rfqDetails,
      organizationDetails,
      productDetails,
      productsDetails,
      markupDetails
    } = productRequest;
    const productsDetailsValue = productDetails || productsDetails;
    const totalPaid = this.productsPrice.getTotalWithTaxAndShippingFeePrice({
      requestDetails,
      rfqDetails,
      productsDetails: productsDetailsValue,
      markupDetails
    });

    await this.receipt.submit();

    await this.paymentTable.validatePaymentTable({
      billId: clientBillId,
      totalPaid: TotalPaid.INITIAL,
      productsDetails: productsDetailsValue,
      workspaceDetails,
      requestDetails,
      rfqDetails,
      organizationDetails,
      markupDetails
    });

    await this.selectBank.submitBankAccount({
      totalPaid: TotalPaid.INITIAL,
      productsDetails: productsDetailsValue,
      requestDetails,
      rfqDetails,
      organizationDetails,
      markupDetails
    });

    await this.paymentSubmitFooter.submit();

    await this.paymentSuccess.submit();

    await this.receipt.validate();

    await this.paymentTable.validatePaymentTable({
      billId: clientBillId,
      totalPaid,
      productsDetails: productsDetailsValue,
      workspaceDetails,
      requestDetails,
      rfqDetails,
      organizationDetails,
      markupDetails
    });

    await this.selectBank.validate({ totalPaid, organizationDetails });

    const clientBillUrl = await this.paymentTable.getBillUrl(clientBillId);

    productRequest.setClientBillUrl(clientBillUrl);
  }

  async submitExpensePayment({ bill }) {
    const { billId, billDetails, workspaceDetails, organizationDetails } = bill;

    const totalPaid = formatedNumber(
      billDetails.expenseItems
        .map(expenseItem => expenseItem.expenseAmount)
        .reduce((prev, next) => parseFloat(prev) + parseFloat(next))
    );

    await this.paymentExpenseTable.validatePaymentTable({
      billId,
      totalPaid: TotalPaid.INITIAL,
      billDetails,
      workspaceDetails,
      organizationDetails
    });

    await this.selectBank.submitExpenseBankAccount({
      totalPaid: TotalPaid.INITIAL,
      billDetails,
      organizationDetails
    });

    await this.paymentSubmitFooter.submit();

    await this.paymentSuccess.submit(); // BUG: Fix validation for new Post Payment Summary page.

    await this.paymentExpenseTable.validatePaymentTable({
      billId,
      totalPaid,
      billDetails,
      workspaceDetails,
      organizationDetails
    });

    await this.selectBank.validate({ totalPaid, organizationDetails });
  }
}
