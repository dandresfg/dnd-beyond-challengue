import { AppShell, Box } from '@mantine/core';
import { Navbar } from './Navbar';
import { BattleLogSidebar } from './BattleLogSidebar';

interface ContainerProps {
  navbarTitle: string;
  navbarPhaseLabel?: string;
  sidebarContent: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
}

export function Container({
  navbarTitle,
  navbarPhaseLabel,
  sidebarContent,
  children,
  sidebarWidth = 320,
}: ContainerProps) {
  return (
    <AppShell
      header={{ height: 64 }}
      aside={{
        width: sidebarWidth,
        breakpoint: 'md',
      }}
      padding="md"
    >
      <AppShell.Header>
        <Navbar title={navbarTitle} phaseLabel={navbarPhaseLabel} />
      </AppShell.Header>
      <AppShell.Main>
        <Box style={{ maxWidth: 1024, margin: '0 auto' }}>{children}</Box>
      </AppShell.Main>
      <AppShell.Aside>
        <BattleLogSidebar>{sidebarContent}</BattleLogSidebar>
      </AppShell.Aside>
    </AppShell>
  );
}
