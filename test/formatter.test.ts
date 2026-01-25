import { describe, it, expect } from 'vitest';
import { formatMessage } from '../src/core/formatter';

describe('Formatter', () => {
  it('should join strings', () => {
    expect(formatMessage(['hello', 'world'])).toBe('hello world');
  });

  it('should stringify objects', () => {
    const obj = { key: 'value' };
    const output = formatMessage(['Obj:', obj]);
    expect(output).toContain('Obj:');
    expect(output).toContain('"key": "value"');
  });

  it('should handle circular references safely', () => {
    const a: any = {};
    a.b = a;
    const output = formatMessage([a]);
    expect(output).toBe('[Circular/Unknown]');
  });
  
  it('should handle mixed types', () => {
    expect(formatMessage([1, 'string', true])).toBe('1 string true');
  });
});

import { formatFilePath } from '../src/core/formatter';

describe('formatFilePath', () => {
  it('should return last 2 parts', () => {
    expect(formatFilePath('/a/b/c/d/e.ts')).toBe('d/e.ts');
  });

  it('should handle short paths', () => {
    expect(formatFilePath('foo.ts')).toBe('foo.ts');
    expect(formatFilePath('src/foo.ts')).toBe('src/foo.ts');
  });

  it('should strip file:// prefix', () => {
    expect(formatFilePath('file:///a/b/c.ts')).toBe('b/c.ts');
  });

  it('should handle backslashes', () => {
    expect(formatFilePath('C:\\Users\\foo\\bar.ts')).toBe('foo/bar.ts');
  });
});
