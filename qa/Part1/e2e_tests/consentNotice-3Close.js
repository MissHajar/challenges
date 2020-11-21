import { Selector } from 'testcafe';

const elementSelectors = require('../helpers/selectors.json');

// Test closing behavior
// Expected result: Notice should be closed and homepage "Demo" button is displayed

fixture`Consent Notice: Closing`
  .page('https://www.didomi.io/');

test('Click Cross button', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.cross).exists).ok();
  await t
    .click(elementSelectors.buttons.cross)
    .expect(Selector(elementSelectors.buttons.denyConfirm).exists)
    .ok()
    .click(elementSelectors.buttons.crossConfirm)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk()
    .expect(Selector(elementSelectors.containers.demoButton).exists)
    .ok();
});

test('Close Notice after agreeing', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.agree).exists)
    .ok()
    .click(elementSelectors.buttons.agree)
    .expect(Selector(elementSelectors.buttons.agreeConfirm).exists)
    .ok()
    .click(elementSelectors.buttons.agreeConfirm)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk()
    .expect(Selector(elementSelectors.containers.demoButton).exists)
    .ok();
});

test('Close Notice after denying', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.deny).exists)
    .ok()
    .click(elementSelectors.buttons.deny)
    .expect(Selector(elementSelectors.buttons.denyConfirm).exists)
    .ok()
    .click(elementSelectors.buttons.denyConfirm)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk()
    .expect(Selector(elementSelectors.containers.demoButton).exists)
    .ok();
});
