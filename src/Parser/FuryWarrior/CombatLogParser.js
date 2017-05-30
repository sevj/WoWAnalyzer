import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import Icon from 'common/Icon';
import ITEMS from 'common/ITEMS';
import ItemLink from 'common/ItemLink';
import ItemIcon from 'common/ItemIcon';

import StatisticBox from 'Main/StatisticBox';
import SuggestionsTab from 'Main/SuggestionsTab';
import TalentsTab from 'Main/TalentsTab';
import CastEfficiencyTab from 'Main/CastEfficiencyTab';
import CooldownsTab from 'Main/CooldownsTab';

import MainCombatLogParser from 'Parser/Core/CombatLogParser';
import ParseResults from 'Parser/Core/ParseResults';
import getCastEfficiency from 'Parser/Core/getCastEfficiency';
import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';
import Prydaz from 'Parser/Core/Modules/Items/Prydaz';
import CooldownTracker from './Modules/Features/CooldownTracker';

import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import RampageCheck from './Modules/Features/RampageCheck';
import CeannArCharger from './Modules/Items/CeannArCharger';
import MannorothsBloodlettingManacles from './Modules/Items/MannorothsBloodlettingManacles';



import CPM_ABILITIES, { SPELL_CATEGORY } from './CPM_ABILITIES';

function formatThousands(number) {
  return (Math.round(number || 0) + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatNumber(number) {
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(2)}m`;
  }
  if (number > 10000) {
    return `${Math.round(number / 1000)}k`;
  }
  return formatThousands(number);
}
function getIssueImportance(value, regular, major, higherIsWorse = false) {
  if (higherIsWorse ? value > major : value < major) {
    return ISSUE_IMPORTANCE.MAJOR;
  }
  if (higherIsWorse ? value > regular : value < regular) {
    return ISSUE_IMPORTANCE.REGULAR;
  }
  return ISSUE_IMPORTANCE.MINOR;
}
function formatPercentage(percentage) {
  return (Math.round((percentage || 0) * 10000) / 100).toFixed(2);
}

class CombatLogParser extends MainCombatLogParser {
  static specModules = {
    // Features
    alwaysBeCasting: AlwaysBeCasting,
    rampageCheck: RampageCheck,
    cooldownTracker: CooldownTracker,

    // Legendaries:
    prydaz: Prydaz,
    ceannArCharger: CeannArCharger,
    mannorothsBloodlettingManacles: MannorothsBloodlettingManacles,
  };

  generateResults() {
    const results = new ParseResults();

    const fightDuration = this.fightDuration;

    const nonDpsTimePercentage = this.modules.alwaysBeCasting.totalDamagingTimeWasted / fightDuration;
    const deadTimePercentage = this.modules.alwaysBeCasting.totalTimeWasted / fightDuration;
    const prydazHealingPercentage = this.modules.prydaz.healing / this.totalHealing;

    // Talents
    const hasWarMachine = this.selectedCombatant.hasTalent(SPELLS.WAR_MACHINE_TALENT.id);
    const hasEndlessRage = this.selectedCombatant.hasTalent(SPELLS.ENDLESS_RAGE_TALENT.id);
    const hasAvatar = this.selectedCombatant.hasTalent(SPELLS.AVATAR_TALENT.id);
    const hasWreckingBall = this.selectedCombatant.hasTalent(SPELLS.WRECKING_BALL_TALENT.id);
    const hasFrothingBerderker = this.selectedCombatant.hasTalent(SPELLS.FROTHING_BERSERKER_TALENT.id);
    const hasFrenzy = this.selectedCombatant.hasTalent(SPELLS.FRENZY_TALENT.id);
    const hasInnerRage = this.selectedCombatant.hasTalent(SPELLS.INNER_RAGE_TALENT.id);
    const hasRecklessAbandon = this.selectedCombatant.hasTalent(SPELLS.RECKLESS_ABANDON_TALENT.id);
    const hasDragonRoar = this.selectedCombatant.hasTalent(SPELLS.DRAGON_ROAR_TALENT.id);


    // Uptimes
    const enrageUptime = this.selectedCombatant.getBuffUptime(SPELLS.ENRAGE_BUFF.id) / this.fightDuration;
    const frothingUptime = this.selectedCombatant.getBuffUptime(SPELLS.FROTHING_BERSERKER_BUFF.id) / this.fightDuration;
    const berserkingUptime = this.selectedCombatant.getBuffUptime(SPELLS.BERSERKING_BUFF.id) / this.fightDuration;
    const warMachineUptime = this.selectedCombatant.getBuffUptime(SPELLS.WAR_MACHINE_BUFF.id) / this.fightDuration;

    // Proc counts
    const odynsChampionProcs = this.selectedCombatant.getBuffTriggerCount(SPELLS.ODYNS_CHAMPION_BUFF.id);
    const enrageProcs = this.selectedCombatant.getBuffTriggerCount(SPELLS.ENRAGE_BUFF.id);
    const frothingProcs = this.selectedCombatant.getBuffTriggerCount(SPELLS.FROTHING_BERSERKER_BUFF.id);
    const berserkingProcs = this.selectedCombatant.getBuffTriggerCount(SPELLS.BERSERKING_BUFF.id);
    const warMachineProcs = this.selectedCombatant.getBuffTriggerCount(SPELLS.WAR_MACHINE_BUFF.id);
    const executeStackCount = this.selectedCombatant.getBuffTriggerCount(SPELLS.JUGGERNAUT_BUFF.id);

    // Legendaries
    const rageGainCeannArCharger = this.modules.ceannArCharger.rage;
    const mannorothHealing = this.modules.mannorothsBloodlettingManacles.healing;

    //const concordance = this.selectedCombatant.getBuffTriggerCount(SPELLS.ODYNS_CHAMPION_BUFF.id);

    if (nonDpsTimePercentage > 0.3) {
      results.addIssue({
        issue: `Your non DPS time can be improved. Try to cast damaging spells more regularly (${Math.round(nonDpsTimePercentage * 100)}% non DPS time).`,
        icon: 'petbattle_health-down',
        importance: getIssueImportance(nonDpsTimePercentage, 0.4, 0.45, true),
      });
    }
    if (deadTimePercentage > 0.2) {
      results.addIssue({
        issue: `Your dead GCD time can be improved. Try to Always Be Casting (ABC); when you're not healing try to contribute some damage (${Math.round(deadTimePercentage * 100)}% dead GCD time).`,
        icon: 'spell_mage_altertime',
        importance: getIssueImportance(deadTimePercentage, 0.35, 0.4, true),
      });
    }

    const castEfficiencyCategories = SPELL_CATEGORY;
    const castEfficiency = getCastEfficiency(CPM_ABILITIES, this);
    castEfficiency.forEach((cpm) => {
      if (cpm.canBeImproved && !cpm.ability.noSuggestion) {
        results.addIssue({
          issue: <span>Try to cast <SpellLink id={cpm.ability.spell.id} /> more often ({cpm.casts}/{cpm.maxCasts} casts: {Math.round(cpm.castEfficiency * 100)}% cast efficiency). {cpm.ability.extraSuggestion || ''}</span>,
          icon: cpm.ability.spell.icon,
          importance: cpm.ability.importance || getIssueImportance(cpm.castEfficiency, cpm.recommendedCastEfficiency - 0.05, cpm.recommendedCastEfficiency - 0.15),
        });
      }
    });

    results.statistics = [
      <StatisticBox
        icon={(
          <img
            src="./img/healing.png"
            style={{ border: 0 }}
            alt="Damage"
          />)}
        value={`${formatNumber(this.totalDamage / fightDuration * 1000)} DPS`}
        label="Damage done"
      />,
      <StatisticBox
        icon={<Icon icon="spell_mage_altertime" alt="Dead GCD time" />}
        value={`${formatPercentage(deadTimePercentage)} %`}
        label={(
          <dfn data-tip="Dead GCD time is available casting time not used. This can be caused by latency, cast interrupting, not casting anything (e.g. due to movement/stunned), etc.">
            Dead GCD time
          </dfn>
        )}
      />,
    ];

    // Procs and Uptimes
    // Enrage uptime
    results.statistics.push(
      <StatisticBox
        icon={(
          <img
            src="./img/mastery-radius.png"
            style={{ border: 0 }}
            alt="Mastery effectiveness"
          />
        )}
        value={`${(Math.round(enrageUptime * 10000) / 100).toFixed(2)} % (${enrageProcs})`}
        label={(
          <dfn data-tip="Effects that temporarily increase your mastery are currently not supported and will skew results.">
            Enrage Uptime
          </dfn>
        )}
      />,
    );
    // Berserking uptime
    results.statistics.push(
      <StatisticBox
        icon={(
          <img
            src="./img/mastery-radius.png"
            style={{ border: 0 }}
            alt="Mastery effectiveness"
          />
        )}
        value={`${(Math.round(berserkingUptime * 10000) / 100).toFixed(2)} % (${berserkingProcs})`}
        label={(
          <dfn data-tip="Effects that temporarily increase your mastery are currently not supported and will skew results.">
            Berserking Uptime
          </dfn>
        )}
      />,
    );
    // Odyn's champion procs
    results.statistics.push(
      <StatisticBox
        icon={(
          <img
            src="./img/mastery-radius.png"
            style={{ border: 0 }}
            alt="Mastery effectiveness"
          />
        )}
        value={`${odynsChampionProcs}`}
        label={(
          <dfn data-tip="Effects that temporarily increase your mastery are currently not supported and will skew results.">
            Odyn's Champion Procs
          </dfn>
        )}
      />,
    );
    // Exec stack count
    results.statistics.push(
      <StatisticBox
        icon={(
          <img
            src="./img/mastery-radius.png"
            style={{ border: 0 }}
            alt="Mastery effectiveness"
          />
        )}
        value={`${executeStackCount}`}
        label={(
          <dfn data-tip="Effects that temporarily increase your mastery are currently not supported and will skew results.">
            Juggernaut Max Stacks
          </dfn>
        )}
      />,
    );
    

    // Talents choices
    if (hasFrothingBerderker) {
      results.statistics.push(
        <StatisticBox
          icon={(
            <img
              src="./img/mastery-radius.png"
              style={{ border: 0 }}
              alt="Mastery effectiveness"
            />
          )}
          value={`${(Math.round(frothingUptime * 10000) / 100).toFixed(2)} % (${frothingProcs})`}
          label={(
            <dfn data-tip="Effects that temporarily increase your mastery are currently not supported and will skew results.">
              Frothing Berserker Uptime
            </dfn>
          )}
        />
      );
    }

    results.items = [
      this.modules.prydaz.active && {
        id: ITEMS.PRYDAZ_XAVARICS_MAGNUM_OPUS.id,
        icon: <ItemIcon id={ITEMS.PRYDAZ_XAVARICS_MAGNUM_OPUS.id} />,
        title: <ItemLink id={ITEMS.PRYDAZ_XAVARICS_MAGNUM_OPUS.id} />,
        result: (
          <dfn data-tip="The actual effective healing contributed by the Prydaz, Xavaric's Magnum Opus equip effect.">
            {((prydazHealingPercentage * 100) || 0).toFixed(2)} % / {formatNumber(this.modules.prydaz.healing / fightDuration * 1000)} HPS
          </dfn>
        ),
      },
      this.modules.ceannArCharger.active && {
        id: ITEMS.CEANNAR_CHARGER.id,
        icon: <ItemIcon id={ITEMS.CEANNAR_CHARGER.id} />,
        title: <ItemLink id={ITEMS.CEANNAR_CHARGER.id} />,
        result: (
          <dfn data-tip="The actual .">
            {rageGainCeannArCharger} Rage
          </dfn>
        ),
      },
      this.modules.mannorothsBloodlettingManacles.active && {
        id: ITEMS.MANNOROTHS_BLOODLETTING_MANACLES.id,
        icon: <ItemIcon id={ITEMS.MANNOROTHS_BLOODLETTING_MANACLES.id} />,
        title: <ItemLink id={ITEMS.MANNOROTHS_BLOODLETTING_MANACLES.id} />,
        result: (
          <dfn data-tip="The actual effective healing contributed by the Prydaz, Xavaric's Magnum Opus equip effect.">
          {formatNumber(mannorothHealing)}
          </dfn>
        ),
      },
    ];

    results.tabs = [
      {
        title: 'Suggestions',
        url: 'suggestions',
        render: () => (
          <SuggestionsTab issues={results.issues} />
        ),
      },
      {
        title: 'Cast efficiency',
        url: 'cast-efficiency',
        render: () => (
          <CastEfficiencyTab
            categories={castEfficiencyCategories}
            abilities={castEfficiency}
          />
        ),
      },
      {
        title: 'Cooldowns',
        url: 'cooldowns',
        render: () => (
          <CooldownsTab
            fightStart={this.fight.start_time}
            fightEnd={this.fight.end_time}
            cooldowns={this.modules.cooldownTracker.cooldowns}
            showDamageDone
          />
        ),
      },
      {
        title: 'Talents',
        url: 'talents',
        render: () => (
          <TalentsTab combatant={this.selectedCombatant} />
        ),
      },
    ];

    return results;
  }
}

export default CombatLogParser;
