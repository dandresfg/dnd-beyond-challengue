import { useState } from 'react';
import { Box } from '@mantine/core';
import { Container } from './features/dashboard/Container';
import { CharacterInfoCard } from './features/character/CharacterInfoCard';
import { CharacterHealthBar } from './features/character/CharacterHealthBar';
import { PrepActionCard } from './features/character/PrepActionCard';
import { ThreatCard } from './features/character/ThreatCard';
import { CombatLog } from './features/combat-log/CombatLog';
import {
  mockCharacter,
  mockThreat,
  mockPhase,
  mockPrep,
} from './features/dashboard/mockData';
import { Grid, Stack } from '@mantine/core';
import { PhaseBanner } from './features/dashboard/PhaseBanner';
import { IntroModal } from './components/IntroModal';
import { useGame } from './context/GameContext';

function App() {
  const [prepAmount, setPrepAmount] = useState(mockPrep.prepAmount);
  const { gameStatus } = useGame();

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
          navbarTitle="Survival Mode: Wave 4 Complete"
          navbarPhaseLabel="Tactical Phase"
          sidebarContent={<CombatLog />}
        >
          <Stack gap="lg">
            <PhaseBanner
              title={mockPhase.title}
              description={mockPhase.description}
              buttonLabel={mockPhase.buttonLabel}
              onButtonClick={() => {}}
            />
            <Stack gap="md">
              <Grid>
                <Grid.Col span={{ base: 12, sm: 8 }} h={275}>
                  <CharacterInfoCard
                    name={mockCharacter.name}
                    subtitle={mockCharacter.subtitle}
                    level={mockCharacter.level}
                    portraitUrl={mockCharacter.portraitUrl}
                    ac={mockCharacter.ac}
                    resistances={mockCharacter.resistances}
                    badges={mockCharacter.badges}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }} h={275}>
                  <ThreatCard
                    name={mockThreat.name}
                    damageType={mockThreat.damageType}
                    hasResistance={mockThreat.hasResistance}
                    subtitle={mockThreat.subtitle}
                  />
                </Grid.Col>
              </Grid>
              <CharacterHealthBar
                currentHp={mockCharacter.currentHp}
                maxHp={mockCharacter.maxHp}
                tempHp={mockCharacter.tempHp}
                label={mockCharacter.label}
              />
              <PrepActionCard
                isUserTurn={mockPrep.isUserTurn}
                prepAmount={prepAmount}
                onPrepAmountChange={setPrepAmount}
                onHeal={() => {}}
                onAddTempHp={() => {}}
                quickPrepLabels={mockPrep.quickPrepLabels}
              />
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default App;
