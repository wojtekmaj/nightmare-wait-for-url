const Nightmare = require('nightmare');

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
  function waitForUrl(matchUrl, done) {
    const timeout = setTimeout(
      () => done(new Error(`.waitForUrl(): timed out after ${this.options.waitTimeout}ms - could not find a matching url`)),
      this.options.waitTimeout,
    );

    // Our event handler
    const handler = (latestUrl) => {
      if (latestUrl.match(matchUrl)) {
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
