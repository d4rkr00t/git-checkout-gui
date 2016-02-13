import util from 'util';
import Checkbox from 'inquirer/lib/prompts/checkbox';
import Choices from 'inquirer/lib/objects/choices';

/**
 * DynamicCheckbox Prompt for inquirer.
 */
function DynamicCheckbox() {
  Checkbox.apply(this, arguments);
}

util.inherits(DynamicCheckbox, Checkbox);

/**
 * Hanlder for selecting item.
 */
DynamicCheckbox.prototype.onSpaceKey = function () {
  if (this.opt.onSelect) {
    this.opt.choices = new Choices(this.opt.onSelect(this.pointer, this.opt.choices.getChoice(this.pointer)), {});
  } else {
    this.toggleChoice(this.pointer);
  }

  this.render();
};

export default DynamicCheckbox;
