import { ReactNode, useEffect, useState } from "react";
import styles from "./Banner.module.css";

interface BannerProps {
    children: ReactNode;
    variant?: 'danger' | 'success' | 'warning';
    onComplete: () => void;
    timeout?: number;
}

export const Banner = ({ children, variant = 'danger', onComplete, timeout = 10000 }: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowBanner(false);
    //         onComplete();
    //     }, timeout);
    //     return () => clearTimeout(timer);
    // }, [onComplete, timeout]);

    const handleClose = () => {
        setShowBanner(false);
        onComplete();
    };

    if (!showBanner) return null;

    return (
        <div className={styles.bannerWrapper}>
            <div className={`${styles.banner} ${styles[variant]}`}>
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
