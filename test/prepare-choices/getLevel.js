import test from 'ava';

import { getLevel } from '../../src/lib/prepare-choices';

const groupedFiles = {
  '.': [{
    name: 'README.md',
    dirname: '.'
  }],
  lib: [{
    name: 'lib/index.js',
    dirname: 'lib'
  }],
  'lib/prepare-choices': [{
    name: 'lib/prepare-choices/index.js',
    dirname: 'lib/prepare-choices'
  }],
  'src/lib/prepare-choices': [{
    name: 'src/lib/prepare-choices/index.js',
    dirname: 'src/lib/prepare-choices'
  }]
};

const files = [
  'README.md',
  'lib/',
  'lib/index.js',
  'lib/prepare-choices/',
  'lib/prepare-choices/index.js',
  'src/lib/prepare-choices/index.js'
];

const levels = [
  0,
  0,
  1,
  1,
  2,
  1
];

test('getLevel', t => {
  files.forEach((file, index) => {
    t.is(getLevel(file, groupedFiles), levels[index]);
  });
});
