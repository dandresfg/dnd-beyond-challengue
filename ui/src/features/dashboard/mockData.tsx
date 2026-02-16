import type { CombatLogEntryType } from '../combat-log/types';

export const mockLogEntries: CombatLogEntryType[] = [
  {
    timestamp: '10:05 PM',
    round: 'End of Wave 4',
    message: (
      <>
        <strong style={{ color: 'var(--mantine-color-yellow-6)' }}>
          Wave Cleared!
        </strong>{' '}
        Enemies defeated. Entering Tactical Phase.
      </>
    ),
    variant: 'info',
  },
  {
    timestamp: '10:02 PM',
    round: 'Round 4',
    message: (
      <>
        <strong>Briv</strong> took{' '}
        <strong style={{ color: 'var(--mantine-color-red-5)' }}>
          12 Fire damage
        </strong>{' '}
        from{' '}
        <em style={{ color: 'var(--mantine-color-gray-5)' }}>Fire Elemental</em>
        .
      </>
    ),
    variant: 'negative',
  },
  {
    timestamp: '10:00 PM',
    round: 'Round 4',
    message: (
      <>
        <strong>Briv</strong> gained{' '}
        <strong style={{ color: 'var(--mantine-color-blue-5)' }}>
          5 Temp HP
        </strong>{' '}
        from <em style={{ color: 'var(--mantine-color-gray-5)' }}>Heroism</em>.
      </>
    ),
    variant: 'positive',
  },
  {
    timestamp: '09:58 PM',
    round: 'Round 3',
    message: (
      <>
        <strong>Cleric</strong> healed <strong>Briv</strong> for{' '}
        <strong style={{ color: 'var(--mantine-color-green-5)' }}>18 HP</strong>{' '}
        using{' '}
        <em style={{ color: 'var(--mantine-color-gray-5)' }}>Cure Wounds</em>.
      </>
    ),
    variant: 'positive',
  },
  {
    timestamp: '09:45 PM',
    message: <>Wave 4 Started. Initiative rolled.</>,
    variant: 'neutral',
  },
];

export const mockCharacter = {
  name: 'Briv',
  subtitle: 'Half-Orc Paladin / Warlock',
  level: 5,
  portraitUrl: undefined as string | undefined,
  ac: 18,
  resistances: ['Fire', 'Necrotic'],
  badges: ['Concentrating'],
  currentHp: 45,
  maxHp: 58,
  tempHp: 10,
  label: 'Healthy',
};

export const mockThreat = {
  name: 'Swordsman',
  damageType: 'Slashing',
  hasResistance: true,
  subtitle: 'Wave 5 Elite',
};

export const mockPhase = {
  title: 'Tactical Prep Phase',
  description: 'Wave cleared. Prepare Briv for the next encounter.',
  buttonLabel: 'Start Next Wave',
};

export const mockPrep = {
  isUserTurn: true,
  prepAmount: 12,
  quickPrepLabels: ['Potion (2d4+2)', 'Short Rest', 'Lay on Hands (5)'],
};
