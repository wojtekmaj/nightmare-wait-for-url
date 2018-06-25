require('mocha-generators').install();

const nightmare = require('nightmare');
const should = require('chai').should();
const server = require('./server');

// Get rid of a warning
process.setMaxListeners(0);

const base = 'http://localhost:7500/';

describe('Nightmare Wait For Url', function() {
  before(function(done) {
    require('../src/nightmare-wait-for-url');
    server.listen(7501, function() {
      server.listen(7500, done);
    });
  });

  it('should be constructable', async () => {
    const ngtm = nightmare();

    ngtm.should.be.ok;

    await ngtm.end();
  });

  describe('waiting', () => {
    it('should wait for anchor1', async () => {
      const ngtm = nightmare();

      const anchor = await ngtm
        .goto(base)
        .click('#anchor-1')
        .waitForUrl('#anchor1');

      anchor.should.be.true;

      await ngtm.end();
    });

    it('should wait for random anchor with regular expression', async () => {
      const ngtm = nightmare();

      const target = Math.floor(Math.random() * (3 - 1) + 1);

      const regex = await ngtm
        .goto(base)
        .click('#anchor-' + target)
        .waitForUrl(/#anchor\d+/);

      regex.should.be.true;

      await ngtm.end();
    });

  });
});
