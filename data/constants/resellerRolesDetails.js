export const workspacesSuperAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Workspaces', privilegeName: 'Workspaces super admin' }],
	rolesName: ['Workspace Manager'],
	roleDescription: 'Create workspace',
};

export const vendorsAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Vendors', privilegeName: 'Vendors admin' },
		{ privilegeTitle: 'Rfqs', privilegeName: 'Rfq workspace admin' },
	],
	rolesName: ['Vendors Manager'],
	roleDescription: 'Create vendors',
};

export const catalogsAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Catalogs', privilegeName: 'Catalogs Admin' },
		{ privilegeTitle: 'Catalogs', privilegeName: 'Products admin' },
	],
	rolesName: ['Catalogs Manager'],
	roleDescription: 'Create catalogs and products',
};

export const eSourceWorkspaceAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Rfqs', privilegeName: 'Rfq workspace admin' }],
	rolesName: ['E-Source Manager'],
	roleDescription: 'Create/Read RFQs in assigned workspace',
};

export const pendingOffersWorkspaceAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Pending Offers', privilegeName: 'Pending Offers workspace admin' }],
	rolesName: ['Pending Offers Manager'],
	roleDescription: 'Create/Read RFQs in assigned workspace',
};

export const ordersWorkspaceAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Orders', privilegeName: 'Orders workspace admin' }],
	rolesName: ['Order Manager'],
	roleDescription: 'Create/Read orders in assigned workspace',
};

export const grnWorkspaceAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Grns', privilegeName: 'Grn workspace admin' }],
	rolesName: ['GRN Manager'],
	roleDescription: 'Create GRNs and read orders in assigned workspace',
};

export const billsWorkspaceAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Bills', privilegeName: 'Bills workspace admin' }],
	rolesName: ['Bills Manager'],
	roleDescription: 'Create bills and read GRNs in assigned workspace',
};

export const paymentsWorkspaceAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Payments', privilegeName: 'Payments workspace admin' }],
	rolesName: ['Payments Manager'],
	roleDescription: 'Create payments and read bills in assigned workspace',
};
