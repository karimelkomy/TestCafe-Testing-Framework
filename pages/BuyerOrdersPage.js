import OrdersInfoBox from "../components/saas/orders/OrdersInfoBox";
import TermsAndConditionsSidebar from "../components/saas/orders/TermsAndConditionsSidebar";
import OrdersProductAndServiceTable from "../components/saas/orders/OrdersProductAndServiceTable";
import OrdersExpenseAccount from "../components/saas/orders/OrdersExpenseAccount";
import OrdersPriceSummary from "../components/saas/orders/OrdersPriceSummary";
import OrdersSubmitFooter from "../components/saas/orders/OrdersSubmitFooter";
import OrderSuccess from "../components/saas/orders/OrderSuccess";
import OrderStatus from "../../data/saas/constants/orderStatus";
import OrdersHeader from "../components/saas/orders/OrdersHeader";
import OrderApproval from "../components/saas/orders/order-approval/OrderApproval";
import { getCurrentUrl, navigateTo } from "../utilities/helpers";

export default class BuyerOrdersPage {
  constructor() {
    this.ordersHeader = new OrdersHeader();
    this.ordersInfoBox = new OrdersInfoBox();
    this.termsAndConditionsSidebar = new TermsAndConditionsSidebar();
    this.ordersProductAndServiceTable = new OrdersProductAndServiceTable();
    this.ordersExpenseAccount = new OrdersExpenseAccount();
    this.ordersPriceSummary = new OrdersPriceSummary();
    this.ordersSubmitFooter = new OrdersSubmitFooter();
    this.orderSuccess = new OrderSuccess();
    this.orderApproval = new OrderApproval();
  }

  async getOrderUrl() {
    return getCurrentUrl();
  }

  async goToOrderPage({ productRequest }) {
    const { orderUrl } = productRequest;

    await navigateTo(orderUrl);
  }

  async validateOrderStatus({ productRequest }) {
    const { orderStatus } = productRequest;

    await this.goToOrderPage({ productRequest });

    await this.ordersInfoBox.validateStatus({ orderStatus });
  }

  async validateClientOrderStatus({ productRequest }) {
    const { clientOrderStatus } = productRequest;

    await this.goToOrderPage({ productRequest });

    await this.ordersInfoBox.validateStatus({ orderStatus: clientOrderStatus });
  }

  async submitClientOrderWithoutBudget({
    productRequest,
    approveOrder,
    approverUserDetails
  }) {
    const {
      requestDetails,
      rfqDetails,
      workspaceDetails,
      clientRequesterUserDetails,
      organizationDetails,
      organizationLocation,
      orderDetails,
      productsDetails,
      clientOrderStatus,
      markupDetails
    } = productRequest;

    await this.ordersHeader.validateOrdersHeader({
      requestDetails,
      requesterUserDetails: clientRequesterUserDetails
    });

    await this.ordersInfoBox.validateOrdersInfoBox({
      orderStatus: clientOrderStatus,
      rfqDetails,
      workspaceDetails,
      organizationLocation
    });

    await this.ordersProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      organizationDetails,
      productsDetails,
      markupDetails
    });

    await this.ordersPriceSummary.validateSummary({
      productsDetails,
      organizationDetails,
      requestDetails,
      rfqDetails,
      markupDetails
    });

    const orderUrl = await this.getOrderUrl();

    productRequest.setOrderUrl(orderUrl);

    await this.ordersSubmitFooter.submit();

    const orderId = await this.orderSuccess.submit();

    productRequest.setOrderId(orderId);

    if (approveOrder) {
      productRequest.updateClientOrderStatus(OrderStatus.APPROVAL_PENDING);

      await this.validateClientOrderStatus({ productRequest });

      await this.orderApproval.approveOrder({
        orderId,
        orderDetails,
        approverUserDetails
      });

      await this.orderSuccess.submit();
    }

    productRequest.updateClientOrderStatus(OrderStatus.SUBMITTED);

    await this.validateClientOrderStatus({ productRequest });
  }

  async submitOrderWithoutBudget({ productRequest }) {
    const {
      requestDetails,
      rfqDetails,
      workspaceDetails,
      rfqId,
      vendorDetails,
      orderDetails,
      requesterUserDetails,
      organizationDetails,
      organizationLocation,
      productsDetails,
      orderStatus
    } = productRequest;

    await this.ordersHeader.validateOrdersHeader({
      requestDetails,
      requesterUserDetails,
      vendorDetails
    });

    await this.ordersInfoBox.validateOrdersInfoBox({
      orderStatus,
      rfqDetails,
      workspaceDetails,
      organizationLocation,
      rfqId
    });

    await this.termsAndConditionsSidebar.selectTermsAndConditions({
      orderDetails
    });

    await this.ordersProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      organizationDetails,
      productsDetails
    });

    await this.ordersPriceSummary.validateSummary({
      productsDetails,
      organizationDetails,
      requestDetails,
      rfqDetails
    });

    const orderUrl = await this.getOrderUrl();

    productRequest.setOrderUrl(orderUrl);

    await this.ordersSubmitFooter.submit();

    const orderId = await this.orderSuccess.submit();

    productRequest.setOrderId(orderId);
    productRequest.updateOrderStatus(OrderStatus.PENDING_WITH_VENDOR);

    await this.validateOrderStatus({ productRequest });
  }

  async submitOrderWithBudget({
    productRequest,
    approveOrder,
    approverUserDetails
  }) {
    const {
      requestDetails,
      rfqDetails,
      workspaceDetails,
      rfqId,
      vendorDetails,
      orderDetails,
      requesterUserDetails,
      organizationDetails,
      organizationLocation,
      budgetDetails,
      productsDetails,
      orderStatus
    } = productRequest;

    await this.ordersHeader.validateOrdersHeader({
      requestDetails,
      requesterUserDetails,
      vendorDetails
    });

    await this.ordersInfoBox.validateOrdersInfoBox({
      orderStatus,
      rfqDetails,
      workspaceDetails,
      organizationLocation,
      rfqId
    });

    await this.termsAndConditionsSidebar.selectTermsAndConditions({
      orderDetails
    });

    await this.ordersProductAndServiceTable.validateProductAndServiceTable({
      requestDetails,
      rfqDetails,
      organizationDetails,
      productsDetails
    });

    await this.ordersExpenseAccount.selectExpenseAccounts({
      productsDetails,
      budgetDetails,
      organizationDetails
    });

    await this.ordersPriceSummary.validateSummary({
      productsDetails,
      organizationDetails,
      requestDetails,
      rfqDetails
    });

    await this.ordersExpenseAccount.validate({
      productsDetails,
      budgetDetails,
      organizationDetails
    });

    const orderUrl = await this.getOrderUrl();

    productRequest.setOrderUrl(orderUrl);

    await this.ordersSubmitFooter.submit();

    const orderId = await this.orderSuccess.submit();

    productRequest.setOrderId(orderId);

    if (approveOrder) {
      productRequest.updateOrderStatus(OrderStatus.APPROVAL_PENDING);

      await this.validateOrderStatus({ productRequest });

      await this.orderApproval.approveOrder({
        orderId,
        orderDetails,
        approverUserDetails
      });

      await this.orderSuccess.submit();
    }

    productRequest.updateOrderStatus(OrderStatus.PENDING_WITH_VENDOR);

    await this.validateOrderStatus({ productRequest });

    const newBudgetDetails = await this.ordersExpenseAccount.calculateNewBudgetDetails(
      {
        productsDetails,
        budgetDetails,
        requestDetails,
        rfqDetails
      }
    );

    productRequest.updateBudget(newBudgetDetails);

    await this.ordersExpenseAccount.validate({
      productsDetails,
      budgetDetails: newBudgetDetails,
      organizationDetails
    });
  }

  async submitOrder({ productRequest, approveOrder, approverUserDetails }) {
    const { budgetDetails } = productRequest;

    if (budgetDetails) {
      await this.submitOrderWithBudget({
        productRequest,
        approveOrder,
        approverUserDetails
      });
    } else {
      await this.submitOrderWithoutBudget({ productRequest });
    }
  }
}
