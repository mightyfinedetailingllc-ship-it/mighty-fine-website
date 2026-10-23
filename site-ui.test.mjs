import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");
const script = readFileSync(new URL("./script.js", import.meta.url), "utf8");

test("service ticker uses two matching groups for a continuous loop", () => {
  assert.match(html, /class="ticker-track"/);
  assert.equal((html.match(/class="ticker-group"/g) || []).length, 2);
  assert.match(css, /\.ticker-track\{[^}]*display:flex/);
  assert.match(css, /@keyframes tickerLoop\{[^}]*to\{transform:translateX\(-50%\)\}/);
});

test("placeholder before-and-after gallery is removed", () => {
  assert.doesNotMatch(html, /id="work"|id="compare"|See the <em>difference/);
  assert.doesNotMatch(script, /getElementById\("compare"\)|getElementById\("work"\)/);
});

test("review arrows are removed while review dots remain", () => {
  assert.doesNotMatch(script, /reviewPrev|reviewNext|Previous review|Next review/);
  assert.match(script, /id="reviewDots"/);
});
