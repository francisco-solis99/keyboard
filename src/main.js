const keyBoardWrapper = document.querySelector('.keyboard');
const input = document.querySelector('.input');

const keyBoardKeys = [
  [
    ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'],
    ['8', '*'], ['9', '('], ['0', ')'], ['_', '+']
  ],
  [
    ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'],
    ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}']
  ],
  [
    ['Mayus', 'CapsLock'], ['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'],
    ['k', 'K'], ['l', 'L'], [';', ':'], ['\'', '"']
  ],
  [
    ['Shift', 'Shift'], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'],
    [',', '<'], ['.', '>']
  ],
  [['SPACE', 'SPACE']]
];

const keyTypes = {
  letter: '[a-zA-Z]',
  number: '[0-9]',
  symbol: '[^a-zA-Z0-9]'
};

const keysHtml = keyBoardKeys.map(row => {
  return `
    <div class="keyboard__row">
      ${row.map(key => {
        if (key[0] === 'SPACE') {
          return `
          <div class="keyboard__key keyboard__space" data-key=" "></div>
        `;
        }

        let typeKey = '';
        for (const [type, stringRegex] of Object.entries(keyTypes)) {
          const regex = new RegExp(stringRegex);
          if (regex.test(key[0]) && key[0].length === 1) {
            typeKey = type;
            break;
          }
        }
        typeKey = typeKey || 'modifier';
        if (typeKey === 'modifier') {
          return `
            <div class="keyboard__key keyboard__${key[0].toLowerCase()}" data-type="${typeKey}" data-key="${key[0]} ${key[1]}">
              ${key[0]}
            </div>
          `;
        }
        return `
          <div class="keyboard__key" data-key="${key[0]}${key[1]}" data-type="${typeKey}">
            ${key[0]}
          </div>`;
      }).join('')}
    </div>
  `;
});

keyBoardWrapper.innerHTML = keysHtml.join('');

const modifiers = {
  CapsLock: {
    keyAction: pressMayus,
    keep: true
  },
  Shift: {
    keyAction: pressShift,
    keep: true
  }
};

input.addEventListener('keydown', (e) => {
  const keyPressed = e.key;
  console.log(e.key);

  if (Object.keys(modifiers).includes(keyPressed)) {
    const keyModifier = document.querySelector(`.keyboard__key[data-key$="${keyPressed}"]`);
    pressKey(keyModifier, modifiers[keyPressed].keep);
    modifiers[keyPressed].keyAction(keyModifier);
    return;
  }
  const keyboardKey = keyBoardWrapper.querySelector(`.keyboard__key[data-key*="${keyPressed}"]:not([data-type="modifier"])`);
  if (keyboardKey) {
    pressKey(keyboardKey, false);
    evalShift();
  }
});

function pressKey (key, keep = false) {
  if (keep) {
    key.classList.toggle('is-pressed-keep');
    return;
  }
  setTimeout(() => {
    key.classList.add('is-pressed');
    setTimeout(() => {
      key.classList.remove('is-pressed');
    }, 150);
  }, 150);
}

function pressMayus (mayusKey) {
  const lettersKeys = document.querySelectorAll('.keyboard__key[data-type="letter"]');
  lettersKeys.forEach(key => {
    const [lowerCase, upperCase] = key.dataset.key.split('');
    mayusKey.classList.contains('is-pressed-keep') ? key.textContent = upperCase : key.textContent = lowerCase;
  });
}

function pressShift (shiftKey) {
  const shiftKeys = document.querySelectorAll('.keyboard__key[data-type="number"], .keyboard__key[data-type="symbol"]');
  shiftKeys.forEach(key => {
    const [noShift, withShift] = key.dataset.key.split('');
    shiftKey.classList.contains('is-pressed-keep') ? key.textContent = withShift : key.textContent = noShift;
  });
}

keyBoardWrapper.addEventListener('click', (e) => {
  if (!e.target.classList.contains('keyboard__key')) return;
  const currentKey = e.target;
  if (currentKey.dataset.type === 'modifier') {
    currentKey.classList.toggle('is-pressed-keep');
    const modifier = currentKey.dataset.key.split(' ')[1];
    modifiers[modifier].keyAction(currentKey);
    return;
  }

  input.value += currentKey.textContent.trim();
  if (currentKey.dataset.key === 'SPACE') {
    input.value += ' ';
  }
  evalShift();
});

function evalShift () {
  const shiftKey = keyBoardWrapper.querySelector('.keyboard__shift');
  if (shiftKey.classList.contains('is-pressed-keep')) {
    shiftKey.classList.remove('is-pressed-keep');
    pressShift(shiftKey);
  }
}
