import test from 'ava';
import identity from 'lodash/identity';

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
  ],
  [
    '.gitignore',
    'README.md',
    'package.json',
    'src/cli.js',
    'src/lib/index.js',
    'test/index.js'
  ],
  [
    'cli.js',
    'lib/index.js',
    'lib/manage-state/index.js',
    'src/cli.js',
    'src/lib/index.js',
    'src/lib/manage-state/index.js',
    'test/prepare-choices/formatDirName.js',
    'test/prepare-choices/prepareChoices.js'
  ]
];

const outputs = [

  `├── bin/git/
|   └── bin/git/git-smart-checkout
├── link/
|   └── link/.gitconfig`,

  `├── README.md
├── lib/prepare-choices/
|   └── lib/prepare-choices/index.js
├── src/lib/prepare-choices/
|   └── src/lib/prepare-choices/index.js`,

  `├── .gitignore
├── README.md
├── package.json
├── src/
|   └── src/cli.js
|   ├── src/lib/
|       └── src/lib/index.js
├── test/
|   └── test/index.js`,

  `├── cli.js
├── lib/
|   └── lib/index.js
|   ├── lib/manage-state/
|       └── lib/manage-state/index.js
├── src/
|   └── src/cli.js
|   ├── src/lib/
|       └── src/lib/index.js
|       ├── src/lib/manage-state/
|           └── src/lib/manage-state/index.js
├── test/prepare-choices/
|   ├── test/prepare-choices/formatDirName.js
|   └── test/prepare-choices/prepareChoices.js`

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
