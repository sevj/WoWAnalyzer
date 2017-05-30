import Module from 'Parser/Core/Module';
import SPELLS from 'common/SPELLS';

const debug = true;

class RampageCheck extends Module {
  countOk = 0;
  countNotOk = 0;
  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (SPELLS.RAMPAGE_BASE.id !== spellId) {
      return;
    }
    console.log(event)
  }
}

export default RampageCheck;
