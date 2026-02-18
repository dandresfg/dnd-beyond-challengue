import { IconX } from '@tabler/icons-react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  children: ReactNode;
  variant?: 'danger' | 'success' | 'warning';
  onComplete: () => void;
  timeout?: number;
}

export const Banner = ({
  children,
  variant = 'danger',
  onComplete,
  timeout = 8000,
}: BannerProps) => {
  const [showBanner, setShowBanner] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus();
      }
    }, 0);

    const closeTimer = setTimeout(() => {
        setShowBanner(false);
        onCompleteRef.current();
      }, timeout);

    return () => {
      clearTimeout(focusTimer);
      clearTimeout(closeTimer);
    };
  }, [timeout]);

  const handleClose = useCallback(() => {
    setShowBanner(false);
    onCompleteRef.current();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!showBanner) return null;

  return (
    <div className={styles.bannerWrapper}>
      <div
        className={`${styles.banner} ${styles[variant]}`}
        role="alert"
        aria-live={variant === 'danger' ? 'assertive' : 'polite'}
        onKeyDown={handleKeyDown}
      >
        <button
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close banner"
        >
          <IconX />
        </button>
        <div ref={contentRef} tabIndex={-1} className={styles.bannerContent}>
          {children}
        </div>
      </div>
    </div>
  );
};
