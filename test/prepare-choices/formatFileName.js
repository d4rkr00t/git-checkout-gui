import test from 'ava';

import { formatFileName } from '../../src/lib/prepare-choices';

test('formatFileName', t => {
  t.is(formatFileName('name', 0, '├── '), '├── name');
  t.is(formatFileName('name', 1, '├── '), '|   ├── name');
});
