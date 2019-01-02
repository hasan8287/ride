const chai = require('chai');
const http = require('chai-http');

chai.use(http);
this.tmp = {};

before(() => {
  this.integration = require('./index.spec');
});

it('should success register driver', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('driver')
    .send({
      email: 'driver@gmail.com',
      name: 'driver-01',
      password: 'driver',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(201);
  this.tmp.createData = action.body.data;
});

it('should failed login driver', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('driver/login')
    .send({
      username: 'driver@gmail.com',
      password: 'failed',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(422);
});

it('should success login driver', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('driver/login')
    .send({
      username: 'driver@gmail.com',
      password: 'driver',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.login = action.body.data;
});

it('should success update location', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .put('driver')
    .set({
      Authorization: this.tmp.login.token,
    })
    .send({
      longitude: '-6.175110',
      latitude: '106.865036',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.update = action.body.data;
});

it('should success update status', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .put('driver')
    .set({
      Authorization: this.tmp.login.token,
    })
    .send({
      status: 'on',
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  chai.expect(action.body.data.status).to.be.equal('on');
  this.tmp.update = action.body.data;
});

it('should success get available driver', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('driver')
    .query({
      page: 1,
      limit: 20,
    })
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.data = action.body.data;
});


after(() => {
  module.exports = this.tmp;
})