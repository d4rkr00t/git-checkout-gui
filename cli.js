#! /usr/bin/env node
'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _compact = require('lodash/array/compact');

var _compact2 = _interopRequireDefault(_compact);

var _isEmpty = require('lodash/lang/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _lib = require('./lib/');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var files = (0, _compact2.default)(_child_process2.default.execSync('git status --porcelain -uno | sed s/^...//', { encoding: 'utf-8' }).split('\n'));

if ((0, _isEmpty2.default)(files)) {
  console.log(_chalk2.default.red('There is nothing to checkout.')); // eslint-disable-line
} else {
    (0, _lib2.default)(files);
  }