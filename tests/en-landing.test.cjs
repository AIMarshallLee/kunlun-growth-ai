const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const page = fs.readFileSync('app/en/page.tsx', 'utf8');
const styles = fs.readFileSync('app/en/page.module.css', 'utf8');
const layout = fs.readFileSync('app/en/layout.tsx', 'utf8');
const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');

test('English landing page states the controlled BYOK workflow', () => {
  for (const phrase of [
    'BYOK',
    'provider allowlist',
    'hard budget stop',
    'attempt-level cost ledger',
    'bounded failover',
    'metadata-only logs',
    'human approval',
    'Request a workflow review',
    'Book a pilot',
  ]) {
    assert.match(page, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'i'));
  }
});

test('landing page has no public relay or unsupported proof claims', () => {
  for (const forbidden of ['Sign up', 'Create account', '充值', 'unlimited API', 'shared key', 'anonymous API', 'SOC 2 certified', '99.9%']) {
    assert.doesNotMatch(page, new RegExp(forbidden, 'i'));
  }
  assert.match(page, /mailto:/);
});

test('responsive styles include reduced-motion and mobile layout', () => {
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /max-width:720px/);
  assert.doesNotMatch(styles, /fonts\.googleapis\.com|Space Grotesk|Arial|Inter/i);
  assert.match(layout, /next\/font\/google/);
  assert.match(page, /ILLUSTRATIVE RUN/);
});

test('English landing page is included in the public sitemap', () => {
  assert.match(sitemap, /`\$\{base\}\/en`/);
});

test('English metadata does not inherit the Chinese title template', () => {
  assert.match(page, /title:\s*\{\s*absolute:\s*"AI workflow reliability for lean content teams"\s*\}/);
  assert.match(page, /locale:\s*"en_US"/);
});
