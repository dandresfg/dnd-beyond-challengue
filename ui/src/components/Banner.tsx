import { ReactNode, useEffect, useState, useRef, useCallback } from "react";
import styles from "./Banner.module.css";
import { IconX } from "@tabler/icons-react";

interface BannerProps {
    children: ReactNode;
    variant?: 'danger' | 'success' | 'warning';
    onComplete: () => void;
    timeout?: number;
}

const isScreenReaderActive = (): boolean => {
    // Check if user prefers reduced motion (often enabled with screen readers)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion;
};

export const Banner = ({ children, variant = 'danger', onComplete, timeout = 8000 }: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);
    const bannerRef = useRef<HTMLDivElement>(null);
    const onCompleteRef = useRef(onComplete);
    const [shouldAutoClose] = useState(!isScreenReaderActive());

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const focusTimer = setTimeout(() => {
            if (bannerRef.current) {
                bannerRef.current.focus();
            }
        }, 0);

        let closeTimer: NodeJS.Timeout | null = null;
        if (shouldAutoClose) {
            closeTimer = setTimeout(() => {
                setShowBanner(false);
                onCompleteRef.current();
            }, timeout);
        }

        return () => {
            clearTimeout(focusTimer);
            if (closeTimer) clearTimeout(closeTimer);
        };
    }, [timeout, shouldAutoClose]);

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
                ref={bannerRef}
                className={`${styles.banner} ${styles[variant]}`}
                role="alert"
                aria-live={variant === 'danger' ? 'assertive' : 'polite'}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
            >
                <button
                    onClick={handleClose}
                    className={styles.closeButton}
                    aria-label="Close banner"
                >
                    <IconX />
                </button>
                {children}
            </div>
        </div>
    );
};
