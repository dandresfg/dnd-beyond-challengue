import { Flex } from './Flex';
import { Text } from './Text';
import { LogEntry } from '@hooks/useActionLog';
import styles from './Sidebar.module.css';

interface SidebarProps {
  logs: LogEntry[];
}

export const Sidebar = ({ logs }: SidebarProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'attack':
        return styles.attackLog;
      case 'heal':
        return styles.healLog;
      case 'tempHp':
        return styles.tempLog;
    }
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
        <span className={styles.badge}>{logs.length} entries</span>
      </Flex>
      <div
        className={styles.content}
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {!logs.length ? (
          <Text variant="label" className={styles.emptyState}>
            No actions yet
          </Text>
        ) : (
          <Flex direction="column" gap={2}>
            {logs.map((log) => (
              <div
                key={log.id}
                className={`${styles.logEntry} ${getLogColor(log.type)}`}
                tabIndex={0}
                role="article"
                aria-label={`${log.type} log entry: ${log.message}`}
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
            ))}
          </Flex>
        )}
      </div>
    </aside>
  );
};
