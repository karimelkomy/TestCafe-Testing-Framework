export const budgetsAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Budgets ', privilegeName: 'Budgets admin' }],
	rolesName: ['Budgets Manager'],
	roleDescription: 'Create budgets',
};

export const workspacesSuperAdminRoleDetails = {
	privileges: [{ privilegeTitle: 'Workspaces', privilegeName: 'Workspaces super admin' }],
	rolesName: ['Workspace Manager', 'Budgets Manager'],
	roleDescription: 'Create workspace',
};

export const vendorsAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Vendors', privilegeName: 'Vendors admin' },
		{ privilegeTitle: 'Rfqs', privilegeName: 'Rfq workspace admin' },
	],
	rolesName: ['Vendors Manager', 'E-Source Manager', 'Budgets Manager'],
	roleDescription: 'Create vendors',
};

export const catalogsAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Catalogs', privilegeName: 'Catalogs Admin' },
		{ privilegeTitle: 'Catalogs', privilegeName: 'Products admin' },
	],
	rolesName: ['Catalogs Manager', 'Products Manager', 'Budgets Manager'],
	roleDescription: 'Create catalogs and products',
};

export const eSourceWorkspaceAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Rfqs', privilegeName: 'Rfq workspace admin' },
		{ privilegeTitle: 'Budgets', privilegeName: 'Budgets reader' },
	],
	rolesName: ['E-Source Manager', 'Budgets Manager'],
	roleDescription: 'Create/Read RFQs in assigned workspace',
};

export const ordersWorkspaceAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Orders', privilegeName: 'Orders workspace admin' },
		{ privilegeTitle: 'Budgets', privilegeName: 'Budgets reader' },
	],
	rolesName: ['Order Manager', 'Budgets Manager'],
	roleDescription: 'Create/Read orders in assigned workspace',
};

export const grnWorkspaceAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Grns', privilegeName: 'Grn workspace admin' },
		{ privilegeTitle: 'Budgets', privilegeName: 'Budgets reader' },
	],
	rolesName: ['GRN Manager', 'Budgets Manager'],
	roleDescription: 'Create GRNs and read orders in assigned workspace',
};

export const billsWorkspaceAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Bills', privilegeName: 'Bills workspace admin' },
		{ privilegeTitle: 'Budgets', privilegeName: 'Budgets reader' },
	],
	rolesName: ['Bills Manager', 'Budgets Manager'],
	roleDescription: 'Create bills and read GRNs in assigned workspace',
};

export const paymentsWorkspaceAdminRoleDetails = {
	privileges: [
		{ privilegeTitle: 'Payments', privilegeName: 'Payments workspace admin' },
		{ privilegeTitle: 'Budgets', privilegeName: 'Budgets reader' },
	],
	rolesName: ['Payments Manager', 'Budgets Manager'],
	roleDescription: 'Create payments and read bills in assigned workspace',
};
