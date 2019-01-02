require('dotenv').config();

const Hapi = require('hapi');
const mongoose = require('mongoose');
const { routes, lib } = require('./../src/core');


describe('start test', () => {
  before(async () => {
    mongoose.connect(process.env.DB_URL_TEST);
    const Server = Hapi.Server({
      host: process.env.HOST,
      port: process.env.PORT,
    });

    Server.state('session', {  
      ttl: 1000 * 60 * 60 * 24,    // 1 day lifetime
      encoding: 'base64json'       // cookie data is JSON-stringified and Base64 encoded
    });

    await Server.register(require('hapi-auth-jwt2'));
    Server.auth.strategy('jwt', 'jwt',
      { key: process.env.SCRET_KEY, // Never Share your secret key
        validate: lib.validate, // validate function defined above
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });
    Server.auth.default('jwt');

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
  });
});
