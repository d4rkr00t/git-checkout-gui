import test from 'ava';

import { indent } from '../../src/lib/prepare-choices';

test('should return str if level is 0', t => {
  t.is(indent('1', 0), '1');
});

test('should indent str if level is > 0', t => {
  t.is(indent('1', 4), '    1');
});
