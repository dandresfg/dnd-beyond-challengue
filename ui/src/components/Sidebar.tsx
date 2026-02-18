import { LogEntry } from '@hooks/useActionLog';
import { Flex } from './Flex';
import styles from './Sidebar.module.css';
import { Text } from './Text';

interface SidebarProps {
  logs: LogEntry[];
}

const logColorMap: Record<LogEntry['type'], string> = {
  attack: styles.attackLog,
  heal: styles.healLog,
  tempHp: styles.tempLog,
};

export const Sidebar = ({ logs }: SidebarProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  return (
    <aside
      className={styles.sidebar}
      role="region"
      aria-label="Battle log history"
    >
      <Flex
        direction="row"
        align="center"
        justify="between"
        className={styles.header}
      >
        <Flex direction="row" align="center" gap={1}>
          <Text variant="label" className={styles.headerText}>
            Battle Log
          </Text>
        </Flex>
      </Flex>
      <div
        className={styles.content}
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {!logs.length ? (
          <Flex justify="center">
            <Text variant="label" className={styles.emptyState}>
              No actions yet
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" gap={2}>
            {logs.map((log) => {
              const description = log.enemy
                ? `${formatTime(log.timestamp)}. ${log.enemy.name}. ${log.message}`
                : `${formatTime(log.timestamp)}. ${log.message}`;
              return (
                <div
                  key={log.id}
                  className={`${styles.logEntry} ${logColorMap[log.type]}`}
                  tabIndex={0}
                  role="article"
                  aria-label={`${log.type} log entry. ${description}`}
                >
                  <Flex
                    direction="row"
                    align="center"
                    gap={1}
                    className={styles.logHeader}
                  >
                    <Text variant="label" className={styles.logTime}>
                      {formatTime(log.timestamp)}
                    </Text>
                  </Flex>
                  {log.enemy ? (
                    <Flex
                      direction="row"
                      align="center"
                      gap={1}
                      className={styles.enemyInfo}
                    >
                      <Text variant="label" className={styles.enemyName}>
                        {log.enemy.name}
                      </Text>
                      <Text variant="body" className={styles.logMessage}>
                        {log.message}
                      </Text>
                    </Flex>
                  ) : (
                    <Text variant="body" className={styles.logMessage}>
                      {log.message}
                    </Text>
                  )}
                </div>
              );
            })}
          </Flex>
        )}
      </div>
    </aside>
  );
};
