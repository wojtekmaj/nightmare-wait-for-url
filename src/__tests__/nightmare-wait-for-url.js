const Nightmare = require('nightmare');
const app = require('../../test/app');

// Get rid of a warning
process.setMaxListeners(0);

const base = 'http://localhost:7500/';

describe('Nightmare .waitForUrl', () => {
  let server;

  beforeAll((done) => {
    require('../nightmare-wait-for-url');
    server = app.listen(7500, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should be constructable', async () => {
    const ngtm = Nightmare();

    const constructNgtm = async () => ngtm.waitForUrl('');

    expect(constructNgtm).not.toThrow();

    await ngtm.end();
  });

  describe('waiting', () => {
    it('should wait for #anchor1', async () => {
      const ngtm = Nightmare();

      const anchorString = await ngtm
        .goto(base)
        .click('#anchor-1')
        .waitForUrl('#anchor1');

      expect(anchorString).toBe(true);

      await ngtm.end();
    });

    it('should wait for #anchor\\d+ with regular expression', async () => {
      const ngtm = Nightmare();

      const anchorRegExp = await ngtm
        .goto(base)
        .click('#anchor-1')
        .waitForUrl(/#anchor\d+/);

      expect(anchorRegExp).toBe(true);

      await ngtm.end();
    });
  });
});
