import { CSSProperties, ReactNode } from 'react';
import styles from './Text.module.css';

interface TextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'label' | 'value' | 'body' | 'mono';
  className?: string;
  style?: CSSProperties;
}

export const Text = ({
  children,
  variant = 'body',
  className = '',
  style = {},
}: TextProps) => {
  const variantClass = styles[variant] || '';
  
  return (
    <span className={`${variantClass} ${className}`} style={style}>
      {children}
    </span>
  );
};
