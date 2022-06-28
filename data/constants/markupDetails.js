import { generateRandomNumber } from '../../../utilities/helpers';
import catalogueDetails from './catalogueDetails';
import { OrganizationDetails } from './organizationDetails';
import OrgTier from './orgTier';
import OrgCustomer from './orgCustomer';

const organizationDetails = OrganizationDetails(OrgTier.Reseller, OrgCustomer.Gaiat);
const { currencyCode } = organizationDetails;

export const markupDetails = {
	markupName: `Markup ${generateRandomNumber(1, 9999)}`,
	markupValue: generateRandomNumber(200, 300),
	markupValueCurrency: currencyCode,
	markupValueType: 'absolute',
	markupValueTypeAlt: 'Fixed',
	catalog: catalogueDetails.catalogueName,
	paidBy: 'Buyer',
};

export const revisedMarkupDetails = {
	markupName: `Markup ${generateRandomNumber(1, 9999)}`,
	markupValue: generateRandomNumber(1, 100),
	markupValueCurrency: currencyCode,
	markupValueType: 'absolute',
	markupValueTypeAlt: 'Fixed',
	catalog: catalogueDetails.catalogueName,
	paidBy: 'Buyer',
	type: 'revised',
};
