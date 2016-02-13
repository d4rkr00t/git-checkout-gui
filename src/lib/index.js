import inquirer from 'inquirer';

import DynamicCheckbox from './dynamic-checkbox';

/**
 * Main function
 */
export default function gitSmartCheckout() {
  inquirer.registerPrompt('dynamic-checkbox', DynamicCheckbox);

  const choices = [
    {
      name: '/Users/sysoev/Development/temp/cli/index.js'
    },
    new inquirer.Separator(),
    {
      name: '/Users/sysoev/Development/temp/cli/src/'
    },
    {
      name: '/Users/sysoev/Development/temp/cli/src/file.js'
    },
    {
      name: '/Users/sysoev/Development/temp/cli/src/file.js'
    }
  ];

  const prompt = {
    type: 'dynamic-checkbox',
    message: 'Select toppings',
    name: 'toppings',
    choices: choices,
    onSelect(index) {
      choices[index].checked = !choices[index].checked;
      choices[3].disabled = !choices[3].disabled;
      choices[4].disabled = !choices[4].disabled;
      return choices;
    }
  };

  inquirer.prompt([prompt], function (answers) {
    console.log(answers); // eslint-disable-line
  });
}
