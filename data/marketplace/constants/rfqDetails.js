import Chance from 'chance';
import { generateRandomAlphabetic } from '../../../utilities/helpers';

const chance = new Chance();

export const rfqDetails = {
	requestTitle: chance.sentence({ words: 2 }),
	qty: 31,
	ETA: 7,
	ETAUnit: 'days',
	remark: generateRandomAlphabetic(),
};
