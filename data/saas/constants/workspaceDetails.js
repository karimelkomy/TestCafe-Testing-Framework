import { selectRandomDataFromArray, generateRandomNumber } from '../../../utilities/helpers';
import countriesArray from './countries';
import Chance from 'chance';

const locationTypeList = ['OFFICE', 'WAREHOUSE', 'OTHER'];

export const WorkspaceDetails = () => {
	const chance = new Chance();
	const countryItem = selectRandomDataFromArray(countriesArray);

	return {
		details: {
			name: countryItem.country,
		},
		location: {
			type: selectRandomDataFromArray(locationTypeList),
			name: chance.city(),
			country: countryItem.country,
			state: chance.state({ full: true }),
			city: chance.city(),
			street: chance.street(),
			postalCode: `${generateRandomNumber(10000, 90000)}`,
			googleMapsLink: 'https://goo.gl/maps/GTJc4opoNKF8CWWZ7',
		},
	};
};

export const ApprovalWorkspaceDetails = () => {
	const chance = new Chance();
	const countryItem = selectRandomDataFromArray(countriesArray);

	return {
		details: {
			name: countryItem.country,
		},
		location: {
			type: selectRandomDataFromArray(locationTypeList),
			name: chance.city(),
			country: countryItem.country,
			state: chance.state({ full: true }),
			city: chance.city(),
			street: chance.street(),
			postalCode: `${generateRandomNumber(10000, 90000)}`,
			googleMapsLink: 'https://goo.gl/maps/GTJc4opoNKF8CWWZ7',
		},
	};
};

export const DefaultWorkspaceDetails = (organizationDetails) => {
	return {
		details: {
			name: organizationDetails.orgName,
		},
		location: {
			type: 'OFFICE',
			name: organizationDetails.city,
			country: organizationDetails.country,
			state: organizationDetails.state,
			city: organizationDetails.city,
			street: organizationDetails.street,
			postalCode: organizationDetails.postalCode,
			googleMapsLink: organizationDetails.googleMapsLink,
		},
	};
};

export const ClientWorkspaceDetails = (clientDetails) => ({
	details: {
		name: clientDetails.clientName,
	},
	location: {
		type: 'OFFICE',
		name: clientDetails.city,
		country: clientDetails.country,
		state: clientDetails.state,
		city: clientDetails.city,
		street: clientDetails.street,
		postalCode: clientDetails.postalCode,
		googleMapsLink: clientDetails.googleMapsLink,
	},
});
