import test from 'ava';
import identity from 'lodash/utility/identity';

import prepareChoices from '../../src/lib/prepare-choices';

const inputs = [
  [
    'bin/git/git-smart-checkout',
    'link/.gitconfig'
  ],
  [
    'README.md',
    'lib/prepare-choices/index.js',
    'src/lib/prepare-choices/index.js'
  ]
];

const outputs = [

  `├── link/
|   └── link/.gitconfig
├── bin/git/
|   └── bin/git/git-smart-checkout`,

  `├── README.md
├── lib/prepare-choices/
|   └── lib/prepare-choices/index.js
├── src/lib/prepare-choices/
|   └── src/lib/prepare-choices/index.js`

];

function getChoices(input) {
  return prepareChoices(input, { chalk: { yellow: identity } })
    .reduce((result, choice) => {
      if (result) result += '\n';
      result += choice.name;

      return result;
    }, '');
}

test('prepareChoices', t => {
  inputs.forEach((input, index) => {
    t.is(getChoices(input), outputs[index]);
  });
});
