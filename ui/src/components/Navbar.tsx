import { Text } from './Text';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Text variant="h2" className={styles.title}>
        Survival Arena
      </Text>
    </nav>
  );
};
