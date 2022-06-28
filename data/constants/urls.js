import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const dockerArgs = process.env;
const env = args.env || dockerArgs.ENVIRONMENT;
export const email = args.email || dockerArgs.EMAIL;
export const environment =
	env === 'dev' || env === 'demo' || env === 'app' || env === 'gaiat-test' || env === 'stc-test' || env === 'stc-test-local' ? env : 'test';
export const existingOrg = args.existingOrg;
export const newOrg = args.newOrg;
export const customTest = args.customTest;
const language = 'en';
const buyerApp =
	env === 'test' ||
	env === 'dev' ||
	env === 'demo' ||
	env === 'app' ||
	env === 'gaiat-test' ||
	env === 'stc-test' ||
	env === 'stc-test-local' ||
	env === undefined
		? `https://${environment}.penny.co`
		: `https://pr-${env}-buyer-mirymcghlq-ew.a.run.app`;
const apiUrl =
	env === 'test' ||
	env === 'dev' ||
	env === 'demo' ||
	env === 'app' ||
	env === 'gaiat-test' ||
	env === 'stc-test' ||
	env === 'stc-test-local' ||
	env === undefined
		? `https://api-${environment}.penny.co`
		: `https://pr-${env}-api-mirymcghlq-ew.a.run.app`;
const adminUrl =
	env === 'app'
		? 'https://admin.penny.co/login'
		: env === 'gaiat-test'
		? 'https://admin-gaiat-test-mirymcghlq-ew.a.run.app/login'
		: env === 'stc-test' || env === 'stc-test-local'
		? `${buyerApp}/${language}/login`
		: `https://admin-${environment}.penny.co/login`;

export const urls = {
	admin: adminUrl,
	buyer: buyerApp,
	api: apiUrl,
	buyerLogin: `${buyerApp}/${language}/login`,
	actionboard: `${buyerApp}/${language}/actionboard`,
	requests: `${buyerApp}/${language}/requests`,
	orders: `${buyerApp}/${language}/orders/orders`,
	rfq: `${buyerApp}/${language}/rfqs/request/%s/detail`,
	rfqs: `${buyerApp}/${language}/rfqs/requests`,
	grns: `${buyerApp}/${language}/grns`,
	bills: `${buyerApp}/${language}/bills`,
	payments: `${buyerApp}/${language}/payments`,
	productAndCatalogues: `${buyerApp}/${language}/catalogs-admin`,
	workspace: `${buyerApp}/${language}/workspaces`,
	settings: `${buyerApp}/${language}/settings`,
	invoices: `${buyerApp}/${language}/invoice-vendor`,
	receivedPayment: `${buyerApp}/${language}/payment-vendor`,
	budgets: `${buyerApp}/${language}/budgets/detail`,
	vendors: `${buyerApp}/${language}/vendors`,
	clients: `${buyerApp}/${language}/clients`,
	markups: `${buyerApp}/${language}/markups`,
	userProfile: `${buyerApp}/${language}/user-profile`,
	mailBox: 'https://www.mailinator.com/v4/public/inboxes.jsp?to=%s',
};
