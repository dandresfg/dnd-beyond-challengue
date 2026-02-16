import { useState } from 'react';
import { Container } from './features/dashboard/Container';
import { CharacterInfoCard } from './features/character/CharacterInfoCard';
import { CharacterHealthBar } from './features/character/CharacterHealthBar';
import { PrepActionCard } from './features/character/PrepActionCard';
import { ThreatCard } from './features/character/ThreatCard';
import { CombatLog } from './features/combat-log/CombatLog';
import { CombatLogEntry } from './features/combat-log/CombatLogEntry';
import {
  mockLogEntries,
  mockCharacter,
  mockThreat,
  mockPhase,
  mockPrep,
} from './features/dashboard/mockData';
import { Grid, Stack } from '@mantine/core';
import { PhaseBanner } from './features/dashboard/PhaseBanner';

function App() {
  const [prepAmount, setPrepAmount] = useState(mockPrep.prepAmount);

  return (
    <Container
      navbarTitle="Survival Mode: Wave 4 Complete"
      navbarPhaseLabel="Tactical Phase"
      sidebarContent={
        <CombatLog>
          {mockLogEntries.map((entry, i) => (
            <CombatLogEntry
              key={i}
              timestamp={entry.timestamp}
              round={entry.round}
              message={entry.message}
              variant={entry.variant}
            />
          ))}
        </CombatLog>
      }
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
  );
}

export default App;
