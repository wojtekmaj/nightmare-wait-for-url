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

    const constructNgtm = async () => ngtm.waitForUrl();

    expect(constructNgtm).not.toThrow();

    await ngtm.end();
  });

  it('should not throw an error when provided with no arguments', async () => {
    const ngtm = Nightmare();

    const constructNgtm = async () => ngtm
      .goto(base)
      .waitForUrl();

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

    it('should timeout if no match for #anchor1', async () => {
      const ngtm = Nightmare({
        waitTimeout: 1000,
      });

      let error;
      try {
        await ngtm
          .goto(base)
          .click('#anchor-1')
          .waitForUrl('#anchor2');
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('.waitForUrl(): Timed out after 1000ms - could not find a matching url');

      await ngtm.end();
    });
  });

  describe('chaining two or more actions', () => {
    it('should handle two .waitForUrl without URL change', async () => {
      const ngtm = Nightmare();

      const anchorRegExp = await ngtm
        .goto(base)
        .click('#anchor-1')
        .waitForUrl('#anchor1')
        .waitForUrl(/#anchor\d+/);

      expect(anchorRegExp).toBe(true);

      await ngtm.end();
    });

    it('should handle two .waitForUrl with URL change', async () => {
      const ngtm = Nightmare();

      const anchorRegExp = await ngtm
        .goto(base)
        .click('#anchor-1')
        .waitForUrl('#anchor1')
        .click('#anchor-2')
        .waitForUrl('#anchor2');

      expect(anchorRegExp).toBe(true);

      await ngtm.end();
    });
  });
});
