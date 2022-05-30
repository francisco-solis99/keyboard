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
    ['Mayus', 'Mayus'], ['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'],
    ['k', 'K'], ['l', 'L'], [';', ':'], ["'", '"']
  ],
  [
    ['SHIFT', 'shift'], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'],
    [',', '<'], ['.', '>']
  ]
];

const keysHtml = keyBoardKeys.map(row => {
  return `
    <div class="keyboard__row">
      ${row.map(key => `
        <div class="keyboard__key" data-key="${key}">
          ${key[0]}
        </div>
      `).join('')}
    </div>
  `;
});

keyBoardWrapper.innerHTML = keysHtml.join('');

input.addEventListener('keydown', (e) => {
  const keyPressed = e.key;
  const keyboardKey = keyBoardWrapper.querySelector('[data-key]');
});
