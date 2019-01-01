const Hapi = require('hapi');
const mongoose = require('mongoose');

const config = require('./../config');


const { routes, lib } = require('./core');

const Server = Hapi.Server({
  host: config.host,
  port: config.port,
  routes: {cors: {origin: ['*']}},
});

async function start() {
  try {
    await mongoose.connect(encodeURI(config.db_url), { useNewUrlParser: true });


    await Server.register(require('hapi-auth-jwt2'));
    Server.auth.strategy('jwt', 'jwt',
      { key: 'xendit', // Never Share your secret key
        validate: lib.validate, // validate function defined above
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });
    Server.auth.default('jwt');
    Server.route(routes);
    
    await Server.start();
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('server running at', Server.info.uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
