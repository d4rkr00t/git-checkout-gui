'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gitSmartCheckout;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _dynamicCheckbox = require('./dynamic-checkbox');

var _dynamicCheckbox2 = _interopRequireDefault(_dynamicCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main function
 */
function gitSmartCheckout() {
  _inquirer2.default.registerPrompt('dynamic-checkbox', _dynamicCheckbox2.default);

  var choices = [{
    name: '/Users/sysoev/Development/temp/cli/index.js'
  }, new _inquirer2.default.Separator(), {
    name: '/Users/sysoev/Development/temp/cli/src/'
  }, {
    name: '/Users/sysoev/Development/temp/cli/src/file.js'
  }, {
    name: '/Users/sysoev/Development/temp/cli/src/file.js'
  }];

  var prompt = {
    type: 'dynamic-checkbox',
    message: 'Select toppings',
    name: 'toppings',
    choices: choices,
    onSelect: function onSelect(index) {
      choices[index].checked = !choices[index].checked;
      choices[3].disabled = !choices[3].disabled;
      choices[4].disabled = !choices[4].disabled;
      return choices;
    }
  };

  _inquirer2.default.prompt([prompt], function (answers) {
    console.log(answers); // eslint-disable-line
  });
}