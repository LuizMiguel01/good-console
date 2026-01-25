import { GoodConsole } from './core/logger.js';
import { NodeAdapter } from './adapters/node-adapter.js';
import { BrowserAdapter } from './adapters/browser-adapter.js';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

let adapter;

if (isNode) {
  adapter = new NodeAdapter();
} else {
  adapter = new BrowserAdapter();
}

export const gc = new GoodConsole(adapter);
export { GoodConsole };
export * from './core/types.js';
