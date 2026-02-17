import { createElement, ReactNode } from 'react';
import styles from './Text.module.css';

type TitleVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface TitleProps {
  children: ReactNode;
  variant: TitleVariant;
  className?: string;
}

export const Title = ({
  children,
  variant,
  className = '',
  ...rest
}: TitleProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  const variantClass = styles[variant] || '';
  return createElement(
    variant,
    {
      className: `${variantClass} ${className}`.trim(),
      ...rest,
    },
    children,
  );
};
