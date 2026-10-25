// Runs the actual interaction code with a minimal document model.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
  constructor() { this.children = []; this.events = {}; this.textContent = ''; this.disabled = false; this.hidden = false; this.classes = new Set(); this.classList = { add: (...v) => v.forEach(x => this.classes.add(x)), remove: (...v) => v.forEach(x => this.classes.delete(x)) }; }
  append(...nodes) { this.children.push(...nodes); }
  setAttribute() {}
  addEventListener(type, fn) { this.events[type] = fn; }
  focus() {}
  click() { if (!this.disabled) this.events.click(); }
}
const source = fs.readFileSync('assets/puzzle.js', 'utf8');
function setup() {
  const nodes = Object.fromEntries(['seals', 'activate', 'reset', 'status'].map(x => [x, new Element()]));
  const body = new Element();
  const document = { body, createElement: () => new Element(), querySelector: selector => nodes[selector.slice(1)] || nodes.seals.children.flatMap(x => x.children).find(x => x.id === selector.slice(1)) };
  vm.runInNewContext(source, { document, setTimeout: () => 0, clearTimeout() {} });
  return { nodes, body, seals: nodes.seals.children.map(x => x.children[1]) };
}
let accepted = 0;
for (let code = 0; code < 256; code++) {
  const app = setup();
  const order = [0, 1, 2, 3].map(i => (code >> (i * 2)) & 3);
  order.forEach((n, i) => { for (let j = 0; j < n; j++) app.seals[i].click(); });
  app.nodes.activate.click();
  const success = app.body.classes.has('success');
  assert.equal(success, order.join() === '0,1,2,3');
  if (success) {
    accepted++;
    assert.ok(app.seals.every(x => x.disabled));
    assert.ok(app.nodes.status.textContent.includes('kitárul'));
    app.nodes.reset.click();
    assert.ok(!app.body.classes.has('success'));
    assert.ok(app.seals.every(x => !x.disabled && x.textContent === '✦'));
  } else assert.ok(app.body.classes.has('failure'));
}
assert.equal(accepted, 1);
const retry = setup();
retry.nodes.activate.click();
retry.seals[1].click();
assert.ok(!retry.body.classes.has('failure'));
console.log('PASS: all 256 settings, exactly one accepted; failure, retry, success lock and reset.');
