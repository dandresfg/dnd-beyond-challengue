import { CharacterInfoCard } from '@features/character/InfoCard';
import { HealBanner } from '@features/character/HealBanner';
import { ActionBar } from '@features/controls/ActionBar';
import { AttackBanner } from '@features/enemy/AttackBanner';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Flex } from './Flex';
import { useBreakpoint } from '@hooks/useMediaQuery';
import { useControls } from '@hooks/useControls';
import styles from './App.module.css';

function App() {
  const { isDesktop } = useBreakpoint();
  const {
    logs,
    attackInfo,
    healInfo,
    handleAttackStart,
    handleHealStart,
    handleAttackComplete,
    handleHealComplete,
  } = useControls();

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
