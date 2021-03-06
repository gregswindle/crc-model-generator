# `eslint-plugin-crc`

> Analyze, model, and refactor JavaScript codebases with auto-generated Class-Responsibility-Collaborator models.

[![License][license-image]][license-url]
[![FOSSA Status][fossa-image]][fossa-url]
[![NSP Status][nsp-image]][nsp-url]
[![Dependencies][daviddm-image]][daviddm-url]
[![Dependencies][daviddm-dev-image]][daviddm-dev-url]<br>
[![Travis branch][travis-image]][travis-url]
[![AppVeyor Windows build status][appveyor-image]][appveyor-url]
[![Coveralls coverage][coveralls-image]][coveralls-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Quality Gate][sonar-quality-gate-image]][sonar-quality-gate-url]
[![PRs Welcome][makeapullrequest-image]][makeapullrequest-url]

## Table of contents

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:excludeText=Table of contents) -->
- [1. Refactoring with CRC models](#1-refactoring-with-crc-models)
- [2. Installation](#2-installation)
- [3. Configuration](#3-configuration)
- [4. Usage](#4-usage)
- [5. Anatomy of a CRC model](#5-anatomy-of-a-crc-model)
- [6. Benefits](#6-benefits)
  * [6.1. Simplicity](#61-simplicity)
  * [6.2. Behavior-driven development](#62-behavior-driven-development)
- [7. Contributing](#7-contributing)
- [8. Version](#8-version)
- [9. License](#9-license)
- [10. References](#10-references)
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## 1. Refactoring with CRC models

> ![Citation][icon-quote-left-image] Refactoring is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior.
>
> Its heart is a series of small behavior preserving transformations. Each transformation (called a “refactoring”) does little, but a sequence of transformations can produce a significant restructuring. Since each refactoring is small, it’s less likely to go wrong. The system is kept fully working after each small refactoring, reducing the chances that a system can get seriously broken during the restructuring.<sup><a href="#ref-refactoring-definition">[1]</a></sup>

CRC Models can help you pinpoint where problems might be, and reveal potential improvements to your design.

---

**Example:** two prototypes (classes) called Polygon and Square:

<!-- crc-model-template:html,markdown -->

<table width="100%">
 <thead>
   <tr valign="top" align="left">
     <th colspan="2">
       <h3>
         <tt><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a></tt>
           Polygon
           <tt>extends
           <a rel="noopener" href="https://is.gd/ZZBLcn" target="mdn">Object</a></tt>
      </h3>
      <blockquote>

      </blockquote>
      </th>

   </tr>
   <tr valign="top" align="left">
     <th>Responsibilities</th>
     <th>Collaborators</th>
   </tr>
 </thead>
 <tfoot valign="top" align="left">
   <tr valign="top" align="left" width="100%">
     <td bgcolor="#fcfcfc" colspan="2">
       <details>
         <summary><img src="docs/img/icons8/icon-javascript-filled-25.png" alt="Select to toggle" align="top"> Details...</summary>
           <dl>
           <dt><strong>Source code</strong></dt>
           <dd><blockquote>

```js
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.name = "Polygon";
  }
}

module.exports = Polygon;
```

</blockquote></dd>
           <dt><strong>References</strong></dt>
           <dd>
             <blockquote><strong>Polygon is referenced <em>n</em> times in <em>n<sub>1</sub></em> files.</strong><br><br>
           <ol>
             <li>TODO: reference one.</li>
             <li>TODO: reference two.</li>
             <li>TODO: reference one.</li>
          </ol></blockquote></dd>
           </dl>
       </details>
     </td>
   </tr>
 </tfoot>
 <tbody>
   <tr valign="top" align="left">
   <td width="50%">
     <ol> Undetermined. </ol>
   </td>
   <td width="50%">
     <ol> None found. </ol>
   </td>
   </tr>
 </tbody>
</table>

<!--/crc-model-template:html,markdown -->

<!-- crc-model-template:html,markdown -->

<table width="100%">
  <thead>
    <tr valign="top" align="left">
      <th colspan="2">
        <h3>
          <tt><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a></tt>
            <strong>Square</strong>
            <tt>extends
            <a href="Polygon">Polygon</a></tt>
       </h3>
       <blockquote>
         A plane figure with four equal straight sides and four right angles.
       </blockquote>
       </th>
    </tr>
    <tr valign="top" align="left">
      <th>Responsibilities</th>
      <th>Collaborators</th>
    </tr>
  </thead>
  <tfoot valign="top" align="left">
    <tr valign="top" align="left" width="100%">
      <td bgcolor="#fcfcfc" colspan="2">
        <details>
          <summary><img src="docs/img/icons8/icon-javascript-filled-25.png" alt="Select to toggle" align="top"> Details...</summary>
            <dl>
            <dt><strong>Example</dt>
            <dd><blockquote>

```js
let shape = new Square(5);
console.log(`${shape.name} has
  a height ${shape.height} and
  a width of ${shape.width},
  for an area of ${shape.area}.`);
// =>
// Square has
//  a height 5 and
//  a width of 5,
//  for an area of 25.
```

</blockquote>
</dd>
            <dt><strong>Source code</strong></dt>
            <dd><blockquote>

```js
/**
 * A plane figure with four equal straight sides and four right
 * angles.
 *
 * @property {number} area - The extent of a two-dimensional figure
 * or shape, or planar lamina, in the plane.
 * @property {string=Square} name - The geometric `object`'s name.
 * @example
 * let shape = new Square(5)
 * console.log(`${shape.name} has
 *   a height ${shape.height} and
 *   a width of ${shape.width},
 *   for an area of ${shape.area}.`)
 * @extends Polygon
 */
class Square extends Polygon {
  /**
   * Call the parent class's constructor with lengths
   * provided for the Polygon's width and height.
   * @param {!number=0} length - The length of all sides.
   * @constructor
   */
  constructor(length = 0) {
    super(length, length);
    this.name = "Square";
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.height = this.width = Math.sqrt(value);
  }
}

module.exports = Square;
```

</blockquote></dd>
            <dt><strong>References</strong></dt>
            <dd>
              <blockquote><strong>Square is referenced <em>n</em> times in <em>n<sub>1</sub></em> files.</strong><br><br>
            <ol>
              <li>TODO: reference one.</li>
              <li>TODO: reference two.</li>
              <li>TODO: reference one.</li>
           </ol></blockquote></dd>
            </dl>
        </details>
      </td>
    </tr>
  </tfoot>
  <tbody>
    <tr valign="top" align="left">
      <td width="50%">
        <ol>
            <li>Get the extent of a two-dimensional figure
            or shape, or planar lamina, in the plane.</li>
            <li>Set the extent of a two-dimensional figure
            or shape, or planar lamina, in the plane.</li></ol>
      </td>
      <td width="50%">
        <ol>
          <li><code><a rel="noopener" title="View documentation for Math." href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math">Math</a> [<a title="Introduced on line 10, column 20." href="#">10</a>:<a title="Introduced on line 10, column 20." href="#">20</a>]</code>
        </ol>
      </td>
    </tr>
  </tbody>
</table>

<!--/crc-model-template:html,markdown -->

## 2. Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-crc`:

```
$ npm install eslint-plugin-crc --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-crc` globally.

## 3. Configuration

Add `crc` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["crc"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "crc/generate-crc": 2
  }
}
```

## 4. Usage

For local installations, run:

```bash
$ ./node_modules/.bin/eslint \
  -f './lib/formatters/crc/index.js' tests/fixtures/crc/class-declaration/*.js \
  -o reports/crc-model-report.md
```

If you installed `eslint-plugin-crc` globally, run:

```bash
$ eslint \
  -f './lib/formatters/crc/index.js' tests/fixtures/crc/class-declaration/*.js \
  -o reports/crc-model-report.md
```

## 5. Anatomy of a CRC model

CRC Models use a simple and scannable template that consist of three simple sections for:

1.  **Name**: what the class (or object) is called in source code.
2.  **Responsibilities**: the work that the class/object is supposed to perform, and the data it's supposed to maintain.
3.  **Collaborators**: other objects this class directly invokes in order to do its work.

<table width="100%">
  <thead>
    <tr valign="top" align="left">
      <th colspan="2"><code>Class/Object name</code></th>
    </tr>
    <tr valign="top" align="left">
      <th>Responsibilities</th>
      <th>Collaborators</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top" align="left">
      <td width="50%">
      <p>The <code>class/object</code>'s activities and purpose:
        <ol>
          <li>What the class/object does.
          <li>The information it maintains.
        </ol></p>
      </td>
      <td width="50%">
      <p>Objects that this <code>class</code> depends on to:
        <ol>
          <li>Assist <code>Class name</code> with its work.
          <li>Provide info/data that <code>Class name</code> needs.
        </ol></p>
      </td>
    </tr>
  </tbody>
</table>

> ![Use of terms][icon-info-image] Despite the implementation of the `class`, `constructor`, `static`, `extends`, and `super` keywords in ES2015, JavaScript _still_ achieves encapsulation, inheritance, and polymorphism with `prototype` chains. Nevertheless, I use the word `class` to refer to JavaScript objects with `prototype`-based inheritance.

## 6. Benefits

### 6.1. Simplicity

CRC Models express how classes (i.e., prototyped JavaScript objects) behave and interact in order to fulfill their specified responsibilities.

> ![Citation][icon-quote-left-image] A Class Responsibility Collaborator (CRC) model...is...divided into three sections.... A class represents a collection of similar objects, a responsibility is something that a class knows or does, and a collaborator is another class that a class interacts with to fulfill its responsibilities.<sup><a href="#ref-crc-definition">[2]</a></sup>

CRC models are simple to read, write, and update. CRC models focus on the **purpose** of classes instead of their **mechanics**. Because of their simplicity, CRC models are useful for determining why software might be difficult to extend or change.

### 6.2. Behavior-driven development

Behavior-driven development (BDD) seeks to incorporate **_design_** as a routine exercise during product delivery. BDD prescribes iterative activities intended to redefine and contextualize design, testing, and programming as unified activities that share common specifications expressing a product's behavior instead of its technical implementation. BDD extends TDD's focus on refactoring to how classes behave with each other. The very structure of Class-Responsibility-Collaboration models, with their emphasis on the appropriate distribution of responsibilities among classes (and therefore how those classes collaborate) reflects BDD's emphasis on behavior instead of technical assertions.

## 7. Contributing

> [![PRs Welcome][makeapullrequest-image]][makeapullrequest-url] We welcome contributors and pull requests.

Check out the guidelines for

* [Contributing to `eslint-plugin-crc`](https://github.com/gregswindle/eslint-plugin-crc/blob/master/.github/CONTRIBUTING.md) and our
* [Contributor Covenant Code of Conduct][code-of-conduct-url].

Contributions are stories with a beginning, a middle, and an end, all told through issues, comments, commit logs, and pull requests.

* [Peruse open issues][issues-url] or
* [Open a new pull request (PR)][pr-url].

## 8. Version

`eslint-plugin-crc`'s latest version is <!-- semver --> [`v0.2.0`][changelog-url] <!-- semverend --> . Please read the [CHANGELOG][changelog-url] for details.

## 9. License

[MIT][license-url] © [Greg Swindle][author-url]

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fgregswindle%2Feslint-plugin-crc.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fgregswindle%2Feslint-plugin-crc?ref=badge_large)

## 10. References

<a name="ref-refactoring-definition"></a>
**[1]** M. Fowler, "Refactoring", Refactoring.com, 2017. [Online]. Available: https://refactoring.com/. [Accessed: 22- Nov- 2017]

<a name="ref-crc-definition"></a>
**[2]** S. Ambler, "Class Responsibility Collaborator (CRC) Models: An Agile Introduction", Agilemodeling.com, 2017. [Online]. Available: http://agilemodeling.com/artifacts/crcModel.htm. [Accessed: 22- Nov- 2017]

---

[![License][license-image]][license-url] [![Readme Score][readme-score-img]][readme-score-url] [![Greenkeeper][greenkeeper-img]][greenkeeper-url]

[api-docs-url]: https://github.com/gregswindle/eslint-plugin-crc/docs/API.md
[apigee-edge-js-url]: http://docs.apigee.com/api-services/reference/javascript-object-model
[appveyor-image]: https://img.shields.io/appveyor/ci/gregswindle/eslint-plugin-crc.svg?style=flat-square&logo=appveyor
[appveyor-url]: https://ci.appveyor.com/project/gregswindle/eslint-plugin-crc
[author-url]: https://github.com/gregswindle
[changelog-url]: https://github.com/gregswindle/eslint-plugin-crc/blob/master/CHANGELOG.md
[codacy-coverage-image]: https://api.codacy.com/project/badge/Coverage/fa4ade3f68a04b9cad26165a59ceb88e
[codacy-coverage-url]: https://www.codacy.com/app/greg_7/eslint-plugin-crc?utm_source=github.com&utm_medium=referral&utm_content=gregswindle/eslint-plugin-crc&utm_campaign=Badge_Coverage
[codacy-image]: https://img.shields.io/codacy/grade/685cb41fec6746038e6deaa1bfddb71a.svg?style=flat-square
[codacy-url]: https://www.codacy.com/app/greg_7/eslint-plugin-crc?utm_source=github.com&utm_medium=referral&utm_content=gregswindle/eslint-plugin-crc&utm_campaign=Badge_Grade
[code-of-conduct-url]: https://github.com/gregswindle/eslint-plugin-crc/blob/master/.github/CODE_OF_CONDUCT.md
[complexity-report-url]: https://github.com/escomplex/complexity-report
[coveralls-image]: https://img.shields.io/coveralls/github/gregswindle/eslint-plugin-crc.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/gregswindle/eslint-plugin-crc?branch=master
[daviddm-dev-image]: https://david-dm.org/gregswindle/eslint-plugin-crc/dev-status.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/gregswindle/eslint-plugin-crc?type=dev
[daviddm-image]: https://david-dm.org/gregswindle/eslint-plugin-crc.svg?theme=shields.io&style=flat-square
[daviddm-url]: https://david-dm.org/gregswindle/eslint-plugin-crc
[editorconfig-url]: http://editorconfig.org/
[eslint-github-url]: https://github.com/eslint/eslint
[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgregswindle%2Feslint-plugin-crc.svg?type=shield&style=flat-square
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fgregswindle%2Feslint-plugin-crc?ref=badge_shield
[greenkeeper-img]: https://badges.greenkeeper.io/gregswindle/eslint-plugin-crc.svg?style=flat-square
[greenkeeper-url]: https://greenkeeper.io/
[issues-url]: https://github.com/gregswindle/eslint-plugin-crc/issues
[icon-info-image]: docs/img/icons8/icon-info-30.png
[icon-quote-left-image]: docs/img/icons8/icon-quote-left-25.png
[jsdoc2md-url]: https://github.com/jsdoc2md/jsdoc-to-markdown
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/gregswindle/eslint-plugin-crc/blob/master/LICENSE
[lint-def-url]: https://en.wikipedia.org/wiki/Lint_(software)
[makeapullrequest-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[makeapullrequest-url]: http://makeapullrequest.com
[npm-image]: https://badge.fury.io/js/eslint-plugin-crc.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-crc
[nsp-image]: https://nodesecurity.io/orgs/gregswindle/projects/da7e6d96-620d-4acb-8559-85c06c66921a/badge?style=flat-square
[nsp-url]: https://nodesecurity.io/orgs/gregswindle/projects/da7e6d96-620d-4acb-8559-85c06c66921a
[pr-url]: https://github.com/gregswindle/eslint-plugin-crc/pulls
[readme-score-img]: http://readme-score-api.herokuapp.com/score.svg?url=https://github.com/gregswindle/eslint-plugin-crc
[readme-score-url]: http://clayallsopp.github.io/readme-score?url=https://github.com/gregswindle/eslint-plugin-crc
[scoreme-url]: http://clayallsopp.github.io/readme-score/
[sonar-cognitive-img]: http://sonarcloud.io/api/badges/measure?key=gregswindle-eslint-plugin-crc&metric=cognitive_complexity
[sonar-cognitive-url]: https://sonarcloud.io/component_measures/metric/cognitive_complexity/list?id=gregswindle-eslint-plugin-crc
[sonar-complexity-img]: http://sonarcloud.io/api/badges/measure?key=gregswindle-eslint-plugin-crc&metric=function_complexity
[sonar-complexity-url]: https://sonarcloud.io/component_measures/domain/Complexity?id=gregswindle-eslint-plugin-crc
[sonar-coverage-img]: http://sonarcloud.io/api/badges/measure?key=gregswindle-eslint-plugin-crc&metric=coverage
[sonar-coverage-url]: https://sonarcloud.io/component_measures/domain/Coverage?id=gregswindle-eslint-plugin-crc
[sonar-quality-gate-image]: https://sonarcloud.io/api/badges/gate?key=gregswindle-eslint-plugin-crc
[sonar-quality-gate-url]: https://sonarcloud.io/dashboard/index/gregswindle-eslint-plugin-crc
[sonar-tech-debt-img]: https://sonarcloud.io/api/badges/measure?key=gregswindle-eslint-plugin-crc&metric=sqale_debt_ratio
[sonar-tech-debt-url]: https://sonarcloud.io/component_measures/metric/sqale_index/list?id=gregswindle-eslint-plugin-crc
[travis-image]: https://img.shields.io/travis/gregswindle/eslint-plugin-crc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/gregswindle/eslint-plugin-crc
