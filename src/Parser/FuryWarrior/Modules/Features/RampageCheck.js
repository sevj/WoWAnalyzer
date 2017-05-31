import Module from 'Parser/Core/Module';
import SPELLS from 'common/SPELLS';

const debug = false;

class RampageCheck extends Module {
  count = 0;
  on_byPlayer_damage(event) {
    /*
    const spellId = event.ability.guid;
    const hasBuff = this.owner.selectedCombatant.hasBuff(SPELLS.FROTHING_BERSERKER_BUFF.id, event.timestamp);
    if (SPELLS.RAMPAGE_BASE.id !== spellId) {
      return;
    }

    if (!hasBuff) {
      this.count++;
    }*/
  }
}

export default RampageCheck;
