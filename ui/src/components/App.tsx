import { CombatLog } from '@features/character/CombatLog';
import { HealBanner } from '@features/character/HealBanner';
import { CharacterInfoCard } from '@features/character/InfoCard';
import { ActionBar } from '@features/controls/ActionBar';
import { AttackBanner } from '@features/enemy/AttackBanner';
import { useCharacter } from '@hooks/useCharacter';
import { useControls } from '@hooks/useControls';
import { useBreakpoint } from '@hooks/useMediaQuery';
import styles from './App.module.css';
import { Flex } from './Flex';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

function App() {
  const { isDesktop } = useBreakpoint();
  const { player } = useCharacter();
  const {
    logs,
    attackInfo,
    healInfo,
    handleAttackStart,
    handleAttackComplete,
    handleHealStart,
    handleHealComplete,
    clearLogs,
  } = useControls();
  const isDead = player != null && player.currentHp === 0;
  const attacks = logs.filter((log) => log.type === 'attack')?.length ?? 0;

  const Banners = (
    <>
      {attackInfo && (
        <AttackBanner
          key={`${attackInfo.damageType}-${attackInfo.amount}`}
          {...attackInfo}
          onComplete={handleAttackComplete}
        />
      )}
      {healInfo && (
        <HealBanner
          key={`${healInfo.type}-${healInfo.amount}`}
          {...healInfo}
          onComplete={handleHealComplete}
        />
      )}
    </>
  );

  return (
    <Flex direction="column" className={styles.appContainer}>
      {isDead && (
        <CombatLog
          player={player}
          attacks={attacks}
          onRetry={clearLogs}
        />
      )}
      <Navbar />
      <Flex
        direction={isDesktop ? 'row' : 'column'}
        grow={1}
        className={styles.mainContent}
      >
        <Flex direction="column" grow={1} className={styles.contentArea}>
          {isDesktop && Banners}
          <CharacterInfoCard />
          {!isDesktop && Banners}
          <ActionBar
            onAttackStart={handleAttackStart}
            onHealStart={handleHealStart}
          />
        </Flex>
        <Sidebar logs={logs} />
      </Flex>
    </Flex>
  );
}

export default App;
