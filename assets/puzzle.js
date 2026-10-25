(() => {
  'use strict';
  const symbols = [
    { glyph: '✦', name: 'Csillag' },
    { glyph: '☾', name: 'Hold' },
    { glyph: '⚔', name: 'Kard' },
    { glyph: '♛', name: 'Korona' }
  ];
  const values = [0, 0, 0, 0];
  const host = document.querySelector('#seals');
  const activate = document.querySelector('#activate');
  const reset = document.querySelector('#reset');
  const status = document.querySelector('#status');
  const buttons = [];
  let locked = false;
  let failureTimer;
  function paint(i) {
    const symbol = symbols[values[i]];
    buttons[i].textContent = symbol.glyph;
    buttons[i].setAttribute('aria-label', `${i + 1}. pecsét: ${symbol.name}. Érintsd meg a következő jelképhez.`);
    document.querySelector(`#name-${i}`).textContent = symbol.name;
  }
  for (let i = 0; i < 4; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'seal-wrap';
    const position = document.createElement('span');
    position.className = 'position';
    position.textContent = ['I', 'II', 'III', 'IV'][i];
    const button = document.createElement('button');
    button.className = 'seal';
    button.type = 'button';
    const name = document.createElement('span');
    name.className = 'seal-name';
    name.id = `name-${i}`;
    wrap.append(position, button, name);
    host.append(wrap);
    buttons.push(button);
    paint(i);
    button.addEventListener('click', () => {
      if (locked) return;
      clearTimeout(failureTimer);
      document.body.classList.remove('failure');
      status.textContent = 'A jelek mozdulnak. A kő figyel.';
      values[i] = (values[i] + 1) % symbols.length;
      paint(i);
      button.classList.remove('turning');
      void button.offsetWidth;
      button.classList.add('turning');
    });
  }
  function fulfillsOath(order) {
    if (new Set(order).size !== 4) return false;
    const [star, moon, sword, crown] = [0, 1, 2, 3].map(x => order.indexOf(x));
    return Math.abs(star - sword) === 2 &&
      Math.abs(moon - star) < Math.abs(moon - crown) && sword < crown &&
      moon !== 0 && moon !== 3 && Math.abs(sword - crown) < Math.abs(sword - star);
  }
  activate.addEventListener('click', () => {
    if (locked) return;
    clearTimeout(failureTimer);
    document.body.classList.remove('failure');
    if (fulfillsOath(values)) {
      locked = true;
      document.body.classList.add('success');
      buttons.forEach(button => { button.disabled = true; });
      activate.disabled = true;
      status.textContent = 'A négy pecsét felragyog. A titkos ajtó kitárul előtted.';
      reset.hidden = false;
    } else {
      void host.offsetWidth;
      document.body.classList.add('failure');
      status.textContent = 'Hideg suttogás fut át a kövön. Az eskü még nem teljes. Próbáld újra.';
      failureTimer = setTimeout(() => document.body.classList.remove('failure'), 1600);
    }
  });
  reset.addEventListener('click', () => {
    clearTimeout(failureTimer);
    document.body.classList.remove('success', 'failure');
    locked = false;
    values.fill(0);
    buttons.forEach((button, i) => { button.disabled = false; paint(i); });
    activate.disabled = false;
    reset.hidden = true;
    status.textContent = 'A kő csendben vár.';
    buttons[0].focus();
  });
})();
