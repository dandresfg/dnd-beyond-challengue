import { Flex } from "./Flex";
import { Text } from "./Text";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
    return (
        <aside 
            className={styles.sidebar}
            role="region"
            aria-label="Battle log history"
        >
            <Flex direction="row" align="center" justify="between" className={styles.header}>
                <Flex direction="row" align="center" gap={1}>
                    <Text variant="label" className={styles.headerText}>Battle Log</Text>
                </Flex>
                <span className={styles.badge}>Read Only</span>
            </Flex>
            <div 
                className={styles.content}
                tabIndex={0}
                role="log"
                aria-live="polite"
                aria-atomic="false"
            >
                {/* Log content will go here */}
            </div>
        </aside>
    );
};
