import { ReactNode, useEffect, useState, useRef } from "react";
import styles from "./Banner.module.css";

interface BannerProps {
    children: ReactNode;
    variant?: 'danger' | 'success' | 'warning';
    onComplete: () => void;
    timeout?: number;
}

export const Banner = ({ children, variant = 'danger', onComplete, timeout = 5000 }: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bannerRef.current) {
            bannerRef.current.focus();
        }
        
        const timer = setTimeout(() => {
            setShowBanner(false);
            onComplete();
        }, timeout);
        return () => clearTimeout(timer);
    }, [onComplete, timeout]);

    const handleClose = () => {
        setShowBanner(false);
        onComplete();
    };

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
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};
