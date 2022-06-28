import { generateRandomNumber, generateRandomEmail } from '../../../utilities/helpers';
import Chance from 'chance';
import { OrganizationDetails } from './organizationDetails';
import {
	BasicUserDetails,
	OrdersWorkspaceAdminUserDetails,
	GrnWorkspaceAdminUserDetails,
	BillsWorkspaceAdminUserDetails,
	PaymentsWorkspaceAdminUserDetails,
	PendingOfferWorkspaceAdminUserDetails,
} from './stcUserDetails';
import approvalWorkflow from './approvalWorkflow';
import OrgTier from './orgTier';
import OrgCustomer from './orgCustomer';

const chance = new Chance();
const organizationDetails = OrganizationDetails(OrgTier.Reseller, OrgCustomer.STC);
const { googleMapsLink, country, currency, currencyCode } = organizationDetails;

export const ClientDetails = () => {
	const basicUserDetails = BasicUserDetails('client');
	const pendingOfferWorkspaceAdminUserDetails = PendingOfferWorkspaceAdminUserDetails('client');
	const ordersWorkspaceAdminUserDetails = OrdersWorkspaceAdminUserDetails('client');
	const grnWorkspaceAdminUserDetails = GrnWorkspaceAdminUserDetails('client');
	const billsWorkspaceAdminUserDetails = BillsWorkspaceAdminUserDetails('client');
	const paymentsWorkspaceAdminUserDetails = PaymentsWorkspaceAdminUserDetails('client');

	return {
		clientName: `Client ${generateRandomNumber(1000000, 9999999)}`,
		registrationNumber: generateRandomNumber(1000000000, 9000000000),
		taxCertificationNumber: `3${generateRandomNumber(1000000000000, 9000000000000)}3`,
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail('client')}`,
		phone: chance.phone({ formatted: false }),
		buildingNumber: generateRandomNumber(1000, 9000),
		additionalNumber: generateRandomNumber(1000, 9000),
		unitNumber: generateRandomNumber(1000, 9000),
		street: chance.street(),
		city: chance.city(),
		district: chance.word(),
		state: chance.state({ full: true }),
		postalCode: `${generateRandomNumber(10000, 90000)}`,
		googleMapsLink: googleMapsLink,
		country: country,
		currency: currency,
		currencyCode: currencyCode,
		adminUsersDetails: {
			clientBasicUserDetails: basicUserDetails,
			clientESourceWorkspaceAdminUserDetails: pendingOfferWorkspaceAdminUserDetails,
			clientOrdersWorkspaceAdminUserDetails: ordersWorkspaceAdminUserDetails,
			clientGrnWorkspaceAdminUserDetails: grnWorkspaceAdminUserDetails,
			clientBillsWorkspaceAdminUserDetails: billsWorkspaceAdminUserDetails,
			clientPaymentsWorkspaceAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		},
	};
};

export const ApprovalClientDetails = () => {
	const basicUserDetails = BasicUserDetails('client');
	const pendingOfferWorkspaceAdminUserDetails = PendingOfferWorkspaceAdminUserDetails('client');
	const ordersWorkspaceAdminUserDetails = OrdersWorkspaceAdminUserDetails('client');
	const grnWorkspaceAdminUserDetails = GrnWorkspaceAdminUserDetails('client');
	const billsWorkspaceAdminUserDetails = BillsWorkspaceAdminUserDetails('client');
	const paymentsWorkspaceAdminUserDetails = PaymentsWorkspaceAdminUserDetails('client');

	return {
		clientName: `Client ${generateRandomNumber(1000000, 9999999)}`,
		registrationNumber: generateRandomNumber(1000000000, 9000000000),
		taxCertificationNumber: `3${generateRandomNumber(1000000000000, 9000000000000)}3`,
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail('client')}`,
		phone: chance.phone({ formatted: false }),
		buildingNumber: generateRandomNumber(1000, 9000),
		additionalNumber: generateRandomNumber(1000, 9000),
		unitNumber: generateRandomNumber(1000, 9000),
		street: chance.street(),
		city: chance.city(),
		district: chance.word(),
		state: chance.state({ full: true }),
		postalCode: `${generateRandomNumber(10000, 90000)}`,
		googleMapsLink: googleMapsLink,
		country: country,
		currency: currency,
		currencyCode: currencyCode,
		adminUsersDetails: {
			clientBasicUserDetails: basicUserDetails,
			clientESourceWorkspaceAdminUserDetails: pendingOfferWorkspaceAdminUserDetails,
			clientOrdersWorkspaceAdminUserDetails: ordersWorkspaceAdminUserDetails,
			clientGrnWorkspaceAdminUserDetails: grnWorkspaceAdminUserDetails,
			clientBillsWorkspaceAdminUserDetails: billsWorkspaceAdminUserDetails,
			clientPaymentsWorkspaceAdminUserDetails: paymentsWorkspaceAdminUserDetails,
		},
		approvalWorkflowsDetails: [
			{ workflowModule: approvalWorkflow.REQUESTS_APPROVER, workflowUsers: [basicUserDetails] },
			{ workflowModule: approvalWorkflow.PENDING_OFFERS_AOORIVER, workflowUsers: [pendingOfferWorkspaceAdminUserDetails] },
			{ workflowModule: approvalWorkflow.ORDERS_APPROVER, workflowUsers: [ordersWorkspaceAdminUserDetails] },
			{ workflowModule: approvalWorkflow.BILLS_APPROVER, workflowUsers: [billsWorkspaceAdminUserDetails] },
		],
	};
};

export const RfqDetails = () => {
	return {
		shippingFee: generateRandomNumber(1001, 2000),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		paymentTerm: generateRandomNumber(101, 200),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(101, 200),
		ETAUnit: 'Days',
		pricePerUnit: generateRandomNumber(101, 200),
		tax: 15,
		taxType: '%',
		remark: generateRandomAlphabetic(),
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'RFQ',
	};
};
