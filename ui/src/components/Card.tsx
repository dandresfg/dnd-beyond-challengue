import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...rest }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`} {...rest}>
      <div className={styles.innerBorder}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
