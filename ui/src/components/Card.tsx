import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.innerBorder}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
