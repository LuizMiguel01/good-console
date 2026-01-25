import { IAdapter, LogMeta, LogType } from '../core/types.js';
import { formatFilePath } from '../core/formatter.js';


export class BrowserAdapter implements IAdapter {
  print(type: LogType, message: string, args: any[], meta: LogMeta): void {
    const bgColor = TYPE_BACKGROUNDS[type] || '#444';
    const typeLabel = type.toUpperCase();

    // [TIMESTAMP]
    let timestamp = '';
    if (meta.config?.timestamps) {
      const timeStr = new Date(meta.timestamp).toLocaleTimeString();
      timestamp = `%c${timeStr}%c `;
    }

    // Badge Style
    const badgeStyle = `background: ${bgColor}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;`;
    const resetStyle = 'color: inherit; background: none;';
    const timeStyle = 'color: #888; margin-right: 5px;';

    // Format: "12:00:00 INFO message"
    // %cTime%c %cBadgee%c message
    let formatted = '';
    const consoleArgs: string[] = [];

    if (timestamp) {
      formatted += timestamp;
      consoleArgs.push(timeStyle, resetStyle);
    }

    formatted += `%c ${typeLabel} %c  ${message}`;
    consoleArgs.push(badgeStyle, resetStyle);

    const method = this.getConsoleMethod(type);
    (console as any)[method](formatted, ...consoleArgs);
  }

  private getConsoleMethod(type: LogType): string {
    // Chrome/Firefox console.log methods don't always support full styling on specific methods like 'warn'/'error' nicely 
    // without messing up the full line background sometimes.
    // But 'log' works best for custom styling.
    // However, we want to preserve the filterability (e.g. user filtering by 'Errors' tab).
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

const TYPE_BACKGROUNDS: Record<LogType, string> = {
  panic: '#ef4444', // Red-500
  error: '#ef4444',
  warn: '#f59e0b', // Amber-500
  success: '#10b981', // Emerald-500
  info: '#3b82f6', // Blue-500
  debug: '#6b7280', // Gray-500
  log: '#6b7280',
};
