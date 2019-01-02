const chai = require('chai');
const http = require('chai-http');

chai.use(http);
this.tmp = {};

before(() => {
  this.integration = require('./index.spec');
});

it('should success request ride', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .post('ride')
    .set({
      Authorization: this.integration.user.login.token,
    })
    .send({
      location: {
        longitude: '-6.175110',
        latitude: '106.865036',
      },
      destination: {
        longitude: '-6.169884',
        latitude: '106.875227',
      },
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.createData = action.body.data;
});

it('should success update ride', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .put(`ride/${this.tmp.createData.ride_id}`)
    .set({
      Authorization: this.integration.user.login.token,
    })
    .send({
      destination: {
        longitude: '-6.171249',
        latitude: '106.875399',
      },
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  this.tmp.update = action.body.data;
});

it('should success approval ride by driver', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .put(`ride/approval`)
    .set({
      Authorization: this.integration.driver.login.token,
    })
    .send({
      ride_id: this.tmp.createData.ride_id,
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  chai.expect(action.body.data.status).to.be.equal('process');
  this.tmp.update = action.body.data;
});

it('should success update ride to finish', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .put(`ride/${this.tmp.createData.ride_id}`)
    .set({
      Authorization: this.integration.user.login.token,
    })
    .send({
      status: 'finish',
    });
  
  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
  chai.expect(action.body.data.status).to.be.equal('finish');
  this.tmp.update = action.body.data;
});

it('should success get data by user', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('ride')
    .set({
      Authorization: this.integration.user.login.token,
    })
    .query({
      page: 1,
      limit: 15,
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
});

it('should success get data by driver', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('ride')
    .set({
      Authorization: this.integration.driver.login.token,
    })
    .query({
      page: 1,
      limit: 15,
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(200);
});

it('should failed get data', async () => {
  const action = await chai.request(this.integration.baseUrl)
    .get('ride')
    .query({
      page: 1,
      limit: 15,
    });

  chai.expect(action).to.be.an('object').that.haveOwnProperty('status');
  chai.expect(action.status).to.be.equal(401);
});
