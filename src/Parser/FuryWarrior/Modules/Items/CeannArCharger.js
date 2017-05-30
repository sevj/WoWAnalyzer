import Module from 'Parser/Core/Module';
import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';


class CeannArCharger extends Module {
  rage = 0;

  on_initialized() {
    if (!this.owner.error) {
      this.active = this.owner.selectedCombatant.hasHead(ITEMS.CEANNAR_CHARGER.id);
    }
  }

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (SPELLS.ENRAGE_BUFF.id !== spellId) {
      return;
    }
    this.rage += 8;
  }
}

export default CeannArCharger;
