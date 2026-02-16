import { createPortal } from 'react-dom';
import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconBolt, IconShield, IconAlertTriangle } from '@tabler/icons-react';
import { usePlayers } from '../hooks/usePlayers';
import { useGame } from '../context/GameContext';
import { apiCharacterToCharacterState } from '../utils/character';

const VOID_BLACK = '#05070a';
const VOID_INDIGO = '#1a1b3a';
const GOLD_ACCENT = '#fbbf24';
const PARCHMENT = '#f4ebd0';

function SelectedChampionCard({
  name,
  isVisible,
}: {
  name: string;
  isVisible: boolean;
}) {
  if (!isVisible) return null;
  return createPortal(
    <Paper
      pos="fixed"
      bottom={32}
      left={32}
      p="sm"
      style={{
        backgroundColor: `${VOID_BLACK}CC`,
        border: `1px solid ${GOLD_ACCENT}33`,
        borderRadius: 12,
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
      }}
    >
      <Group gap="md">
        <Box pos="relative">
          <Avatar src="/assets/player.png" alt={name} size={48} radius="md">
            {name.slice(0, 2).toUpperCase()}
          </Avatar>
          <Box
            pos="absolute"
            top={-6}
            right={-6}
            w={14}
            h={14}
            style={{
              borderRadius: '50%',
              backgroundColor: 'var(--mantine-color-green-5)',
              border: '2px solid var(--mantine-color-dark-7)',
            }}
          />
        </Box>
        <Stack gap={2}>
          <Text
            size="xs"
            c="dimmed"
            fw={700}
            tt="uppercase"
            style={{ letterSpacing: '0.05em' }}
          >
            Selected Champion
          </Text>
          <Text size="sm" fw={700} c="white">
            {name}
          </Text>
        </Stack>
      </Group>
    </Paper>,
    document.body,
  );
}

export function IntroModal() {
  const { players, isLoading } = usePlayers();
  const { gameStatus, startGame } = useGame();

  const selectedPlayer = players[0];
  const isOpen = gameStatus === 'not-started';

  const handleStart = () => {
    if (selectedPlayer) {
      const characterState = apiCharacterToCharacterState(selectedPlayer);
      startGame(characterState);
    }
  };

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => {}}
        withCloseButton={false}
        centered
        size="lg"
        styles={{
          content: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
          body: { padding: 0 },
        }}
      >
        <Box
          p="xl"
          style={{
            backgroundColor: `${VOID_INDIGO}99`,
            backdropFilter: 'blur(24px)',
            borderRadius: 16,
            border: `1px solid ${GOLD_ACCENT}4D`,
            boxShadow: '0 0 50px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          <Stack gap="xl" align="center">
            <Box ta="center">
              <Text
                size="xs"
                fw={700}
                tt="uppercase"
                style={{ color: GOLD_ACCENT, letterSpacing: '0.3em' }}
              >
                Mission Briefing
              </Text>
              <Text
                component="h1"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                  lineHeight: 1,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                OPERATION:
                <br />
                <Text span style={{ color: GOLD_ACCENT, fontSize: '2.5rem' }}>
                  VOID ANCHOR
                </Text>
              </Text>
              <Box
                mx="auto"
                mt="md"
                style={{
                  width: 128,
                  height: 4,
                  background: `linear-gradient(to right, transparent, ${GOLD_ACCENT}, transparent)`,
                }}
              />
            </Box>

            <Stack gap="md" maw={540} ta="center">
              <Text
                size="xl"
                fs="italic"
                style={{ color: PARCHMENT, fontFamily: 'Cinzel, serif' }}
              >
                {`"The portal rune is fracturing... the weave itself screams under the pressure of the Far Realm."`}
              </Text>
              <Text
                size="xl"
                fw={700}
                tt="uppercase"
                c="white"
                style={{ fontSize: '1.5rem' }}
              >
                Your Mission: Hold the Threshold
              </Text>
              <Text size="sm" c="dimmed">
                Briv stands alone at the precipice. Dark entities gather in the
                mists, hungry for the light of our world.
              </Text>
            </Stack>

            <Stack gap="md" w="100%" maw={400}>
              <Paper
                p="md"
                style={{
                  backgroundColor: `${VOID_BLACK}99`,
                  border: `1px solid ${GOLD_ACCENT}33`,
                  borderRadius: 8,
                }}
              >
                <Group justify="space-between">
                  <Group gap="sm">
                    <IconShield size={24} style={{ color: GOLD_ACCENT }} />
                    <Text fw={700} c="gray.3" size="sm">
                      Survival Objective
                    </Text>
                  </Group>
                  <Text
                    fw={700}
                    size="xl"
                    style={{ color: GOLD_ACCENT, fontFamily: 'Cinzel, serif' }}
                  >
                    11 WAVES
                  </Text>
                </Group>
              </Paper>
              <Paper
                p="md"
                style={{
                  backgroundColor: `${VOID_BLACK}66`,
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 8,
                }}
              >
                <Group gap="sm" wrap="nowrap">
                  <IconAlertTriangle
                    size={20}
                    color="var(--mantine-color-gray-5)"
                  />
                  <Text size="xs" c="dimmed">
                    Healing resources are limited. Tactical management of
                    Temporary HP is critical for survival.
                  </Text>
                </Group>
              </Paper>
            </Stack>

            <Button
              size="xl"
              onClick={handleStart}
              disabled={!selectedPlayer || isLoading}
              rightSection={<IconBolt size={20} />}
              styles={{
                root: {
                  backgroundColor: GOLD_ACCENT,
                  color: VOID_BLACK,
                  fontFamily: 'Cinzel, serif',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: `0 0 30px ${GOLD_ACCENT}66`,
                  fontSize: '1.25rem',
                },
              }}
            >
              Step into the Threshold
            </Button>
          </Stack>
        </Box>
      </Modal>

      <SelectedChampionCard
        name={selectedPlayer?.name ?? ''}
        isVisible={!!selectedPlayer && isOpen}
      />
    </>
  );
}
