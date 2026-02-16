import { CharacterInfoCard } from "@features/character/InfoCard"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { Flex } from "./Flex"
import { useBreakpoint } from "@hooks/useMediaQuery"
import styles from "./App.module.css"

function App() {
  const { isDesktop } = useBreakpoint();

  return (
    <Flex direction="column" className={styles.appContainer}>
      <Navbar />
      <Flex direction={isDesktop ? "row" : "column"} grow={1} className={styles.mainContent}>
        <Flex direction="column" grow={1} className={styles.contentArea}>
          <CharacterInfoCard />
        </Flex>
        <Sidebar />
      </Flex>
    </Flex>
  )
}

export default App
