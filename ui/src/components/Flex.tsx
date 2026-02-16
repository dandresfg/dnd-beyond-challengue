import { CSSProperties, ReactNode } from 'react';

export interface FlexProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  justify?: 'center' | 'between' | 'start' | 'end' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  grow?: 1 | 2 | 3;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

export const Flex = ({
  children,
  direction = 'column',
  justify,
  align,
  wrap,
  grow,
  gap,
  className = '',
  style = {},
}: FlexProps) => {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    ...style,
  };

  if (justify) {
    const justifyMap = {
      center: 'center',
      between: 'space-between',
      start: 'flex-start',
      end: 'flex-end',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    flexStyle.justifyContent = justifyMap[justify];
  }

  if (align) {
    const alignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    };
    flexStyle.alignItems = alignMap[align];
  }

  if (wrap) {
    flexStyle.flexWrap = 'wrap';
  }

  if (grow) {
    flexStyle.flexGrow = grow;
  }

  if (gap !== undefined) {
    flexStyle.gap = `${gap * 6}px`;
  }

  return (
    <div className={className} style={flexStyle}>
      {children}
    </div>
  );
};
