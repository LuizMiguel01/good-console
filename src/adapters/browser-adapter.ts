import { IAdapter, LogMeta, LogType } from '../core/types.js';
import { formatFilePath } from '../core/formatter.js';

const TYPE_COLORS: Record<LogType, string> = {
  panic: 'color: red; font-weight: bold;',
  error: 'color: red',
  warn: 'color: orange', 
  success: 'color: green',
  info: 'color: blue',
  debug: 'color: gray',
  log: 'color: inherit',
};

export class BrowserAdapter implements IAdapter {
  print(type: LogType, message: string, args: any[], meta: LogMeta): void {
    const style = TYPE_COLORS[type] || '';
    const typeLabel = type.toUpperCase();
   
    // [FILE:LINE]
    let location = '';
    if (meta.file) {
        location = `[${formatFilePath(meta.file)}:${meta.line}] `;
    }

    // [TIMESTAMP]
    let timestamp = '';
    if (meta.config?.timestamps) {
       const timeStr = new Date(meta.timestamp).toLocaleTimeString();
       timestamp = `[${timeStr}] `;
    }
    
    const formatted = `${timestamp}${location}%c[${typeLabel}]%c ::: ${message}`;
    
    const consoleArgs = [formatted, style, ''];

    const method = this.getConsoleMethod(type);
    (console as any)[method](...consoleArgs);
  }

  private getConsoleMethod(type: LogType): string {
    switch (type) {
      case 'error': return 'error';
      case 'panic': return 'error';
      case 'warn': return 'warn';
      case 'info': return 'info';
      case 'debug': return 'debug';
      default: return 'log';
    }
  }
}
