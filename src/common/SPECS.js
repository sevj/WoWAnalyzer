import indexById from './indexById';

const SPECS = {
  ARCANE_MAGE: { id: 62, className: 'Mage', specName: 'Arcane', },
  FIRE_MAGE: { id: 63, className: 'Mage', specName: 'Fire', },
  FROST_MAGE: { id: 64, className: 'Mage', specName: 'Frost', },
  HOLY_PALADIN: { id: 65, className: 'Paladin', specName: 'Holy', },
  PROTECTION_PALADIN: { id: 66, className: 'Paladin', specName: 'Protection', },
  RETRIBUTION_PALADIN: { id: 70, className: 'Paladin', specName: 'Retribution', },
  ARMS_WARRIOR: { id: 71, className: 'Warrior', specName: 'Arms', },
  FURY_WARRIOR: { id: 72, className: 'Warrior', specName: 'Fury', },
  PROTECTION_WARRIOR: { id: 73, className: 'Warrior', specName: 'Protection', },
  BALANCE_DRUID: { id: 102, className: 'Druid', specName: 'Balance', },
  FERAL_DRUID: { id: 103, className: 'Druid', specName: 'Feral', },
  GUARDIAN_DRUID: { id: 104, className: 'Druid', specName: 'Guardian', },
  RESTORATION_DRUID: { id: 105, className: 'Druid', specName: 'Restoration', },
  BLOOD_DEATH_KNIGHT: { id: 250, className: 'Death Knight', specName: 'Blood', },
  FROST_DEATH_KNIGHT: { id: 251, className: 'Death Knight', specName: 'Frost', },
  UNHOLY_DEATH_KNIGHT: { id: 252, className: 'Death Knight', specName: 'Unholy', },
  BEAST_MASTERY_HUNTER: { id: 253, className: 'Hunter', specName: 'Beast Mastery', },
  MARKSMANSHIP_HUNTER: { id: 254, className: 'Hunter', specName: 'Marksmanship', },
  SURVIVAL_HUNTER: { id: 255, className: 'Hunter', specName: 'Survival', },
  DISCIPLINE_PRIEST: { id: 256, className: 'Priest', specName: 'Discipline', },
  HOLY_PRIEST: { id: 257, className: 'Priest', specName: 'Holy', },
  SHADOW_PRIEST: { id: 258, className: 'Priest', specName: 'Shadow', },
  ASSASSINATION_ROGUE: { id: 259, className: 'Rogue', specName: 'Assassination', },
  OUTLAW_ROGUE: { id: 260, className: 'Rogue', specName: 'Outlaw', },
  SUBTLETY_ROGUE: { id: 261, className: 'Rogue', specName: 'Subtlety', },
  ELEMENTAL_SHAMAN: { id: 262, className: 'Shaman', specName: 'Elemental', },
  ENHANCEMENT_SHAMAN: { id: 263, className: 'Shaman', specName: 'Enhancement', },
  RESTORATION_SHAMAN: { id: 264, className: 'Shaman', specName: 'Restoration', },
  AFFLICATION_WARLOCK: { id: 265, className: 'Warlock', specName: 'Affliction', },
  DEMONOLOGY_WARLOCK: { id: 266, className: 'Warlock', specName: 'Demonology', },
  DESTRUCTION_WARLOCK: { id: 267, className: 'Warlock', specName: 'Destruction', },
  BREWMASTER_MONK: { id: 268, className: 'Monk', specName: 'Brewmaster', },
  WINDWALKER_MONK: { id: 269, className: 'Monk', specName: 'Windwalker', },
  MISTWEAVER_MONK: { id: 270, className: 'Monk', specName: 'Mistweaver', },
  HAVOC_DEMON_HUNTER: { id: 577, className: 'Demon Hunter', specName: 'Havoc', },
  VENGEANCE_DEMON_HUNTER: { id: 581, className: 'Demon Hunter', specName: 'Vengeance', },
};

export default indexById(SPECS);
