import indexById from './indexById';

import others from './SPELLS_OTHERS';
import racials from './SPELLS_RACIALS';

import paladin from './SPELLS_PALADIN';
import priest from './SPELLS_PRIEST';
import druid from './SPELLS_DRUID';
import monk from './SPELLS_MONK';
import shaman from './SPELLS_SHAMAN';
import warrior from './SPELLS_WARRIOR';

const ABILITIES = {
  ...others,
  ...racials,
  ...paladin,
  ...priest,
  ...druid,
  ...monk,
  ...shaman,
  ...warrior,
};

export default indexById(ABILITIES);
