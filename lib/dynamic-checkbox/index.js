'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _checkbox = require('inquirer/lib/prompts/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _choices = require('inquirer/lib/objects/choices');

var _choices2 = _interopRequireDefault(_choices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DynamicCheckbox Prompt for inquirer.
 */
function DynamicCheckbox() {
  _checkbox2.default.apply(this, arguments);
}

_util2.default.inherits(DynamicCheckbox, _checkbox2.default);

/**
 * Hanlder for selecting item.
 */
DynamicCheckbox.prototype.onSpaceKey = function () {
  if (this.opt.onSelect) {
    this.opt.choices = new _choices2.default(this.opt.onSelect(this.pointer, this.opt.choices.getChoice(this.pointer)), {});
  } else {
    this.toggleChoice(this.pointer);
  }

  this.render();
};

exports.default = DynamicCheckbox;