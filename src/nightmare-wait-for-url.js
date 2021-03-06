const Nightmare = require('nightmare');

const urlMatches = (url, matchUrl) => {
  if (matchUrl instanceof RegExp) {
    return url.match(matchUrl);
  }

  if (typeof matchUrl === 'string') {
    return url.includes(matchUrl);
  }

  return null;
};

Nightmare.action(
  'waitForUrl',
  (ns, options, parent, win, renderer, done) => {
    const navigationHistory = [];

    win.webContents.on('navigation-entry-commited', (event, url /* , inPage, replaceEntry */) => {
      navigationHistory.push(url);
    });

    // Get the latest url
    parent.on('waitForUrl', () => {
      parent.emit('waitForUrl', navigationHistory[navigationHistory.length - 1]);
    });

    done();
  },
  function waitForUrl(...args) {
    const matchUrl = args[args.length - 2];
    const done = args[args.length - 1];

    if (!matchUrl) {
      done();
      return;
    }

    const timeout = setTimeout(
      () => done(new Error(`.waitForUrl(): Timed out after ${this.options.waitTimeout}ms - could not find a matching url`)),
      this.options.waitTimeout,
    );

    // Our event handler
    const handler = (url) => {
      if (!url) {
        return;
      }

      if (urlMatches(url, matchUrl)) {
        this.child.removeListener('waitForUrl', handler);

        clearTimeout(timeout);
        done(null, true);
      } else {
        // If we don't match, emit again
        this.child.emit('waitForUrl');
      }
    };

    // Callback on waitForUrl
    this.child.on('waitForUrl', handler);
    this.child.emit('waitForUrl');
  },
);
