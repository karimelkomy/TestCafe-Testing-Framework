import { environment } from '../../saas/constants/urls';

const language = 'en';
const supplier =
	environment === 'stc-test' || environment === 'stc-test-local' ? `https://${environment}.penny.co` : 'https://supplier-test.penny.co';

const supplierUrls = {
	supplierLogin: `${supplier}/${language}/login`,
};

export default supplierUrls;
