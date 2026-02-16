import { CharacterInfoCard } from "@features/character/InfoCard"
import { HealBanner } from "@features/character/HealBanner"
import { ActionBar } from "@features/controls/ActionBar"
import { AttackBanner } from "@features/enemy/AttackBanner"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { Flex } from "./Flex"
import { useBreakpoint } from "@hooks/useMediaQuery"
import { useControls } from "@hooks/useControls"
import styles from "./App.module.css"

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

  return (
    <Flex direction="column" className={styles.appContainer}>
      <Navbar />
      <Flex direction={isDesktop ? "row" : "column"} grow={1} className={styles.mainContent}>
        <Flex direction="column" grow={1} className={styles.contentArea}>
          {attackInfo && (
            <AttackBanner
              {...attackInfo}
              onComplete={handleAttackComplete}
            />
          )}
          {healInfo && (
            <HealBanner
              {...healInfo}
              onComplete={handleHealComplete}
            />
          )}
          <CharacterInfoCard />
          <ActionBar
            onAttackStart={handleAttackStart}
            onHealStart={handleHealStart}
          />
        </Flex>
        <Sidebar logs={logs} />
      </Flex>
    </Flex>
  )
}

export default App
