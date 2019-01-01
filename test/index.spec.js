require('dotenv').config();

const Hapi = require('hapi');
const mongoose = require('mongoose');
const { routes } = require('./../src/core');


describe('start test', () => {
  before(() => {
    mongoose.connect('mongodb://localhost:27017/ride-test');
    const Server = Hapi.Server({
      host: 'localhost',
      port: 8080,
    });


    Server.route(routes);

    async function start() {
      try {
        await Server.start();
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log('server running at', Server.info.uri);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    }

    start();
  });

  // eslint-disable-next-line global-require
  it('integration testing', () => {
    require('./integration/index.spec');
  })

  after(() => {
    // console.log('oke bro')
  });
});
