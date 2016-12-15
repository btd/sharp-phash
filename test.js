'use strict';

const fs = require('fs');
const Promise = require('bluebird');

const assert = require('assert');

const phash = require('./');
const dist = require('./distance');

const img1 = fs.readFileSync('./Lenna.png');
const img2 = fs.readFileSync('./Lenna.jpg');
const img3 = fs.readFileSync('./Lenna-sepia.jpg');

Promise.all([
  phash(img1),
  phash(img2),
  phash(img3)
])
  .then(([hash1, hash2, hash3]) => {
    assert(dist(hash1, hash2) < 5);
    assert(dist(hash2, hash3) < 5);
    assert(dist(hash3, hash1) < 5);
  });
