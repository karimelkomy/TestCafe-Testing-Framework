import { generateRandomEmail, generateRandomAlphabetic } from '../../../utilities/helpers';
import Chance from 'chance';
import {
	pendingOffersWorkspaceAdminRoleDetails,
	workspacesSuperAdminRoleDetails,
	eSourceWorkspaceAdminRoleDetails,
	ordersWorkspaceAdminRoleDetails,
	grnWorkspaceAdminRoleDetails,
	billsWorkspaceAdminRoleDetails,
	paymentsWorkspaceAdminRoleDetails,
	vendorsAdminRoleDetails,
	catalogsAdminRoleDetails,
} from './stcRolesDetails';

const chance = new Chance();

export const SuperAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: 'super-admin',
	};
};

export const BasicUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.basic`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
	};
};

export const WorkspaceSuperAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.workspace`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: workspacesSuperAdminRoleDetails.rolesName,
	};
};

export const VendorsAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.vendors`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: vendorsAdminRoleDetails.rolesName,
	};
};

export const CatalogsAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.catalogs`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: catalogsAdminRoleDetails.rolesName,
	};
};

export const ESourceWorkspaceAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.esource`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: eSourceWorkspaceAdminRoleDetails.rolesName,
	};
};

export const PendingOfferWorkspaceAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.esource`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: pendingOffersWorkspaceAdminRoleDetails.rolesName,
	};
};

export const OrdersWorkspaceAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.orders`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: ordersWorkspaceAdminRoleDetails.rolesName,
	};
};

export const GrnWorkspaceAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.grn`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: grnWorkspaceAdminRoleDetails.rolesName,
	};
};

export const BillsWorkspaceAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.bills`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: billsWorkspaceAdminRoleDetails.rolesName,
	};
};

export const PaymentsWorkspaceAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.payment`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		rolesName: paymentsWorkspaceAdminRoleDetails.rolesName,
	};
};

export const AutomationUserDetails = () => {
	return {
		firstName: 'Automation',
	};
};
