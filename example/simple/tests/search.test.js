module.exports = {
  after: (client) => client.end(),
  'Search no dates' : function (client) {
    client
      .url('https://www.booking.com')
      .waitForElementVisible('body',3000)
      .assert.visible('#frm')
      .setValue('#ss', 'amsterdam')
      .waitForElementPresent('.c-autocomplete__item', 3000)
      .moveToElement('.c-autocomplete__item', 1, 1)
      .click('.c-autocomplete__item')
      .submitForm('#frm')
      .waitForElementVisible('.sr_item', 5000)
      .assert.elementPresent('.sr_item');
  },
  'Index page' : function (client) {
    client
      .url('https://www.booking.com')
      .waitForElementVisible('body',3000)
      .assert.visible('#frm')
      .assert.elementPresent('.sr_item');
  }
};