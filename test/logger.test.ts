import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoodConsole } from '../src/core/logger';
import { IAdapter } from '../src/core/types';

describe('GoodConsole', () => {
  let gc: GoodConsole;
  let mockPrint: any;

  beforeEach(() => {
    mockPrint = vi.fn();
    const mockAdapter: IAdapter = {
      print: mockPrint
    };
    gc = new GoodConsole(mockAdapter);
  });

  it('should call adapter with correct type and message', () => {
    gc.log('hello');
    expect(mockPrint).toHaveBeenCalledWith(
      'log',
      'hello',
      ['hello'], // raw args
      expect.objectContaining({ timestamp: expect.any(Number) })
    );
  });

  it('should pass multiple stats', () => {
    gc.warn('warning', 123);
    expect(mockPrint).toHaveBeenCalledWith(
      'warn',
      'warning 123',
      ['warning', 123],
      expect.anything()
    );
  });

  it('should respect spotlight', () => {
    gc.spotlight(['error']);
    
    gc.log('should not print');
    expect(mockPrint).not.toHaveBeenCalled();

    gc.error('should print');
    expect(mockPrint).toHaveBeenCalledTimes(1);
    expect(mockPrint).toHaveBeenCalledWith('error', expect.any(String), expect.any(Array), expect.any(Object));
  });

  it('should respect only', () => {
    gc.only('target');
    
    gc.log('other');
    expect(mockPrint).not.toHaveBeenCalled();
    
    gc.log('target');
    expect(mockPrint).toHaveBeenCalledTimes(1);
  });

  it('should prioritise only over spotlight', () => {
    gc.spotlight(['error']); // strict spotlight
    gc.only('target info'); // 'only' allows this specific message
    
    // logic: If 'only' is active, spotlight is ignored?
    // Spec: "Overrides spotlight if both active"
    // So if 'only' matches, it prints, even if type is not in spotlight?
    // OR does it mean Spotlight is ignored completely?
    // Implementation in logger.ts:
    // if (onlyActive) { checkOnly } 
    // else if (spotlightActive) { checkSpotlight }
    // So YES, checks Only FIRST. If Only allows it (message matches), it prints? 
    // Wait, my implementation:
    // if (onlyManager.isActive()) { if (!shouldLog) return; }
    // -> If it IS active, and it SHOULD log (matches), it falls through to print.
    // The "else if (spotlightManager)" block is skipped.
    // So yes, Only overrides Spotlight.
    
    gc.info('target info'); // Not in spotlight 'error', but is 'only' target
    expect(mockPrint).toHaveBeenCalled();
  });

  it('should support custom tags', () => {
    gc.spotlight(['auth']);
    
    // Default call - NOT 'auth' - suppressed
    gc.info('login'); 
    expect(mockPrint).not.toHaveBeenCalled();

    // Custom tag call - 'auth' - allowed
    gc.info(['auth'], 'login success');
    expect(mockPrint).toHaveBeenCalledWith(
        'info', 
        'login success', 
        ['login success'], 
        expect.anything()
    );
  });
  
  it('should handle multiple custom tags', () => {
    gc.spotlight(['audit']);
    
    gc.warn(['auth', 'audit'], 'user access');
    expect(mockPrint).toHaveBeenCalledWith(
        'warn',
        'user access',
        ['user access'],
        expect.anything()
    );
  });
  
  it('should treat non-string array as message', () => {
    // Spotlight is empty -> allow all
    gc.clearSpotlight();
    
    // [1, 2] is NOT string array -> treat as message
    gc.info([1, 2], 'data');
    expect(mockPrint).toHaveBeenCalledWith(
        'info',
        '[1,2] data', // [1,2] stringified + data
        [[1, 2], 'data'],
        expect.anything()
    );
  });
  
  it('should parse JSON strings automatically', () => {
     gc.log('{"foo":"bar"}');
     expect(mockPrint).toHaveBeenCalledWith(
       'log',
       '{\n  "foo": "bar"\n}', // Pretty printed
       ['{"foo":"bar"}'],
       expect.anything()
     );
  });

  it('should support timestamps config', () => {
    gc.timestamps(true);
    gc.log('test');
    expect(mockPrint).toHaveBeenCalledWith(
      'log', 
      'test', 
      ['test'],
      expect.objectContaining({ 
        config: expect.objectContaining({ timestamps: true }) 
      })
    );
  });
  
  it('should support json mode config', () => {
    gc.json(true);
    gc.log('test');
    expect(mockPrint).toHaveBeenCalledWith(
      'log', 
      'test', 
      ['test'],
      expect.objectContaining({ 
        config: expect.objectContaining({ jsonMode: true }) 
      })
    );
  });
});
