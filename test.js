/* eslint-disable no-console */
"use strict";

const fs = require("fs").promises;
const path = require("path");

const assert = require("assert");

const phash = require("./index");
const dist = require("./distance");

const lenna_png = "Lenna.png";
const lenna_jpg = "Lenna.jpg";
const lenna_sepia = "Lenna-sepia.jpg";
const lenna_exif = "Lenna_exif-orientation-8.jpg";

const fb = "fb.jpg";
const xing = "xing.jpg";

const fb1 = "fb1.jpg";
const fb2 = "fb2.jpg";
const fb3 = "fb3.jpg";
const fb4 = "fb4.jpg";
const fb5 = "fb5.jpg";
const fb6 = "fb6.jpg";

function getPHash(img) {
  return fs.readFile(path.join(".", "img", img)).then((buf) => phash(buf));
}

function bitCount(hash) {
  return hash.replace(/0/g, "").length;
}

function testCase(img1, img2, cond) {
  return Promise.all([getPHash(img1), getPHash(img2)]).then(
    ([hash1, hash2]) => {
      const d = dist(hash1, hash2);
      const text = `${img1} vs ${img2}
hash1: ${hash1} (${bitCount(hash1)})
hash2: ${hash2} (${bitCount(hash2)})
distance: ${d}
`;
      assert.ok(cond(d), text);
      console.log("Test PASS", img1, img2, cond.name);
    }
  );
}

const SIMILAR = (d) => d <= 5;
const LIKELY_SIMILAR = (d) => d <= 10;
const NOT_SIMILAR = (d) => d > 10;

Promise.all([
  testCase(lenna_png, lenna_jpg, SIMILAR),
  testCase(lenna_jpg, lenna_sepia, SIMILAR),
  testCase(lenna_jpg, lenna_exif, SIMILAR),
  testCase(fb, xing, LIKELY_SIMILAR),
  testCase(fb1, fb2, NOT_SIMILAR),
  testCase(fb1, lenna_jpg, NOT_SIMILAR),
  testCase(fb3, fb4, NOT_SIMILAR),
  testCase(fb5, fb6, NOT_SIMILAR),
]).catch((err) => {
  console.log("Test fail");
  console.log(err.message);
});
