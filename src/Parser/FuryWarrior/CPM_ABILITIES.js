import SPELLS from 'common/SPELLS';

export const SPELL_CATEGORY = {
  ROTATIONAL: 'Spell',
  COOLDOWNS: 'Cooldown',
};

const CPM_ABILITIES = [
  {
    spell: SPELLS.BLOODTHIRST,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => 4.5 / (1 + haste),
  },
  {
    spell: SPELLS.RAGING_BLOW,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: (haste, combatant) => 4.5 / (1 + haste),
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
    spell: SPELLS.FELL_CRAZED_RAGE,
    category: SPELL_CATEGORY.ROTATIONAL,
    getCooldown: haste => 120,
  },
  {
    spell: SPELLS.BATTLE_CRY,
    category: SPELL_CATEGORY.COOLDOWNS,
    getCooldown: haste => 50,
  },
];

export default CPM_ABILITIES;
