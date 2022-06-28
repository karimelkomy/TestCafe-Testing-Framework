import { generateRandomAlphabetic } from '../../../utilities/helpers';

const orderDetails = {
	termsAndConditions: {
		name: 'Sample Terms',
		description: 'Purchase Order Terms and Conditions',
	},
	orderApprovalRemark: generateRandomAlphabetic(),
};

export default orderDetails;
