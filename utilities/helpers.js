import { t, ClientFunction, Selector } from 'testcafe';
import { sprintf } from 'sprintf-js';
import { waits } from '../.testcaferc';
import GenericElement from '../components/shared/core/GenericElement';
import { RequestLogger } from 'testcafe';
import OrgCustomer from '../data/saas/constants/orgCustomer';
import OrgTier from '../data/saas/constants/orgTier';

export const getCurrentUrl = ClientFunction(() => window.location.href);

export const scrollBy = ClientFunction((x, y) => document.body.scrollBy(x, y));

export const selectorXP = Selector((xpath) => {
	// eslint-disable-next-line no-undef
	const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	const items = [];

	let item = iterator.iterateNext();

	while (item) {
		items.push(item);
		item = iterator.iterateNext();
	}

	return items;
});

export const checkElementVisibility = async (elementXP) => {
	const element = selectorXP(elementXP);
	const { maxAttempts, timeout } = waits.showing;

	for (let i = 0; i < maxAttempts; i += 1) {
		if (await element.exists) {
			if (await element.visible) {
				return true;
			}
		}
		await t.wait(timeout);
	}

	return false;
};

export const validateElementVisibility = async (elementXP) => {
	const element = selectorXP(elementXP);
	const elementsCount = await element.count;
	const { maxAttempts, timeout } = waits.load;
	const logger = RequestLogger(/api/);

	if (elementsCount > 1) {
		throw new Error(`
		validateElementVisibility failed - "${elementXP}" element exists ${elementsCount} times.
		Current URL: ${await getCurrentUrl()}
	`);
	}

	for (let i = 0; i < maxAttempts; i += 1) {
		await t.addRequestHooks(logger);

		if (
			(await ClientFunction(() => document.readyState)()) === 'complete' &&
			!logger.requests.find((r) => !r.response || !r.response.statusCode)
		) {
			if (await element.exists) {
				if (await element.visible) {
					return true;
				}
			}
		}

		await t.wait(timeout);
	}

	throw new Error(`
		validateElementVisibility failed - "${elementXP}" element is not visible.
		Current URL: ${await getCurrentUrl()}
	`);
};

export const waitElementVisibility = async (elementXP) => {
	const element = selectorXP(elementXP);
	const { maxAttempts, timeout } = waits.load;

	for (let i = 0; i < maxAttempts; i += 1) {
		if (await element.exists) {
			if (await element.visible) {
				return true;
			}
		}

		await refreshPage();
		await t.wait(timeout);
	}

	throw new Error(`
		waitElementVisibility failed - "${elementXP}" element is not visible.
		Current URL: ${await getCurrentUrl()}
	`);
};

export const waitForUrlChanged = async (desiredUrl) => {
	const { maxAttempts, timeout } = waits.url;
	let currentUrl;

	for (let i = 0; i < maxAttempts; i += 1) {
		currentUrl = await getCurrentUrl();

		if (currentUrl === desiredUrl) {
			return true;
		}

		await t.wait(timeout);
	}

	throw new Error(`waitForUrlChanged failed - Current URL: ${currentUrl} - Desired URL: ${desiredUrl}`);
};

export const waitForUrlContains = async (desiredUrl) => {
	const { maxAttempts, timeout } = waits.url;
	let currentUrl;

	for (let i = 0; i < maxAttempts; i += 1) {
		currentUrl = await getCurrentUrl();

		if (currentUrl.includes(desiredUrl)) {
			return true;
		}

		await t.wait(timeout);
	}

	throw new Error(`waitForUrlContains failed - Current URL: ${currentUrl} to contain Desired URL: ${desiredUrl}`);
};

export const navigateTo = async (url) => {
	await t.navigateTo(url);
	await waitForUrlChanged(url);
};

export const openNewWindow = async (url) => {
	await t.openWindow(url);
	await t.maximizeWindow();
};

export const getCurrentWindow = async () => await t.getCurrentWindow();

export const switchToWindow = async (window) => await t.switchToWindow(window);

export const switchToMainWindow = async () => await t.switchToMainWindow();

export const getNumberFromText = async (text) => await text.match(/\d+/)[0];

export const getAlphabeticFromText = (text) => text.replace(/[0-9]/g, '');

export const getTaxValue = (price, tax, taxType) => {
	if (taxType === '%') {
		return price * (tax / 100);
	}

	return tax;
};

export const refreshPage = async () => await t.eval(() => location.reload(true));

export const generateDateRandomNumber = () => new Date().valueOf();

export const generateRandomNumber = (min, max) => Math.floor(Math.random() * max + min);

export const generateRandomDecimalNumber = (min, max) => generateRandomNumber(min, max) / 100;

export const generateRandomAlphabetic = () => getAlphabeticFromText(Math.random().toString(36).substr(2, 10));

export const generateRandomEmail = (prefix = generateRandomAlphabetic()) =>
	`at.${prefix}.${generateRandomNumber(11111111111111, 99999999999999)}@mailinator.com`;

export const generateRandomAddress = () => `${generateRandomNumber(1, 9999)} ${generateRandomAlphabetic()}`;

export const generateRandomData = () => `${generateRandomAlphabetic()} ${generateRandomNumber(1, 9999) + generateDateRandomNumber()}`;

export const selectRandomDataFromArray = (array) => array[Math.floor(Math.random() * array.length)];

export const capitalizeFirstLetter = (inputString) => inputString.replace(/^./, inputString[0].toUpperCase());

export const removeCommaSeperatorFromNumber = (num) => num.replace(/[^0-9.-]+/g, ''); // Remove comma, extra space and currency

export const addCommaSeperatorForNumber = (num) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add comma seperator for decimal

export const addCommaSeperatorForInteger = (num) =>
	formatingDecimalNumber(num, 0, 0)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add comma seperator for integer

export const removeString = (string1, string2) => string1.replace(string2, '');

export const removeSpace = (string) => string.replace(/ /g, '');

export const removeZeroFromEnd = (stringNum) =>
	addCommaSeperatorForNumber(parseFloat(removeCommaSeperatorFromNumber(stringNum)).toString());

export const removeStringStartingFromChar = (str, char) => {
	const index = str.indexOf(char);

	if (index > 0) {
		return str.substring(0, index);
	}

	return str;
};

export const formatingDecimalNumber = (num, min, max) => {
	return parseFloat(num).toFixed(min).toLocaleString('en', {
		useGrouping: false,
		minimumFractionDigits: min,
		maximumFractionDigits: max,
	});
};

export const formatedNumber = (num, fraction) => {
	let frac;

	if (fraction !== undefined) {
		frac = fraction;
	} else if (num === 0) {
		frac = 1;
	} else {
		frac = 2;
	}

	return addCommaSeperatorForNumber(parseFloat(num).toFixed(frac));
};

export const formatedNumberWithoutComma = (num, fraction) => {
	let frac;

	if (fraction !== undefined) {
		frac = fraction;
	} else if (num === 0) {
		frac = 1;
	} else {
		frac = 2;
	}

	return parseFloat(num).toFixed(frac);
};

export const selectDate = async (day, month, year) => {
	const element = new GenericElement();
	const monthDropdown = '//div[contains(@class, "p-datepicker-title")]/select[contains(@class, "p-datepicker-month")]';
	const monthDropdownItem =
		'//div[contains(@class, "p-datepicker-title")]/select[contains(@class, "p-datepicker-month")]/option[@value="%s"]';
	const yearDropdown = '//div[contains(@class, "p-datepicker-title")]/select[contains(@class, "p-datepicker-year")]';
	const yearDropdownItem =
		'//div[contains(@class, "p-datepicker-title")]/select[contains(@class, "p-datepicker-year")]/option[@value="%s"]';
	const dayIcon = '//div[contains(@class, "p-datepicker-calendar-container")]//td[.= "%s"][./span[not(contains(@class, "p-disabled"))]]';

	await element.click(monthDropdown);
	await element.selectOption(sprintf(monthDropdownItem, (month - 1).toString()));
	await element.click(yearDropdown);
	await element.selectOption(sprintf(yearDropdownItem, year.toString()));
	await element.click(sprintf(dayIcon, day.toString()));
};

export const getTodayDate = async () => {
	const dateObj = new Date();

	return {
		day: dateObj.getDate(),
		month: dateObj.getMonth() + 1,
		year: dateObj.getFullYear(),
	};
};

export const getTomorrowDate = async () => {
	const todayObj = new Date();
	const tomorrowObj = new Date(todayObj);

	tomorrowObj.setDate(tomorrowObj.getDate() + 1);

	return {
		tomorrowDay: tomorrowObj.getDate(),
		tomorrowMonth: tomorrowObj.getMonth() + 1,
		tomorrowYear: tomorrowObj.getFullYear(),
	};
};

export const getNextYearDate = async () => {
	const todayObj = new Date();
	const nextYearObj = new Date(todayObj);

	return {
		nextDay: nextYearObj.getDate(),
		nextMonth: nextYearObj.getMonth() + 1,
		nextYear: nextYearObj.getFullYear() + 1,
	};
};

export const removeItemFromArray = (array, item) => {
	const index = array.indexOf(item);

	if (index > -1) {
		array.splice(index, 1);
	}

	return array;
};

export const isStc = (organizationDetails) => {
	const { orgCustomer } = organizationDetails;

	return orgCustomer === OrgCustomer.STC;
};

export const isGaiat = (organizationDetails) => {
	const { orgCustomer } = organizationDetails;

	return orgCustomer === OrgCustomer.Gaiat;
};

export const isEnterprise = (organizationDetails) => {
	const { orgTier } = organizationDetails;

	return orgTier === OrgTier.Enterprise;
};
