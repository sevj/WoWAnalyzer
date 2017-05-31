import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';

import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

export const SPELL_CATEGORY = {
  ROTATIONAL: 'Spell',
  COOLDOWNS: 'Cooldown',
};

const CPM_ABILITIES = [
  {
    spell: SPELLS.BLOODTHIRST,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => 4.5 / (1 + haste),
    recommendedCastEfficiency: 0.8,
  },
  {
    spell: SPELLS.RAGING_BLOW,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: (haste, combatant) => 4.5 / (1 + haste),
    recommendedCastEfficiency: 0.7,
  },
  {
    spell: SPELLS.FURIOUS_SLASH,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => null,
  },
  {
    spell: SPELLS.RAMPAGE,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => null,
  },
  {
    spell: SPELLS.ODYNS_FURY,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => 45,
  },
  {
    spell: SPELLS.EXECUTE,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => null,
  },
  {
    spell: SPELLS.WHIRLWIND,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => null,
  },
  {
    spell: SPELLS.FELL_CRAZED_RAGE,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => 90,
  },
  {
    spell: SPELLS.BATTLE_CRY,
    category: SPELL_CATEGORY.COOLDOWNS,
    getCooldown: (haste, combatant) => combatant.hasTrinket(ITEMS.CONVERGENCE_OF_FATES.id) ? 50 - (5 * 3.3) : 50,
  },
  {
    spell: SPELLS.AVATAR_TALENT,
    category: SPELL_CATEGORY.COOLDOWNS,
    getCooldown: haste => 90
  },
];

export default CPM_ABILITIES;
