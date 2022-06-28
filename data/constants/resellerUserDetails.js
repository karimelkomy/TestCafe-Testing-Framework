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
} from './resellerRolesDetails';

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
		defaultRoleName: 'Basic user',
	};
};

export const WorkspaceSuperAdminUserDetails = (orgType) => {
	return {
		firstName: chance.first(),
		lastName: chance.last(),
		email: `${generateRandomEmail(`${orgType}.workspace`)}`,
		phoneNumber: chance.phone({ formatted: false }),
		position: generateRandomAlphabetic(),
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
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
		defaultRoleName: 'Basic user',
		rolesName: paymentsWorkspaceAdminRoleDetails.rolesName,
	};
};

export const AutomationUserDetails = () => {
	return {
		firstName: 'Automation',
	};
};
