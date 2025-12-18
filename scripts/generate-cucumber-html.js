const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const reporter = require('cucumber-html-reporter');

const argv = require('minimist')(process.argv.slice(2));
const tags = argv.tags || argv.t || '';

const outDir = path.resolve(__dirname, '..', 'test-output', 'cucumber');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const jsonFile = path.join(outDir, `cucumber-${timestamp}.json`);
const latestJson = path.join(outDir, `cucumber-latest.json`);
const htmlFile = path.join(outDir, `cucumber-${timestamp}.html`);

// Run cucumber and write to a stable 'latest' JSON file so reporter always has a complete file to read
const cucumberCmd = `npx cucumber-js --require-module ts-node/register --require src/**/*.ts --format json:${latestJson} ${tags ? `--tags "${tags}"` : ''}`;
console.log('Running:', cucumberCmd);
try {
  execSync(cucumberCmd, { stdio: 'inherit' });
const options = {
  theme: 'bootstrap',
  jsonFile: jsonFile,
  output: htmlFile,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'Test Environment': process.env.NODE_ENV || 'local',
    'Executed': new Date().toISOString(),
  }
};
} catch (e) {
  console.warn('Cucumber exited with non-zero code. If JSON was generated we will still create the HTML report.');
}

// Ensure latest JSON exists and has content, then archive to timestamped file and generate HTML
if (!fs.existsSync(latestJson) || fs.statSync(latestJson).size === 0) {
  console.error('JSON report not found or empty at', latestJson);
  process.exit(1);
}

// copy latest to timestamped file for archival
fs.copyFileSync(latestJson, jsonFile);

const options = {
  theme: 'bootstrap',
  jsonFile: latestJson,
  output: htmlFile,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'Test Environment': process.env.NODE_ENV || 'local',
    'Executed': new Date().toISOString(),
  }
};

reporter.generate(options);
console.log('Generated HTML report at', htmlFile);
console.log('Archived JSON at', jsonFile);
console.log('Latest JSON at', latestJson);
console.log('All cucumber artifacts are under', outDir);
