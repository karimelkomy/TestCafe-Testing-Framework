import minimist from 'minimist';

const language = 'en';
//const marketplace = 'https://marketplace-test.penny.co';
const args = minimist(process.argv.slice(2));
const dockerArgs = process.env;
const env = args.env || dockerArgs.ENVIRONMENT;
export const email = args.email || dockerArgs.EMAIL;
export const environment = env === 'dev' || env === 'souq' || env === 'demo' ? env : 'marketplace-test';
export const customTest = args.customTest;

const buyerApp =
	env === 'marketplace-test' || env === 'dev' || env === 'souq' || env === undefined
		? `https://${environment}.penny.co`
		: `https://${env}-mirymcghlq-ew.a.run.app/en/`;
const supplierApp =
	env === 'test' || env === 'dev' || env === 'demo' || env === undefined
		? `https://supplier-${environment}.penny.co`
		: `https://supplier-${environment}.penny.co`;

const marketplaceUrls = {
	buyerUrl: buyerApp,
	supplierUrl: supplierApp,
	homepage: `${buyerApp}/${language}/`,
	userProfile: `${buyerApp}/${language}/my-profile`,
	rfqs: `${buyerApp}/${language}/rfqs/drafts`,
	orders: `${buyerApp}/${language}/orders/drafts`,
	billsAndPayments: `${buyerApp}/${language}/orders/bills-payments?page=1&items=10`,
	grns: `${buyerApp}/${language}/orders/delivery-received?page=1&items=10`,
	locations: `${buyerApp}/${language}/workspaces/default-locations`,
	suppliers: `${buyerApp}/${language}/suppliers`,
	supplierStore: `${buyerApp}/${language}/store/%s`,
	mailBox: 'https://www.mailinator.com/v4/public/inboxes.jsp?to=%s',
};

export default marketplaceUrls;
