import 'dotenv/config';

export const adminUserTest = {
	email: 'org-admin@penny.co',
	password: process.env.SAAS_TEST_PASSWORD,
};

export const adminUserDemo = {
	email: 'org-admin@penny.co',
	password: process.env.SAAS_DEMO_PASSWORD,
};

export const adminUserProd = {
	email: 'org-admin@penny.co',
	password: process.env.SAAS_PROD_PASSWORD,
};

export const adminUserStcTest = {
	email: 'stc-admin@mailinator.com',
	password: process.env.STC_TEST_PASSWORD,
};

export const defaultPassword = process.env.AT_PASSWORD;
