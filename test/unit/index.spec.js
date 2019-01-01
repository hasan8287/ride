

const scheduler = require('./../../src/product/controller')
describe('scheduler', () => {
	it('should succes update data', async () => {
		const a = await scheduler.updateAll();
		console.log('sip test : ', a)
	})
});

