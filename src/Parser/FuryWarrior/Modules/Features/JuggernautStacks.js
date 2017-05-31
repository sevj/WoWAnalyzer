import Module from 'Parser/Core/Module';
import SPELLS from 'common/SPELLS';

const debug = false;

class JuggernautStacks extends Module {
	count = 0;
	maxCount = 0;

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (SPELLS.JUGGERNAUT_BUFF.id !== spellId) {
      return;
    }
		this.count = 1	
  }

  on_byPlayer_applybuffstack(event) {
  	const spellId = event.ability.guid;
    if (SPELLS.JUGGERNAUT_BUFF.id !== spellId) {
      return;
    }
    this.count++;
    if (this.count > this.maxCount) {
    	this.maxCount = this.count;
    }
  }
}

export default JuggernautStacks;
