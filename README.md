# sharp-phash

Sharp based implementation of perceptual hash (phash) algorithm described [there](http://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html).

## Installation

```sh
yarn add sharp sharp-phash
# or
npm i sharp sharp-phash
```

You **must** install **sharp** yourself.

## How to use

```js
"use strict";

const fs = require("fs");
const Promise = require("bluebird");

const assert = require("assert");

const phash = require("sharp-phash");
const dist = require("sharp-phash/distance");

const img1 = fs.readFileSync("./Lenna.png");
const img2 = fs.readFileSync("./Lenna.jpg");
const img3 = fs.readFileSync("./Lenna-sepia.jpg");

Promise.all([phash(img1), phash(img2), phash(img3)]).then(
  ([hash1, hash2, hash3]) => {
    // hash returned is 64 characters length string with 0 and 1 only
    assert(dist(hash1, hash2) < 5);
    assert(dist(hash2, hash3) < 5);
    assert(dist(hash3, hash1) < 5);
  }
);
```
