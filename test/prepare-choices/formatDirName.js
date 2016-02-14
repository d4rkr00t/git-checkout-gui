import test from 'ava';
import identity from 'lodash/identity';

import { formatDirName } from '../../src/lib/prepare-choices';

test('formatDirName', t => {
  t.is(formatDirName('name', 0, { yellow: identity }), '├── name/');
  t.is(formatDirName('name', 1, { yellow: identity }), '|   ├── name/');
});
