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
    SPELLS.WHIRLWIND.id,

    // Warrior:
    SPELLS.CHARGE.id,
    SPELLS.HEROIC_LEAP.id,
    SPELLS.COMMANDING_SHOUT.id,
    SPELLS.TAUNT.id,
    SPELLS.PUMMEL.id,

    // Items:
    SPELLS.FELL_CRAZED_RAGE.id,
  ];
}

export default AlwaysBeCasting;
