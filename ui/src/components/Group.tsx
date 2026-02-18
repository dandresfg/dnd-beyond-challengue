import { createElement, ReactNode } from 'react';

type GroupComponent = keyof React.JSX.IntrinsicElements;

interface GroupProps {
  children: ReactNode;
  as?: GroupComponent;
  tabIndex?: number;
}

export const Group = ({
  children,
  as = 'div',
  tabIndex = 0,
  ...rest
}: GroupProps & React.HTMLAttributes<HTMLElement>) => {
  return createElement(as, { role: 'group', tabIndex, ...rest }, children);
};
