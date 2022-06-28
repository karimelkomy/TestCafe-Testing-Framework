import Chance from 'chance';

const chance = new Chance();

const catalogueDetails = {
	catalogueName: chance.sentence({ words: 2 }),
	description: chance.sentence({ words: 5 }),
};

export default catalogueDetails;
