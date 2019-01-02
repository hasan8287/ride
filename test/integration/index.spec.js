

const baseUrl = 'localhost:8080/';

this.integration = {
  baseUrl,
};


describe('User Module', () => {
  before(() => {
    module.exports = this.integration;
  });

  require('./user.spec');

  after(() => {
    this.integration.user = require('./user.spec');
  });
});

describe('Driver Module', () => {
  before(() => {
    module.exports = this.integration;
  });

  require('./driver.spec');

  after(() => {
    this.integration.driver = require('./driver.spec');
  });
});


describe('Rides Module', () => {
  before(() => {
    module.exports = this.integration;
  });

  require('./ride.spec');

  after(() => {
    this.integration.user = require('./ride.spec');
  });
});