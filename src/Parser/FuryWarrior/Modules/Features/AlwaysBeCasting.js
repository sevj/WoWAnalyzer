import SPELLS from 'common/SPELLS';

import CoreAlwaysBeCasting from 'Parser/Core/Modules/AlwaysBeCasting';

class AlwaysBeCasting extends CoreAlwaysBeCasting {
  static ABILITIES_ON_GCD = [
    // Fury:
    SPELLS.BLOODTHIRST.id,
    SPELLS.RAGING_BLOW.id,
    SPELLS.FURIOUS_SLASH.id,
    SPELLS.RAMPAGE.id,
    SPELLS.EXECUTE.id,

    // Warrior:
    SPELLS.CHARGE.id,
    SPELLS.HEROIC_LEAP.id,
    SPELLS.COMMANDING_SHOUT.id,
    SPELLS.TAUNT.id,
    SPELLS.PUMMEL.id,

    // Items:
    225141, // http://www.wowhead.com/spell=225141/fel-crazed-rage (Draught of Souls)
  ];
}

export default AlwaysBeCasting;
