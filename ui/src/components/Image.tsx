import { useState } from 'react';
import styles from './Image.module.css';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const Image = ({ src, alt, className = '' }: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`${styles.imageWrapper} ${className}`}>
            {isLoading && (
                <div className={styles.skeleton} aria-label="Loading image">
                    <div className={styles.pulse}></div>
                </div>
            )}
            {hasError ? (
                <div className={styles.error} aria-label="Failed to load image">
                    <span className={styles.errorIcon}>⚠️</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                />
            )}
        </div>
    );
};
