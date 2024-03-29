# WWWorkshop Webring

[![HTMLProofer/NPM Lint Build](https://github.com/garrying/wwworkshop-webring/actions/workflows/main.yml/badge.svg)](https://github.com/garrying/wwworkshop-webring/actions/workflows/main.yml)

Source code for a [webring](https://en.wikipedia.org/wiki/Webring) called [**WWWorkshop**](https://wwworkshop.org) Created as part of an undergraduate studio course at OCAD University—[view course materials and syllabus](https://github.com/garrying/wwworkshop). Source code and design is based on [webring.xxiivv.com](https://github.com/XXIIVV/webring) by [neauoire](https://github.com/neauoire).

### Joining the Webring

Add the following HTML snippet to the bottom of your page, before the closing `</body>` tag.

```html
<script src="https://wwworkshop.org/wwwidget.js" data-color="#0000ff" data-link-type="random" async defer></script>
```

#### Options

The tag contains two `data` attributes:

* `data-color`: (Hex color) Defines the color of the monograph. Default is black, `#000000`
* `data-link-type`: Defines the navigation style through the webring
  - `random` Default
  - `next` Navigate to the adjacent URL in the webring sequence

### Adding a Site

Adding sites to the webring is done by adding a new entry in [`./_data/sites.yml`](./_data/sites.yml). Add yourself to the webring by [submitting an edit](https://github.com/garrying/wwworkshop-webring/edit/main/_data/sites.yml) to this repository. Example of an entry:

```yaml
- name: {{ site.name }}
  title: {{ site.title }}
  siteURL: {{ site.url }}
```

### Development

1. Clone repository: `git clone https://github.com/garrying/wwworkshop-webring && cd wwworkshop-webring`
2. Install Bundler: `gem install bundler`
3. Install dependencies: `bundle install`
4. Run locally: `bundle exec jekyll serve --livereload`
5. Open a browser to: `http://localhost:4000`

#### wwwwidget.js Development

With [npm](https://www.npmjs.com/) installed:

1. Install dependencies: `npm install`
2. Lint `./assets/wwwidget.js` with [Standard](https://standardjs.com/): `npm run lint`
3. Build `./assets/wwwidget.js` with [webpack](https://webpack.js.org/): `npm run build`

### License & Attribution

Webring code is based on [webring.xxiivv.com](https://github.com/XXIIVV/webring) by [neauoire](https://github.com/neauoire).

Source code is available under [GNU General Public License v3.0](./LICENSE). Built with [Jekyll](https://jekyllrb.com), [Tachyons](http://tachyons.io/), [Two.js](https://two.js.org/), and typeset in [Work Sans](https://github.com/weiweihuanghuang/Work-Sans).
