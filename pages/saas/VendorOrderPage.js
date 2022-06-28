import VendorAppAccess from '../../components/saas/vendor/VendorAppAccess';
import OrderInfoBox from '../../components/saas/vendor/order/OrderInfoBox';
import OrderSummary from '../../components/saas/vendor/order/OrderSummary';
import OrderTermsAndConditions from '../../components/saas/vendor/order/OrderTermsAndConditions';
import OrderProductAndServiceTable from '../../components/saas/vendor/order/OrderProductAndServiceTable';
import OrderSubmission from '../../components/saas/vendor/order/OrderSubmission';
import OrderDetailsBox from '../../components/saas/vendor/order/OrderDetailsBox';
import VendorOrderApi from '../../api/requests/VendorOrderApi';
import { email } from '../../data/saas/constants/urls';
import OrderStatus from '../../data/saas/constants/orderStatus';
import { isGaiat } from '../../utilities/helpers';

export default class VendorOrderPage {
	constructor() {
		this.vendorAppAccess = new VendorAppAccess();
		this.orderInfoBox = new OrderInfoBox();
		this.orderSummary = new OrderSummary();
		this.orderTermsAndConditions = new OrderTermsAndConditions();
		this.orderProductAndServiceTable = new OrderProductAndServiceTable();
		this.orderSubmission = new OrderSubmission();
		this.orderDetailsBox = new OrderDetailsBox();
	}

	async navigateToVendorOrderUrl({ orderUrl, identifier }) {
		const orderUuid = orderUrl.substring(orderUrl.indexOf(`${identifier}/`) + `${identifier}/`.length);

		const vendorOrderUrl = await VendorOrderApi.getVendorOrderUrl(orderUuid);

		await this.vendorAppAccess.navigateToVendorUrl({ vendorUrl: vendorOrderUrl });
	}

	async openOrder({ productRequest }) {
		const { orderId, orderUrl, vendorDetails, organizationDetails } = productRequest;

		if (email === 'true') {
			await this.vendorAppAccess.openOrder({ orderId, vendorDetails, text: 'Order' });
		} else if (isGaiat(organizationDetails)) {
			await this.navigateToVendorOrderUrl({ orderUrl, identifier: 'orders' });
		} else {
			await this.navigateToVendorOrderUrl({ orderUrl, identifier: 'order' });
		}
	}

	async acceptOrder({ productRequest }) {
		await this.openOrder({ productRequest });

		await this.orderDetailsBox.validate({ productRequest });

		await this.orderProductAndServiceTable.validateProductAndServiceTable({ productRequest });

		await this.orderInfoBox.validateInfoBox({ productRequest });

		await this.orderSummary.validateSummary({ productRequest });

		await this.orderTermsAndConditions.validateTermsAndConditions({ productRequest });

		await this.orderSubmission.accept();

		await this.orderDetailsBox.validate({ productRequest });

		await this.orderProductAndServiceTable.validateProductAndServiceTable({ productRequest });

		await this.orderInfoBox.validateInfoBox({ productRequest });

		await this.orderSummary.validateSummary({ productRequest });

		await this.orderTermsAndConditions.validateTermsAndConditions({ productRequest });

		productRequest.updateOrderStatus(OrderStatus.SUBMITTED);
	}
}
