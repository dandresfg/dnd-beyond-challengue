import { useState } from 'react';
import { Box, Grid, Stack } from '@mantine/core';
import { Container } from './features/dashboard/Container';
import { CharacterInfoCard } from './features/character/CharacterInfoCard';
import { CharacterHealthBar } from './features/character/CharacterHealthBar';
import { PrepActionCard } from './features/character/PrepActionCard';
import { ThreatCard } from './features/character/ThreatCard';
import { CombatLog } from './features/combat-log/CombatLog';
import { PhaseBanner } from './features/dashboard/PhaseBanner';
import { IntroModal } from './components/IntroModal';
import { useGame } from './context/GameContext';
import { getEnemyForWave } from './features/enemies/data';

function App() {
  const [prepAmount, setPrepAmount] = useState(0);
  const {
    gameStatus,
    currentWave,
    waveCleared,
    turnPhase,
    character,
    nextWave,
    playerAttack,
    playerHeal,
    addTempHp,
  } = useGame();

  const handleHeal = () => {
    if (prepAmount > 0) {
      playerHeal(prepAmount);
      setPrepAmount(0);
    }
  };

  const handleAddTempHp = () => {
    if (prepAmount > 0) {
      addTempHp(prepAmount);
      setPrepAmount(0);
    }
  };

  const isPrepPhase = waveCleared;
  const nextEnemy =
    isPrepPhase && currentWave < 11 ? getEnemyForWave(currentWave + 1) : null;

  const navbarTitle =
    gameStatus === 'playing'
      ? `Survival Mode: Wave ${currentWave}${isPrepPhase ? ' Complete' : ''}`
      : 'Survival Mode';
  const navbarPhaseLabel = isPrepPhase ? 'Tactical Phase' : 'Combat';

  return (
    <>
      <IntroModal />
      {gameStatus === 'not-started' ? (
        <Box
          style={{
            minHeight: '100vh',
            background:
              'radial-gradient(circle at center, #1a1b3a 0%, #05070a 100%)',
          }}
        />
      ) : (
        <Container
          navbarTitle={navbarTitle}
          navbarPhaseLabel={navbarPhaseLabel}
          sidebarContent={<CombatLog />}
        >
          <Stack gap="lg">
            {isPrepPhase && <PhaseBanner onButtonClick={nextWave} />}
            <Stack gap="md">
              <Grid>
                <Grid.Col
                  span={{
                    base: 12,
                    sm: isPrepPhase ? 8 : 12,
                  }}
                  h={isPrepPhase ? 225 : 200}
                >
                  <CharacterInfoCard {...character} />
                </Grid.Col>
                {isPrepPhase && (
                  <Grid.Col
                    span={{ base: 12, sm: 4 }}
                    h={isPrepPhase ? 225 : undefined}
                  >
                    <ThreatCard
                      enemy={nextEnemy}
                      defenses={character.defenses}
                    />
                  </Grid.Col>
                )}
              </Grid>
              <CharacterHealthBar
                currentHp={character.currentHp}
                maxHp={character.hitPoints}
                tempHp={character.tempHp}
                label={
                  character.currentHp > character.hitPoints * 0.5
                    ? 'Healthy'
                    : 'Wounded'
                }
              />
              <PrepActionCard
                isUserTurn={turnPhase === 'idle'}
                isPrepPhase={isPrepPhase}
                prepAmount={prepAmount}
                onPrepAmountChange={setPrepAmount}
                onAttack={playerAttack}
                onHeal={handleHeal}
                onAddTempHp={handleAddTempHp}
                quickPrepLabels={[
                  'Potion (2d4+2)',
                  'Short Rest',
                  'Lay on Hands (5)',
                ]}
              />
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default App;
