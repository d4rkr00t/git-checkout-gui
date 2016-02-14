import path from 'path';

const SYMBOL = '├── ';
const SYMBOL_LAST = '└── ';

/**
 * Indent string with spaces.
 *
 * @param {String} str
 * @param {Number} lvl
 *
 * @return {String}
 */
export function indent(str, lvl) {
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
export function getLevel(filepath, groupedFiles) {
  let dirname = path.dirname(filepath);
  let level = 0;
  while (dirname !== '.') {
    if (groupedFiles[dirname]) {
      level += 1;
    }

    dirname = path.dirname(dirname);
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
export function formatDirName(name, lvl, chalk) {
  name = chalk.yellow(name + '/');

  return lvl
    ? '|' + indent(SYMBOL + name, (lvl * 4) - 1)
    : SYMBOL + name;
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
export function formatFileName(name, lvl, symbol) {
  return lvl
    ? '|' + indent(symbol + name, (lvl * 4) - 1)
    : symbol + name;
}

/**
 * Prepares choices for inquirer.
 *
 * @param {String[]} files
 * @param {Object} imports
 *
 * @return {Object[]}
 */
export default function prepareChoices(files, imports) {
  const { chalk } = imports;
  const groupedFiles = files
  .map(f => ({
    name: f,
    dirname: path.dirname(f)
  }))
  .reduce((result, f) => {
    result[f.dirname] = result[f.dirname] || [];
    result[f.dirname].push(f);

    return result;
  }, {});

  const sortedDirs = Object
    .keys(groupedFiles)
    .sort((a, b) => {
      const aDepth = a.split(path.sep).length - 1;
      const bDepth = b.split(path.sep).length - 1;

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

  const levelOffset = sortedDirs.reduce((offset, dir) => {
    const level = getLevel(dir, groupedFiles);
    if (level < offset) {
      return level;
    }

    return offset;
  }, 1000);

  return sortedDirs.reduce((result, item, groupIndex) => {
    if (item !== '.') {
      result.push({
        dir: true,
        name: formatDirName(item, getLevel(item, groupedFiles) - levelOffset, chalk),
        value: item
      });
    }

    groupedFiles[item].forEach((f, index) => {
      const lvl = getLevel(f.name, groupedFiles);
      const symbol = (index === groupedFiles[item].length - 1 && (groupIndex > 0 || lvl > 0))
        ? SYMBOL_LAST
        : SYMBOL;

      result.push({
        dirname: f.dirname,
        name: formatFileName(f.name, lvl - levelOffset, symbol, chalk),
        value: f.name
      });
    });

    return result;
  }, []);
}
