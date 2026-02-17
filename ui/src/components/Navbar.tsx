import { Title } from './Title';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Title variant="h2" className={styles.title}>
        Survival Arena
      </Title>
    </nav>
  );
};
