import { t, ClientFunction, Selector } from "testcafe";
import { waits } from "../.testcaferc";
import { RequestLogger } from "testcafe";

export const getCurrentUrl = ClientFunction(() => window.location.href);

export const refreshPage = async () =>
  await t.eval(() => location.reload(true));

export const selectorXP = Selector(xpath => {
  // eslint-disable-next-line no-undef
  const iterator = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null
  );
  const items = [];

  let item = iterator.iterateNext();

  while (item) {
    items.push(item);
    item = iterator.iterateNext();
  }

  return items;
});

export const checkElementVisibility = async elementXP => {
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

export const validateElementVisibility = async elementXP => {
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
      (await ClientFunction(() => document.readyState)()) === "complete" &&
      !logger.requests.find(r => !r.response || !r.response.statusCode)
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

export const waitElementVisibility = async elementXP => {
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

export const navigateTo = async url => {
  await t.navigateTo(url);
  await waitForUrlChanged(url);
};

export const waitForUrlChanged = async desiredUrl => {
  const { maxAttempts, timeout } = waits.url;
  let currentUrl;

  for (let i = 0; i < maxAttempts; i += 1) {
    currentUrl = await getCurrentUrl();

    if (currentUrl === desiredUrl) {
      return true;
    }

    await t.wait(timeout);
  }

  throw new Error(
    `waitForUrlChanged failed - Current URL: ${currentUrl} - Desired URL: ${desiredUrl} `
  );
};
