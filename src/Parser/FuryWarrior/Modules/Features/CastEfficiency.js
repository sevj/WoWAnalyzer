import Module from 'Parser/Core/Module';
import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

const debug = false;

class CastEfficiency extends Module {
  errors: null;
  lastUsedSpells: null;

  on_initialized() {
    if (this.lastUsedSpells == null) {
      this.lastUsedSpells = {};
    }

    if (this.errors == null) {
      this.errors = {};
       /* rb_bt: {
          issue: 'Wrong priority Raging Blow / Bloodthirst when not enraged',
          icon: SPELLS.BLOODTHIRST.icon,
          importance: ISSUE_IMPORTANCE.MINOR,
          count: 0,
        },
        rampage: {
          issue: 'Rampage used at minus 100 rage',
          icon: SPELLS.RAMPAGE.icon,
          importance: ISSUE_IMPORTANCE.MAJOR,
          count: 0,
        },
        of: {
          issue: 'Odyn\'s Fury used when not under Battle Cry',
          icon: SPELLS.ODYNS_FURY.icon,
          importance: ISSUE_IMPORTANCE.MAJOR,
          count: 0,
        },
        juggernaut: {
          issue: 'Loosing Juggernaut Buff',
          icon: SPELLS.JUGGERNAUT_BUFF.icon,
          importance: ISSUE_IMPORTANCE.MINOR,
          count: 0,
        },
        rb_exec: {
          issue: 'Raging Blow in execute phase must be avoided',
          icon: SPELLS.RAGING_BLOW.icon,
          importance: ISSUE_IMPORTANCE.MINOR,
          count: 0,
        },
        trinket_efficiency: {
          title: 'Trinket usage',
          desc: 'See below',
          values: []
        },
        back_buff: {
          issue: 'Loosing Stacks',
          icon: SPELLS.FUJIEDAS_FURY_BUFF.icon,
          importance: ISSUE_IMPORTANCE.MAJOR,
          count: 0,
        },
      };*/
    }
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;

    if (event.hitType === 0) {
      return;
    }

    // Target HP
    const targetHp = Math.floor(event.hitPoints / event.maxHitPoints  * 100);
    if (targetHp >= 20) {
      // rb_bt
      /*if (SPELLS.RAGING_BLOW.id == spellId) {
        if (this.constructor.isOnCd(SPELLS.BLOODTHIRST.id)) {

        }
      }*/
      // rampage <100 rage
      if (SPELLS.RAMPAGE.dmg_id === spellId) {
        const hasBuff = this.owner.selectedCombatant.hasBuff(SPELLS.FROTHING_BERSERKER_BUFF.id, event.timestamp);
        if (!hasBuff) {
          if (!this.errors[0]) {
            this.errors[0] = {
              issue: 'Rampage used at minus 100 rage',
              icon: SPELLS.RAMPAGE.icon,
              importance: ISSUE_IMPORTANCE.MAJOR,
              count: 0,
            };
          }
          this.errors[0].count++;
        }
      }
    }
    // Exec
    else {
      // RB HP >20%
      if (SPELLS.RAGING_BLOW.dmg_id === spellId) {
        if (!this.errors[1]) {
          this.errors[1] = {
            issue: 'Raging Blow in execute phase must be avoided',
            icon: SPELLS.RAGING_BLOW.icon,
            importance: ISSUE_IMPORTANCE.MINOR,
            count: 0,
          };
        }
        this.errors[1].count++;
        //this.errors.rb_exec.count++;
      }
    }
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    const timestamp = event.timestamp;
    this.lastUsedSpells[spellId] = timestamp;

    // OF
    if (SPELLS.ODYNS_FURY.dmg_id === spellId) {
      const hasBuff = this.owner.selectedCombatant.hasBuff(SPELLS.BATTLE_CRY_BUFF.id, event.timestamp);
      if (!hasBuff) {
        if (!this.errors[2]) {
          this.errors[2] = {
            issue: 'Odyn\'s Fury used when not under Battle Cry',
            icon: SPELLS.ODYNS_FURY.icon,
            importance: ISSUE_IMPORTANCE.MAJOR,
            count: 0,
          };
        }
        this.errors[2].count++;
        //this.errors.of.count++;
      }
    }
  }

  on_byPlayer_removebuff(event) {
    const spellId = event.ability.guid;

    if (this.owner.selectedCombatant.hasBack(ITEMS.FUJIEDAS_FURY.id) && SPELLS.FUJIEDAS_FURY_BUFF.id === spellId) {
      //this.errors.back_buff.count++;
      if (!this.errors[3]) {
        this.errors[3] = {
          issue: 'Loosing Stacks',
          icon: SPELLS.FUJIEDAS_FURY_BUFF.icon,
          importance: ISSUE_IMPORTANCE.MAJOR,
          count: 0,
        };
      }
      this.errors[3].count++;
    }

    if (SPELLS.JUGGERNAUT_BUFF.id === spellId) {
      //this.errors.juggernaut.count++;
      if (!this.errors[4]) {
        this.errors[4] = {
          issue: 'Loosing Juggernaut Buff',
          icon: SPELLS.JUGGERNAUT_BUFF.icon,
          importance: ISSUE_IMPORTANCE.MINOR,
          count: 0,
        };
      }
      this.errors[4].count++;
    }
  }
}

export default CastEfficiency;


/*
- check cycle errors
  - RB > BT when !enrage
  - rampage >100 rage
  - OF !BC
  - cape buff loose
  - stack loose exec

  - RB HP >20%
  //- Exec <20%, BT on CD, rage >25
  - FCR efficiency
*/