import { IAdapter, LogMeta, LogType } from '../core/types.js';
import { formatFilePath } from '../core/formatter.js';

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  white: '\x1b[37m',
};

const TYPE_COLORS: Record<LogType, string> = {
  panic: ANSI.red,
  error: ANSI.red,
  warn: ANSI.yellow,
  success: ANSI.green,
  info: ANSI.blue,
  debug: ANSI.gray,
  log: ANSI.white,
};

export class NodeAdapter implements IAdapter {
  print(type: LogType, message: string, _args: any[], meta: LogMeta): void {
    if (meta.config?.jsonMode) {
      const output = JSON.stringify({
        level: type,
        message: message,
        timestamp: meta.timestamp,
        file: meta.file,
        line: meta.line,
        data: _args
      });
      process.stdout.write(output + '\n');
      return;
    }

    const color = TYPE_COLORS[type] || ANSI.white;
    const typeLabel = type.toUpperCase();
    
    // [TIMESTAMP]
    let timestamp = '';
    if (meta.config?.timestamps) {
       const timeStr = new Date(meta.timestamp).toLocaleTimeString();
       timestamp = `${ANSI.dim}[${timeStr}]${ANSI.reset} `;
    }
    
    // [FILE:LINE]
    let location = '';
    if (meta.file) {
      location = `${ANSI.dim}[${formatFilePath(meta.file)}:${meta.line}]${ANSI.reset} `;
    }

    // [TYPE]
    const label = `${ANSI.bold}${color}[${typeLabel}]${ANSI.reset}`;

    // ::: message
    const output = `${timestamp}${location}${label} ::: ${message}`;

    process.stdout.write(output + '\n');
  }
}
