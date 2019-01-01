

const baseUrl = 'localhost:8080/';

this.integration = {
  baseUrl,
};


describe('User Tax Module', () => {
  before(() => {
    module.exports = this.integration;
  });

  require('./user.spec');

  after(() => {
    this.integration.user = require('./user.spec');
  });
});

// describe('Tax Module', () => {
//   before(() => {
//     module.exports = this.integration;
//   });

//   require('./tax.spec');
// });
