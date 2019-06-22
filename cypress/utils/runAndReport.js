const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');
const { create } = require('mochawesome-report-generator');
const ghpages = require('gh-pages');

const reportsDir = './cypress/reports';

const rename = () =>
  new Promise((resolve, reject) => {
    fse.rename(`${reportsDir}/static/mochawesome.html`, `${reportsDir}/static/index.html`, err => {
      if (err) reject(err);
      resolve();
    });
  });

const publish = () =>
  new Promise((resolve, reject) =>
    ghpages.publish(
      `${reportsDir}/static`,
      {
        branch: 'gh-pages',
        repo: 'https://github.com/niradler/devresources-client.git',
      },
      err => {
        if (err) reject(err);
        resolve();
      },
    ),
  );

const options = {
  reportDir: `${reportsDir}/mocha`,
};

async function runTests() {
  await fse.remove(options.reportDir);
  const { totalFailed } = await cypress.run();
  const jsonReport = await merge(options);
  await create(jsonReport, {
    reportDir: `${reportsDir}/static`,
    inline: true,
    overwrite: true,
    reportTitle: 'Devresources.site',
    reportPageTitle: 'Devresources Status',
  });
  await rename();
  await publish();

  process.exit(totalFailed);
}

runTests().catch(e => {
  console.error('cypress: ', e);
  process.exit(1);
});
