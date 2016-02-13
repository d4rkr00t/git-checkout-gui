import util from 'util';
import Checkbox from 'inquirer/lib/prompts/checkbox';
import Choices from 'inquirer/lib/objects/choices';

function DynamicCheckbox() {
  Checkbox.apply(this, arguments);
}

util.inherits(DynamicCheckbox, Checkbox);

DynamicCheckbox.prototype.onSpaceKey = function () {
  if (this.opt.onSelect) {
    this.opt.choices = new Choices(this.opt.onSelect(this.pointer, this.opt.choices.getChoice(this.pointer)), {});
  } else {
    this.toggleChoice(this.pointer);
  }

  this.render();
};

export default DynamicCheckbox;
