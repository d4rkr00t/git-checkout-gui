import path from 'path';

const SYMBOL = '├── ';
const SYMBOL_LAST = '└── ';

export function indent(str, lvl) {
  return new Array(lvl + 1).join(' ') + str;
}

export function getLevel(filepath) {
  return filepath.split(path.sep).length - 1;
}

export function formatDirName(name, lvl, chalk) {
  name = chalk.yellow(name + '/');

  return lvl
    ? '|' + indent(SYMBOL + name, (lvl * 4) - 1)
    : SYMBOL + name;
}

export function formatFileName(name, lvl, symbol) {
  return lvl
    ? '|' + indent(symbol + name, (lvl * 4) - 1)
    : symbol + name;
}

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
    .sort((a, b) => a > b ? 1 : a < b ? -1 : 0) // eslint-disable-line

  const levelOffset = sortedDirs.reduce((offset, dir) => {
    const level = getLevel(dir);
    if (level < offset) {
      return level;
    }

    return offset;
  }, 1000);

  return sortedDirs.reduce((result, item, groupIndex) => {
    if (item !== '.') {
      result.push({
        dir: true,
        name: formatDirName(item, getLevel(item) - levelOffset, chalk),
        value: item
      });
    }

    groupedFiles[item].forEach((f, index) => {
      const lvl = getLevel(f.name, levelOffset);
      const symbol = (index === groupedFiles[item].length - 1 && groupIndex > 0)
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
