import { Selector } from 'testcafe';

const elementSelectors = require('../helpers/selectors.json');

// Give /Deny consent : Test all cases
// Expected result: Notice should be closed and cookies updated
// "Agree and Close", "Deny and Close",
// "Learn more, Accept all and Close", "Learn more, Deny All and Close"
// TO DO CUSTOM CHOICES

fixture`Consent Notice: Consentments`
  .page('https://www.didomi.io/');

test('Give Consent', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.agree).exists).ok()
    .click(elementSelectors.buttons.agree)
    .wait(500)
    .expect(Selector(elementSelectors.buttons.agreeConfirm).exists)
    .ok()
    .click(elementSelectors.buttons.agreeConfirm)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk();
});

test('Deny Consent', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.deny).exists).ok()
    .click(elementSelectors.buttons.deny)
    .wait(500)
    .expect(Selector(elementSelectors.buttons.denyConfirm).exists)
    .ok()
    .click(elementSelectors.buttons.denyConfirm)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk();
});

test('Learn more and Give Consent', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.learnMore).exists).ok()
    .click(elementSelectors.buttons.learnMore)
    .wait(500)
    .expect(Selector(elementSelectors.buttons.agreeToAll).exists)
    .ok()
    .click(elementSelectors.buttons.agreeToAll)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk();
});

test('Learn more and Deny Consent', async (t) => {
  await t.expect(Selector(elementSelectors.buttons.learnMore).exists).ok()
    .click(elementSelectors.buttons.learnMore)
    .wait(500)
    .expect(Selector(elementSelectors.buttons.denyAll).exists)
    .ok()
    .click(elementSelectors.buttons.denyAll)
    .expect(Selector(elementSelectors.containers.consentNoticeInitial).exists)
    .notOk();
});

