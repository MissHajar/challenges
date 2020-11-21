const elementSelectors = require('../helpers/selectors.json');
const helpers = require('../helpers/helpers');

fixture`Consent Notice: HTTP Requests`
  .page('https://www.didomi.io/');

// Validate that an HTTP POST request is sent to https://api.privacy-center.org/v1/events with type = consent.given
test.requestHooks(helpers.postConsentLogger)('Validate POST request after agreeing', async (t) => {
  await t.click(elementSelectors.buttons.agree);
  await t.expect(helpers.postConsentLogger.lenght).notEql(0);
});

test.requestHooks(helpers.postDenyLogger)('Validate POST request after denying', async (t) => {
  await t.click(elementSelectors.buttons.deny);
  await t.expect(helpers.postDenyLogger.lenght).notEql(0);
});

// Validate that the function Didomi.getUserConsentStatusForAll() responds with the correct values
test('Validate Didomi.getUserConsentStatusForAll() response after agreeing', async (t) => {
  // let didomi = await t.eval(() => window.Didomi);
  const userStatus = await t.eval(() => window.Didomi.getUserConsentStatusForAll());
  // console.log('\n\nuserStatus Before Agreeing ======> ', userStatus);
  await t.click(elementSelectors.buttons.agree)
    .click(elementSelectors.buttons.agreeConfirm);
  // Check value after desagreeing
  // didomi = await t.eval(() => window.Didomi);
  const userStatusAfter = await t.eval(() => window.Didomi.getUserConsentStatusForAll());
  // console.log('\n\nuserStatus After Agreeing ======> ', userStatusAfter);
  await t.expect(userStatus.purposes.enabled.length !== userStatusAfter.purposes.enabled.length)
    .ok('After agreeing, purposes should be enabled');
  await t.expect(userStatus.purposes.disabled.length === userStatusAfter.purposes.disabled.length)
    .ok('After agreeing, no purpose should be disabled');
  await t.expect(userStatus.vendors.enabled.length !== userStatusAfter.vendors.enabled.length)
    .ok('After agreeing, vendors should be enabled');
  await t.expect(userStatus.vendors.disabled.length === userStatusAfter.vendors.disabled.length)
    .ok('After agreeing, no vendors should be disabled');
});

test('Validate Didomi.getUserConsentStatusForAll() response after denying', async (t) => {
  // let didomi = await t.eval(() => window.Didomi);
  const userStatus = await t.eval(() => window.Didomi.getUserConsentStatusForAll());
  // console.log('\n\nUserStatus Before Denying ======> ', userStatus);
  await t.click(elementSelectors.buttons.deny)
    .click(elementSelectors.buttons.denyConfirm);
  // Check value after desagreeing
  // didomi = await t.eval(() => window.Didomi);
  const userStatusAfter = await t.eval(() => window.Didomi.getUserConsentStatusForAll());
  // console.log('\n\nuserStatus After Denying ======> ', userStatusAfter);
  await t.expect(userStatus.purposes.enabled.length === userStatusAfter.purposes.enabled.length)
    .ok('After denying, no purpose should be enabled');
  await t.expect(userStatus.purposes.disabled.length !== userStatusAfter.purposes.disabled.length)
    .ok('After denying purpose.disabled.length != 0');
  await t.expect(userStatus.vendors.enabled.length === userStatusAfter.vendors.enabled.length)
    .ok('After denying, no vendors should be enabled');
  await t.expect(userStatus.vendors.disabled.length !== userStatusAfter.vendors.disabled.length)
    .ok('After denying vendors.disabled.length != 0');
});
