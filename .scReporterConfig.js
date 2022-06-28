const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const dockerArgs = process.env;
const env = args.env || dockerArgs.ENVIRONMENT;
const cloudBranch = dockerArgs.BRANCH_NAME;
const buildId = dockerArgs.BUILD_ID;
const environment = env || 'test';
const branchName = require('current-git-branch');

module.exports = {
	reporterMethods: {
		reportTaskStart: function (startTime, userAgents, testCount) {
			this.startTime = startTime;
			this.testCount = testCount;
			this.userAgents = userAgents;
			this.testNameStatus = '';
			this.currentFixtureName = '';
		},
		reportFixtureStart: function (name, path, meta) {
			this.currentFixtureName = name;
			this.currentFixtureMeta = meta;
		},
		reportTestDone: function (name, testRunInfo, meta) {
			const testSkipped = testRunInfo.skipped;
			const hasErr = !!testRunInfo.errs.length;
			const icon = hasErr ? `:x:` : testSkipped ? `:grey_exclamation:` : `:white_check_mark:`;
			const result = hasErr ? `Failed` : testSkipped ? `Skipped` : `Passed`;

			if (this.testNameStatus.includes(this.currentFixtureName)) {
				this.testNameStatus += `\n${icon} ${name} - *${result}*`;
			} else {
				this.testNameStatus += `\n*${this.currentFixtureName}*\n${icon} ${name} - *${result}*`;
			}
		},
		reportTaskDone: function (endTime, passed, warnings, result) {
			const duration = Math.round((endTime - this.startTime) / 1000 / 60);
			let passFailMessage;
			let url = buildId ? `\n:link: Build URL: https://console.cloud.google.com/cloud-build/builds/${buildId}\n` : '\n';

			if (result.failedCount) {
				passFailMessage = `:x: ${result.failedCount}/${this.testCount} *Failed*`;
			} else {
				passFailMessage = `:white_check_mark: ${result.passedCount}/${this.testCount} *Passed*`;
			}

			if (result.skippedCount) {
				passFailMessage += `, :grey_exclamation: ${result.skippedCount} *Skipped*`;
			}

			return [
				{
					action: 'SEND',
					message: `:rocket: Started TestCafe: ${this.startTime}\n:computer: Ran ${this.testCount} tests in: ${
						this.userAgents
					}\n:checkered_flag: Testing finished at ${endTime}\n:pushpin: Environment: ${environment}\n:zap: Branch: ${
						branchName() || cloudBranch
					}${url}\n${this.testNameStatus}\n\n:stopwatch: Duration: ${duration}mins\n${passFailMessage}`,
				},
			];
		},
	},
};
