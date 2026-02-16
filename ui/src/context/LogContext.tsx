import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { LogEntry } from '../types/log';

function formatTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

type AddEntryInput = Omit<LogEntry, 'id' | 'timestamp'>;

interface LogContextValue {
  entries: LogEntry[];
  addEntry: (input: AddEntryInput) => void;
  clearLog: () => void;
}

const LogContext = createContext<LogContextValue | null>(null);

export function LogProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  const addEntry = useCallback((input: AddEntryInput) => {
    const entry: LogEntry = {
      ...input,
      id: crypto.randomUUID(),
      timestamp: formatTime(),
    };
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const clearLog = useCallback(() => {
    setEntries([]);
  }, []);

  return (
    <LogContext.Provider value={{ entries, addEntry, clearLog }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLog() {
  const ctx = useContext(LogContext);
  if (!ctx) throw new Error('useLog must be used within LogProvider');
  return ctx;
}
