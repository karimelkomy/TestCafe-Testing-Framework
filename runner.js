(async () => {
	const createTestCafe = require('testcafe');
	const testcafe = await createTestCafe();
	const { exec } = require('child_process');
	const args = require('minimist')(process.argv.slice(2));
	const scenario = args.s;
	const existingOrg = args.existingOrg;
	const newOrg = args.newOrg;
	const customTest = args.customTest;
	const reportArg = args.slack ? ['spec', 'slack-custom', 'allure-expanded'] : ['spec', 'allure-expanded'];
	let runner;

	try {
		const enterpriseRunner = testcafe
			.createRunner()
			.src(`automated-test/tests/saas/enterprise-organization/*.js`)
			.browsers('chrome')
			.reporter(reportArg)
			.screenshots({
				path: 'automated-test/screenshots',
				takeOnFails: true,
				fullPage: true,
				pathPattern: 'Enterprise/${DATE}_${TIME}/${TEST_INDEX}/${QUARANTINE_ATTEMPT}.png',
			})
			.video('automated-test/videos', {
				singleFile: false,
				failedOnly: false,
				pathPattern: 'Enterprise/${DATE}_${TIME}/${TEST}/${FILE_INDEX}.mp4',
			});

		const resellerRunner = testcafe
			.createRunner()
			.src(`automated-test/tests/saas/reseller-organization/*.js`)
			.browsers('chrome')
			.reporter(reportArg)
			.screenshots({
				path: 'automated-test/screenshots',
				takeOnFails: true,
				fullPage: true,
				pathPattern: 'Reseller/${DATE}_${TIME}/${TEST_INDEX}/${QUARANTINE_ATTEMPT}.png',
			})
			.video('automated-test/videos', {
				singleFile: false,
				failedOnly: false,
				pathPattern: 'Reseller/${DATE}_${TIME}/${TEST}/${FILE_INDEX}.mp4',
			});

		const gaiatRunner = testcafe
			.createRunner()
			.src(`automated-test/tests/saas/gaiat-organization/*.js`)
			.browsers('chrome')
			.reporter(reportArg)
			.screenshots({
				path: 'automated-test/screenshots',
				takeOnFails: true,
				fullPage: true,
				pathPattern: 'Gaiat/${DATE}_${TIME}/${TEST_INDEX}/${QUARANTINE_ATTEMPT}.png',
			})
			.video('automated-test/videos', {
				singleFile: false,
				failedOnly: false,
				pathPattern: 'Gaiat/${DATE}_${TIME}/${TEST}/${FILE_INDEX}.mp4',
			});

		const stcRunner = testcafe
			.createRunner()
			.src(`automated-test/tests/saas/stc-organization/*.js`)
			.browsers('chrome')
			.reporter(reportArg)
			.screenshots({
				path: 'automated-test/screenshots',
				takeOnFails: true,
				fullPage: true,
				pathPattern: 'Stc/${DATE}_${TIME}/${TEST_INDEX}/${QUARANTINE_ATTEMPT}.png',
			})
			.video('automated-test/videos', {
				singleFile: false,
				failedOnly: false,
				pathPattern: 'Stc/${DATE}_${TIME}/${TEST}/${FILE_INDEX}.mp4',
			});

		const marketplaceRunner = testcafe
			.createRunner()
			.src(`automated-test/tests/marketplace/buyer-organization/*.js`)
			.browsers('chrome')
			.reporter(reportArg)
			.screenshots({
				path: 'automated-test/screenshots',
				takeOnFails: true,
				fullPage: true,
				pathPattern: 'Marketplace/${DATE}_${TIME}/${TEST_INDEX}/${QUARANTINE_ATTEMPT}.png',
			})
			.video('automated-test/videos', {
				singleFile: false,
				failedOnly: false,
				pathPattern: 'Marketplace/${DATE}_${TIME}/${TEST}/${FILE_INDEX}.mp4',
			});

		if (scenario === 'enterprise') {
			runner = enterpriseRunner;
		} else if (scenario === 'gaiat') {
			runner = gaiatRunner;
		} else if (scenario === 'reseller') {
			runner = resellerRunner;
		} else if (scenario === 'stc') {
			runner = stcRunner;
		} else if (scenario == 'marketplace') {
			runner = marketplaceRunner;
		}

		runner.filter(async (testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
			if (existingOrg) {
				return fixtureMeta.existingOrg === true;
			} else if (newOrg) {
				return fixtureMeta.newOrg === true;
			} else if (customTest) {
				return testMeta.customTest === customTest;
			} else {
				return true;
			}
		});

		await runner.run({ skipJsErrors: true, skipUncaughtErrors: true, disableMultipleWindows: true });

		// await Promise.all(runners.map((runner) => runner.run({ skipJsErrors: true, skipUncaughtErrors: true, disableMultipleWindows: true })));

		await exec(
			'allure generate automated-test/allure/allure-results --clean -o automated-test/allure/allure-report && allure open automated-test/allure/allure-report'
		);
	} catch (err) {
		console.log('Error:', err);
	} finally {
		await testcafe.close();
	}
})();
