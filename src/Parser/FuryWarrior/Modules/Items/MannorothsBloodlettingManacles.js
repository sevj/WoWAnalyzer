import Module from 'Parser/Core/Module';
import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';


class MannorothsBloodlettingManacles extends Module {
  healing = 0;

  on_initialized() {
    if (!this.owner.error) {
      this.active = this.owner.selectedCombatant.hasWrists(ITEMS.MANNOROTHS_BLOODLETTING_MANACLES.id);
    }
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.MANNOROTHS_BLOODLETTING_MANACLES.id) {
      this.healing += event.amount;
    }
  }
}

export default MannorothsBloodlettingManacles;
