import React from 'react';

import SPECS from 'common/SPECS';

import PatreonLink from 'Main/PatreonLink';

import CombatLogParser from './CombatLogParser';

export default {
  spec: SPECS.FURY_WARRIOR,
  parser: CombatLogParser,
  maintainer: '@Sevj',
  footer: (
    <div>
      Please consider donating to help out further development.<br />
      <PatreonLink />
    </div>
  ),
};
