
![downloads](https://img.shields.io/npm/dt/nightmare-wait-for-url.svg)

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
require('nightmare-wait-for-url')

const google = await nightmare
  .goto('https://www.google.com')
  .type('input[label="Search"]', 'Alexander the great')
  .click('input[name="btnK"]')
  .waitForUrl(/https:\/\/www\.google\.com\/.*q=Alexander\+the\+great/);
```

### .waitForUrl(string)
Waits for the navigation to match the provided string.

### .waitForUrl(regex)
Waits for the navigation to match the provided regular expression.

## License

The MIT License.

## Author

<table>
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
