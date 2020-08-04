[![npm](https://img.shields.io/npm/v/nightmare-wait-for-url.svg)](https://www.npmjs.com/package/nightmare-wait-for-url) ![downloads](https://img.shields.io/npm/dt/nightmare-wait-for-url.svg) ![dependencies](https://img.shields.io/david/wojtekmaj/nightmare-wait-for-url.svg
) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/nightmare-wait-for-url.svg) [![Tested with Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# nightmare-wait-for-url

Adds .waitForUrl() to your [Nightmare](http://github.com/segmentio/nightmare) scripts.

## tl;dr
* Install by executing `npm install nightmare-wait-for-url` or `yarn add nightmare-wait-for-url`.
* Import by adding `require('nightmare-wait-for-url')`.
* Use by adding `.waitForUrl(url)` to your Nightmare chain, where `url` is a `String` or a `RegExp`.

## Getting started

### Installation

Add nigthmare-wait-for-url by executing `npm install nightmare-wait-for-url` or `yarn add nightmare-wait-for-url`.

### Usage

Here's an example of basic usage:

```js
const Nightmare = require('nightmare');
require('nightmare-wait-for-url');

const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://duckduckgo.com/')
  .type('#search_form_input_homepage', 'Alexander the great')
  .click('#search_button_homepage')
  .waitForUrl('https://duckduckgo.com/?q=Alexander+the+great');
```

### .waitForUrl(string)

Waits for the navigation to include the provided string.

Example:

```js
nightmare
  .goto('https://duckduckgo.com/')
  .type('#search_form_input_homepage', 'Alexander the great')
  .click('#search_button_homepage')
  .waitForUrl('https://duckduckgo.com/?q=Alexander+the+great');
```

### .waitForUrl(regex)

Waits for the navigation to match the provided regular expression.

Example:

```js
nightmare
  .goto('https://duckduckgo.com/')
  .type('#search_form_input_homepage', 'Alexander the great')
  .click('#search_button_homepage')
  .waitForUrl(/(Alexander|Hamster)\+the\+great/);
```

### waitTimeout

Throws an exception if the `.waitForUrl()` didn't return true within the set timeframe.

[More on waitTimeout](https://github.com/segmentio/nightmare#waittimeout-default-30s) in Nightmare's README.

## License

The MIT License.

## Authors

<table>
  <tr>
    <td>
      <img src="https://github.com/Zn4rK.png?s=100" width="100">
    </td>
    <td>
      Alexander Liljengård<br />
      <a href="mailto:alexander@paxxmedia.se">alexander@paxxmedia.se</a><br />
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>

## Thank you

This project wouldn't be possible without awesome work of Alexander Liljengård <alexander@paxxmedia.se> who created its initial version. Thank you!
