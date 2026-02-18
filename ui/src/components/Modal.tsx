import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  className?: string;
}

export const Modal = ({
  children,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  className,
}: ModalProps) => {
  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <div className={`${styles.modal} ${className ?? ''}`.trim()}>
        {children}
      </div>
    </div>
  );
};
