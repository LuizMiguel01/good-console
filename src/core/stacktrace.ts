import { LogMeta } from './types.js';

export function getCallerInfo(depth: number = 2): Partial<LogMeta> {
  const err = new Error();
  const stack = err.stack;

  if (!stack) {
    return {};
  }

  const lines = stack.split('\n');

  const targetLine = lines[depth + 1] || lines[depth];

  if (!targetLine) {
    return {};
  }

  const fileParams = targetLine.match(/\((.*):(\d+):(\d+)\)/);
  const fileParamsFallback = targetLine.match(/at\s+(.*):(\d+):(\d+)/);

  if (fileParams) {
    return {
      file: fileParams[1],
      line: fileParams[2],
      col: fileParams[3],
    };
  }

  if (fileParamsFallback) {
    return {
      file: fileParamsFallback[1],
      line: fileParamsFallback[2],
      col: fileParamsFallback[3],
    };
  }

  return {};
}
