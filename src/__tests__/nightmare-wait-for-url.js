import Nightmare from 'nightmare';
import app from '../../test/app';

import '../nightmare-wait-for-url';

const url = 'http://localhost:7500';

describe('Nightmare .waitForUrl', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(7500, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should be constructable', async () => {
    const ngtm = Nightmare();

    let error;
    try {
      await ngtm.waitForUrl('');
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();

    await ngtm.end();
  });

  it('should not throw an error when provided with no arguments', async () => {
    const ngtm = Nightmare();

    let error;
    try {
      await ngtm
        .goto(url)
        .waitForUrl();
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();

    await ngtm.end();
  });

  describe('waiting', () => {
    it('should wait for URL containing string', async () => {
      const ngtm = Nightmare();

      const anchorString = await ngtm
        .goto(url)
        .click('#anchor-1')
        .waitForUrl('#anchor1');

      expect(anchorString).toBe(true);

      await ngtm.end();
    });

    it('should wait for URL containing string containing regex characters', async () => {
      const ngtm = Nightmare();

      const anchorString = await ngtm
        .goto(url)
        .click('#submit_button')
        .waitForUrl(`${url}/?q=test`); // without ${url}, will match 'q=test', omitting '/?'

      expect(anchorString).toBe(true);

      await ngtm.end();
    });

    it('should wait for URL matching regular expression', async () => {
      const ngtm = Nightmare();

      const anchorRegExp = await ngtm
        .goto(url)
        .click('#anchor-1')
        .waitForUrl(/#anchor\d+/);

      expect(anchorRegExp).toBe(true);

      await ngtm.end();
    });

    it('should timeout if no match', async () => {
      const ngtm = Nightmare({
        waitTimeout: 1000,
      });

      let error;
      try {
        await ngtm
          .goto(url)
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
        .goto(url)
        .click('#anchor-1')
        .waitForUrl('#anchor1')
        .waitForUrl(/#anchor\d+/);

      expect(anchorRegExp).toBe(true);

      await ngtm.end();
    });

    it('should handle two .waitForUrl with URL change', async () => {
      const ngtm = Nightmare();

      const anchorString = await ngtm
        .goto(url)
        .click('#anchor-1')
        .waitForUrl('#anchor1')
        .click('#anchor-2')
        .waitForUrl('#anchor2');

      expect(anchorString).toBe(true);

      await ngtm.end();
    });
  });
});
