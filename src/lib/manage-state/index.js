import path from 'path';
import findIndex from 'lodash/array/findIndex';
import clone from 'lodash/lang/clone';

export function getLevel(filepath) {
  return filepath.split(path.sep).length - 1;
}

export function isNotInside(currentIndex, currentLevel, item, itemIndex, totalChoices) {
  return (item.dir && getLevel(item.value) <= currentLevel && itemIndex > currentIndex)
    || itemIndex === totalChoices;
}

export default function manageState(choices, choice, imports) {
  const { chalk } = imports;
  const index = findIndex(choices, (c) => c.value === choice.value);
  const current = choice;
  const newChoices = clone(choices, true);

  newChoices[index].checked = !newChoices[index].checked;

  if (!current.dir) return newChoices;

  let currentLevel, currentIndex;
  return newChoices.map((item, idx) => {
    const notInside = isNotInside(currentIndex, currentLevel, item, idx, choices.length);

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
