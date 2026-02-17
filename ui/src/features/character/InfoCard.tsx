import { Card } from '@/components/Card';
import { Flex, FlexProps } from '@/components/Flex';
import { Group } from '@/components/Group';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { useCharacter } from '@hooks/useCharacter';
import { useBreakpoint } from '@hooks/useMediaQuery';
import { Avatar } from './Avatar';
import { HealthBanner } from './HealthBanner';
import styles from './InfoCard.module.css';
import { StatsBanner } from './StatsBanner';

export const CharacterInfoCard = () => {
  const { player } = useCharacter();
  const { isLargeDesktop } = useBreakpoint();

  if (!player) return null;

  const classesLabel =
    player.classes.map((cls) => cls.name).join(', ') || 'None';
  const defensesLabel = player.defenses.map((d) => d.type).join(', ') || 'None';
  const itemsLabel =
    player.items.length > 0
      ? player.items.map((item) => item.name).join(', ')
      : 'None';

  return (
    <main aria-label="Character information">
      <Card>
        <Flex
          direction={isLargeDesktop ? 'row' : 'column'}
          grow={1}
          gap={3}
          className={styles.content}
        >
          <StatsBanner stats={player.stats} isHorizontal={!isLargeDesktop} />

          <Flex
            direction={!isLargeDesktop ? 'column' : 'row'}
            grow={1}
            gap={3}
            align={!isLargeDesktop ? 'center' : 'center'}
            role="group"
            aria-label={`Character details: ${player.name}, Level ${player.level}, Classes ${classesLabel}, Defenses ${defensesLabel}`}
            tabIndex={0}
          >
            <Avatar
              src={`https://dnd-beyond-test.s3.sa-east-1.amazonaws.com/${player.slug}.png`}
              alt={player.name}
            />

            <Flex direction="column" gap={2} grow={1} style={{ width: '100%' }}>
              <Title variant="h1">{player.name}</Title>

              <Flex
                direction={!isLargeDesktop ? 'column' : 'row'}
                gap={!isLargeDesktop ? 1 : 5}
              >
                <Flex direction="column" gap={1} grow={1}>
                  <InfoRow label="Max HP:" value={player.hitPoints} />
                  <InfoRow label="Current HP:" value={player.currentHp} />
                  <InfoRow label="Level:" value={player.level} />
                </Flex>
                {isLargeDesktop && (
                  <Flex direction="column" gap={1} grow={1}>
                    <InfoRow label="Classes:" value={classesLabel} />
                    <InfoRow label="Defenses:" value={defensesLabel} />
                  </Flex>
                )}
              </Flex>

              {!isLargeDesktop && (
                <Flex direction="column" gap={1}>
                  <InfoRow label="Classes:" value={classesLabel} />
                  <InfoRow label="Defenses:" value={defensesLabel} />
                </Flex>
              )}

              <Group aria-label={`Items: ${itemsLabel}`} tabIndex={0}>
                <Flex direction="column" gap={1}>
                  <Text variant="label" className={styles.itemsLabel}>
                    ITEMS
                  </Text>
                  <Text variant="body" className={styles.itemsList}>
                    {player.items.map((item) => item.name).join(', ')}
                  </Text>
                </Flex>
              </Group>
            </Flex>
          </Flex>
        </Flex>

        <HealthBanner
          currentHp={player.currentHp}
          maxHp={player.hitPoints}
          tempHp={player.tempHp}
        />
      </Card>
    </main>
  );
};

interface InfoRowProps extends Omit<FlexProps, 'children'> {
  label: string;
  value: string | number;
}

const InfoRow = ({
  label,
  value,
  direction = 'row',
  justify = 'between',
  ...props
}: InfoRowProps) => (
  <Flex
    direction={direction}
    justify={justify}
    align="end"
    className={styles.infoRow}
    {...props}
  >
    <Text variant="label">{label}</Text>
    <Text variant="value">{value}</Text>
  </Flex>
);
