export type LogType = 'panic' | 'error' | 'warn' | 'info' | 'debug' | 'log' | 'success';

export interface LogMeta {
  file?: string;
  line?: string;
  col?: string;
  timestamp: number;
  config?: GoodConsoleConfig;
}

export interface IAdapter {
  print(type: LogType, message: string, args: any[], meta: LogMeta): void;
}

export interface LogMethod {
  (message: any, ...args: any[]): void;
}

export interface GoodConsoleConfig {
  adapter?: IAdapter;
  jsonMode?: boolean;
  timestamps?: boolean;
}

export interface LogMeta {
  file?: string;
  line?: string;
  col?: string;
  timestamp: number;
  config?: GoodConsoleConfig;
}
