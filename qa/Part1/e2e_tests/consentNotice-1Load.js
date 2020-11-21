import { Selector } from 'testcafe';

const fs = require('fs');
const elementSelectors = require('../helpers/selectors.json');
const helpers = require('../helpers/helpers');

// Test Notice loading
// Expected result: Notice be displayed, request method should be GET
// StatusCode shouldn't be error (>=400)
fixture`Consent Notice: Loading`
  .page('https://www.didomi.io/');

// Go to https://www.didomi.io/
test.requestHooks(helpers.logger)('Validate Homepage Loading Consistency', async (t) => {
  // Check page load status and method
  await t.expect(helpers.logger.contains((record) => (record.response.statusCode >= 200
    && record.response.statusCode < 400)))
    .ok('Checking HTTPResponse Status Code');
  await t.expect(helpers.logger.contains((record) => record.request.method.toLowerCase() === 'get'))
    .ok('Checking method should be get, this assertion will pass');

  // Get consoles messages and log errors to a file
  await t.getBrowserConsoleMessages()
    .then((data) => {
      if (data.error.length !== 0) {
        const stream = fs.createWriteStream(`/reports/consoleLog_${new Date().getTime()}.txt`);
        stream.write(data.error.join('\n').toString());
        stream.close();
      }
    });

  // Validate redirect to local FR /EN according to browser language
  const language = await helpers.getNavigatorLanguage();
  const expectedUrl = `https://www.didomi.io/${language}/`;
  await t.expect(helpers.getPageUrl())
    .eql(expectedUrl, 'Should redirect to browser language = ', language);

  // Check Local Cookies.count when loading should be 0
  const cookies = await helpers.getAllCookies();
  await t.expect(cookies.length === 0)
    .ok('When loading the page the first time, there should be no cookies');
});

// Validate that the notice is present with all buttons
test('Validate that notice is present', async (t) => {
  await t.expect(Selector(elementSelectors.containers.consentNoticeInitial).exists).ok('Consent Notice is present');
  await t.expect(Selector(elementSelectors.buttons.learnMore).exists).ok('Learn more button is displayed');
  await t.expect(Selector(elementSelectors.buttons.agree).exists).ok('Agree button is displayed');
  await t.expect(Selector(elementSelectors.buttons.deny).exists).ok('Deny button is displayed');
  await t.expect(Selector(elementSelectors.buttons.cross).exists).ok('Cross button is displayed');

  // ADD CONTENT CHECKING
});

test('Validate Homepage launch after consent given', async (t) => {
  await t.expect(Selector(elementSelectors.containers.consentNoticeInitial).exists).ok('Consent Notice is displayed');
  await t.click(elementSelectors.buttons.agree);
  await t.click(elementSelectors.buttons.agreeConfirm);
  // Open a new window to check if Notice is present
  const reloadedWindow = await t.openWindow('https://www.didomi.io/');
  await t.switchToWindow(reloadedWindow);
  // Notice shouldn't be displayed and demo button is displayed
  await t.expect(Selector(elementSelectors.containers.consentNoticeInitial).exists).notOk('Consent Notice isn\'t displayed');
});

test('Validate Homepage launch after consent denied', async (t) => {
  await t.expect(Selector(elementSelectors.containers.consentNoticeInitial).exists).ok('Consent Notice is displayed');
  await t.click(elementSelectors.buttons.deny);
  await t.click(elementSelectors.buttons.denyConfirm);
  // Open a new window to check if Notice is present
  const reloadedWindow = await t.openWindow('https://www.didomi.io/');
  await t.switchToWindow(reloadedWindow);
  // Notice shouldn't be displayed and demo button is displayed
  await t.expect(Selector(elementSelectors.containers.consentNoticeInitial).exists).notOk('Consent Notice isn\'t displayed');
});
