# WWWorkshop Webring
[![CircleCI](https://circleci.com/gh/garrying/wwworkshop-webring.svg?style=svg&circle-token=925de8bb734e79ca2ced33c897790092193f1f7d)](https://circleci.com/gh/garrying/wwworkshop-webring)

Source code for a [webring](https://en.wikipedia.org/wiki/Webring) called _WWWorkshop_. Created as part of an undergraduate studio course at OCAD University and is based on [webring.xxiivv.com](https://github.com/XXIIVV/webring) by [neauoire](https://github.com/neauoire).

### Joining the Webring

Add the following HTML snippet to the bottom of your page, before the closing `</body>` tag.

```html
<script src="https://wwworkshop.org/wwwidget.js" data-color="#0000ff" data-link-type="random" async defer></script>
```

#### Options

The tag contains two `data` attributes:

- `data-color`: (Hex color) Defines the color of the monograph. Default is black, `#000000`.
- `data-link-type`: Defines the navigation style through the webring
  - `random` Default
  -  `next` Navigate to the adjacent URL in the webring sequence

### Adding a Site

Adding sites to the webring is done by adding a new entry in [`./_data/sites.yml`](./_data/sites.yml). Add yourself to the webring by [submitting an edit](./edit/master/_data/sites.yml) to this repository. Example of an entry:

```yaml
- name: {{ site.name }}
  title: {{ site.title }}
  siteURL: {{ site.url }}
```

### Development

1. Clone repository: `git clone https://github.com/garrying/wwworkshop-webring && cd wwworkshop-webring`
2. Install Bundler: `gem install bundler`
3. Install dependencies: `bundle install`
2. Run locally: `bundle exec jekyll serve --livereload`
3. Open a browser to: `http://localhost:4000`

#### wwwwidget.js Development

With [npm](https://www.npmjs.com/) installed:

1. Install dependencies: `npm install`
2. Lint `./assets/wwwidget.js` with [ESLint](https://eslint.org/): `npm run lint`
3. Build `./assets/wwwidget.js` with [babel-minify](https://github.com/babel/minify): `npm run build`

### Licence & Attribution

Webring code is based on [webring.xxiivv.com](https://github.com/XXIIVV/webring) by [neauoire](https://github.com/neauoire).

Source code is available under [GNU General Public License v3.0](./LICENSE). Built with [Jekyll](https://jekyllrb.com), [Tachyons](http://tachyons.io/), [Two.js](https://two.js.org/), and typeset in [Work Sans](https://github.com/weiweihuanghuang/Work-Sans).