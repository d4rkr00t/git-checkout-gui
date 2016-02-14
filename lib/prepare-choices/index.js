'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indent = indent;
exports.getLevel = getLevel;
exports.formatDirName = formatDirName;
exports.formatFileName = formatFileName;
exports.default = prepareChoices;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SYMBOL = '├── ';
var SYMBOL_LAST = '└── ';

/**
 * Indent string with spaces.
 *
 * @param {String} str
 * @param {Number} lvl
 *
 * @return {String}
 */
function indent(str, lvl) {
  if (lvl <= 0) return str;

  return new Array(lvl + 1).join(' ') + str;
}

/**
 * Calculates depth of given filepath.
 *
 * @param {String} filepath
 * @param {Object} groupedFiles
 *
 * @return {Number}
 */
function getLevel(filepath, groupedFiles) {
  var dirname = _path2.default.dirname(filepath);
  var level = 0;
  while (dirname !== '.') {
    if (groupedFiles[dirname]) {
      level += 1;
    }

    dirname = _path2.default.dirname(dirname);
  }

  return level;
}

/**
 * Formats directory name.
 *
 * @param {String} name
 * @param {Number} lvl
 * @param {Object} chalk
 *
 * @return {String}
 */
function formatDirName(name, lvl, chalk) {
  name = chalk.yellow(name + '/');

  return lvl ? '|' + indent(SYMBOL + name, lvl * 4 - 1) : SYMBOL + name;
}

/**
 * Formats file name.
 *
 * @param {String} name
 * @param {Number} lvl
 * @param {String} symbol
 *
 * @return {String}
 */
function formatFileName(name, lvl, symbol) {
  return lvl ? '|' + indent(symbol + name, lvl * 4 - 1) : symbol + name;
}

/**
 * Prepares choices for inquirer.
 *
 * @param {String[]} files
 * @param {Object} imports
 *
 * @return {Object[]}
 */
function prepareChoices(files, imports) {
  var chalk = imports.chalk;

  var groupedFiles = files.map(function (f) {
    return {
      name: f,
      dirname: _path2.default.dirname(f)
    };
  }).reduce(function (result, f) {
    result[f.dirname] = result[f.dirname] || [];
    result[f.dirname].push(f);

    return result;
  }, {});

  var sortedDirs = Object.keys(groupedFiles).sort(function (a, b) {
    var aDepth = a.split(_path2.default.sep).length - 1;
    var bDepth = b.split(_path2.default.sep).length - 1;

    if (a > b) {
      if (aDepth > bDepth) return -1;
      if (aDepth < bDepth) return 1;
    }

    if (a < b) {
      if (aDepth > bDepth) return 1;
      if (aDepth < bDepth) return -1;
    }

    return 0;
  });

  var levelOffset = sortedDirs.reduce(function (offset, dir) {
    var level = getLevel(dir, groupedFiles);
    if (level < offset) {
      return level;
    }

    return offset;
  }, 1000);

  return sortedDirs.reduce(function (result, item, groupIndex) {
    if (item !== '.') {
      result.push({
        dir: true,
        name: formatDirName(item, getLevel(item, groupedFiles) - levelOffset, chalk),
        value: item
      });
    }

    groupedFiles[item].forEach(function (f, index) {
      var lvl = getLevel(f.name, groupedFiles);
      var symbol = index === groupedFiles[item].length - 1 && (groupIndex > 0 || lvl > 0) ? SYMBOL_LAST : SYMBOL;

      result.push({
        dirname: f.dirname,
        name: formatFileName(f.name, lvl - levelOffset, symbol, chalk),
        value: f.name
      });
    });

    return result;
  }, []);
}