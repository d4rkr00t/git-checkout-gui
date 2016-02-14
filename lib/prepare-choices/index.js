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

function indent(str, lvl) {
  return new Array(lvl + 1).join(' ') + str;
}

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
  // return filepath.split(path.sep).length - 1;
}

function formatDirName(name, lvl, chalk) {
  name = chalk.yellow(name + '/');

  return lvl ? '|' + indent(SYMBOL + name, lvl * 4 - 1) : SYMBOL + name;
}

function formatFileName(name, lvl, symbol) {
  return lvl ? '|' + indent(symbol + name, lvl * 4 - 1) : symbol + name;
}

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
    return a > b ? 1 : a < b ? -1 : 0;
  }); // eslint-disable-line

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
      var symbol = index === groupedFiles[item].length - 1 && groupIndex > 0 ? SYMBOL_LAST : SYMBOL;

      result.push({
        dirname: f.dirname,
        name: formatFileName(f.name, lvl - levelOffset, symbol, chalk),
        value: f.name
      });
    });

    return result;
  }, []);
}