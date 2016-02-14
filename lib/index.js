'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gitSmartCheckout;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _isEmpty = require('lodash/lang/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _proq = require('proq');

var _proq2 = _interopRequireDefault(_proq);

var _dynamicCheckbox = require('./dynamic-checkbox');

var _dynamicCheckbox2 = _interopRequireDefault(_dynamicCheckbox);

var _prepareChoices = require('./prepare-choices');

var _prepareChoices2 = _interopRequireDefault(_prepareChoices);

var _manageState = require('./manage-state');

var _manageState2 = _interopRequireDefault(_manageState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Git Smart checkout
 *
 * @param {String[]} files
 */
function gitSmartCheckout(files) {
  _inquirer2.default.registerPrompt('dynamic-checkbox', _dynamicCheckbox2.default);

  var choices = (0, _prepareChoices2.default)(files, { chalk: _chalk2.default });

  var prompt = {
    type: 'dynamic-checkbox',
    message: 'Select files to checkout',
    name: 'files',
    choices: choices,
    pageSize: 20,
    onSelect: function onSelect(index, choice) {
      choices = (0, _manageState2.default)(choices, choice, { chalk: _chalk2.default });
      return choices;
    }
  };

  _inquirer2.default.prompt([prompt], function (answers) {
    console.log(); // eslint-disable-line

    if ((0, _isEmpty2.default)(answers.files)) {
      console.log(_chalk2.default.red('Exit. You didn\'t choose anything!')); // eslint-disable-line
    } else {
        (function () {
          var promiseList = [];

          answers.files.forEach(function (file) {
            console.log(_chalk2.default.yellow('Checkout: ' + file)); // eslint-disable-line

            promiseList.push(function () {
              return new Promise(function (resolve) {
                var cp = _child_process2.default.spawn('git', ['checkout', file]);

                cp.stderr.on('data', function (data) {
                  console.log(_chalk2.default.red(data)); // eslint-disable-line
                });

                cp.on('exit', resolve);
              });
            });
          });

          (0, _proq2.default)(promiseList).then(function () {
            console.log(); // eslint-disable-line
            console.log(_chalk2.default.green('Done!')); // eslint-disable-line
            console.log(); // eslint-disable-line
          });
        })();
      }
  });
}