import { LogType, IAdapter, LogMethod, LogMeta, GoodConsoleConfig } from './types.js';
import { getCallerInfo } from './stacktrace.js';
import { SpotlightManager, OnlyManager } from './filters.js';
import { formatMessage } from './formatter.js';

export class GoodConsole {
  private adapter: IAdapter | null = null;
  private spotlightManager = new SpotlightManager();
  private onlyManager = new OnlyManager();
  private options: GoodConsoleConfig = {};

  constructor(adapter?: IAdapter) {
    if (adapter) {
      this.adapter = adapter;
    }
  }

  setAdapter(adapter: IAdapter) {
    this.adapter = adapter;
  }

  config(options: GoodConsoleConfig) {
    this.options = { ...this.options, ...options };
    if (options.adapter) {
      this.adapter = options.adapter;
    }
  }

  json(enabled: boolean = true) {
    this.options.jsonMode = enabled;
  }

  timestamps(enabled: boolean = true) {
    this.options.timestamps = enabled;
  }

  spotlight(tags: string[]) {
    this.spotlightManager.add(tags);
  }

  only(message: string) {
    this.onlyManager.activate(message);
  }

  clearSpotlight() {
    this.spotlightManager.clear();
  }

  clearOnly() {
    this.onlyManager.clear();
  }

  private internalLog(type: LogType, args: any[]) {
    if (!this.adapter) {
      return;
    }

    let messageArgs = args;
    let customTags: string[] = [];

    if (args.length > 0 && Array.isArray(args[0]) && args[0].every(i => typeof i === 'string')) {
      customTags = args[0];
      messageArgs = args.slice(1);
    }

    const message = formatMessage(messageArgs);

    if (this.onlyManager.isActive()) {
      if (!this.onlyManager.shouldLog(message)) {
        return;
      }
    }
    else if (this.spotlightManager.hasCallers()) {
      const currentTags = [type, ...customTags];
      if (!this.spotlightManager.shouldLog(currentTags)) {
        return;
      }
    }

    const meta: LogMeta = {
      timestamp: Date.now(),
      config: this.options,
      ...getCallerInfo(3)
    };

    this.adapter.print(type, message, messageArgs, meta);
  }

  panic(error: any, ...args: any[]) {
    this.internalLog('panic', [error, ...args]);
  }

  error(...args: any[]) {
    this.internalLog('error', args);
  }

  warn(...args: any[]) {
    this.internalLog('warn', args);
  }

  info(...args: any[]) {
    this.internalLog('info', args);
  }

  debug(...args: any[]) {
    this.internalLog('debug', args);
  }

  log(...args: any[]) {
    this.internalLog('log', args);
  }

  success(...args: any[]) {
    this.internalLog('success', args);
  }
}
