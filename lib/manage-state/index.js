'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLevel = getLevel;
exports.isNotInside = isNotInside;
exports.default = manageState;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _findIndex = require('lodash/array/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _clone = require('lodash/lang/clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLevel(filepath) {
  return filepath.split(_path2.default.sep).length - 1;
}

function isNotInside(currentIndex, currentLevel, item, itemIndex, totalChoices) {
  return item.dir && getLevel(item.value) <= currentLevel && itemIndex > currentIndex || itemIndex === totalChoices;
}

function manageState(choices, choice, imports) {
  var chalk = imports.chalk;

  var index = (0, _findIndex2.default)(choices, function (c) {
    return c.value === choice.value;
  });
  var current = choice;
  var newChoices = (0, _clone2.default)(choices, true);

  newChoices[index].checked = !newChoices[index].checked;

  if (!current.dir) return newChoices;

  var currentLevel = undefined,
      currentIndex = undefined;
  return newChoices.map(function (item, idx) {
    var notInside = isNotInside(currentIndex, currentLevel, item, idx, choices.length);

    if (item.dir && item.checked && (notInside || !currentIndex)) {
      currentLevel = getLevel(item.value);
      currentIndex = idx;
    }

    if (currentIndex && currentIndex !== idx) {
      if (notInside) {
        currentIndex = null;
        currentLevel = null;
        item.disabled = false;
      } else {
        item.disabled = chalk.green('✓');
      }
    } else {
      item.disabled = false;
    }

    return item;
  });
}