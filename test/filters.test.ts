import { describe, it, expect, beforeEach } from 'vitest';
import { SpotlightManager, OnlyManager } from '../src/core/filters';

describe('Filters', () => {
  describe('SpotlightManager', () => {
    let spotlight: SpotlightManager;

    beforeEach(() => {
      spotlight = new SpotlightManager();
    });

    it('should allow everything when empty', () => {
      expect(spotlight.hasCallers()).toBe(false);
      expect(spotlight.shouldLog(['error'])).toBe(true);
    });

    it('should filter when tags are added', () => {
      spotlight.add(['error']);
      expect(spotlight.hasCallers()).toBe(true);
      expect(spotlight.shouldLog(['error'])).toBe(true);
      expect(spotlight.shouldLog(['info'])).toBe(false);
    });

    it('should clear tags', () => {
      spotlight.add(['error']);
      spotlight.clear();
      expect(spotlight.hasCallers()).toBe(false);
      expect(spotlight.shouldLog(['info'])).toBe(true);
    });
  });

  describe('OnlyManager', () => {
    let only: OnlyManager;

    beforeEach(() => {
      only = new OnlyManager();
    });

    it('should be inactive by default', () => {
      expect(only.isActive()).toBe(false);
      expect(only.shouldLog('foo')).toBe(true);
    });

    it('should filter strictly by message when active', () => {
      only.activate('target msg');
      expect(only.isActive()).toBe(true);
      expect(only.shouldLog('target msg')).toBe(true);
      expect(only.shouldLog('other msg')).toBe(false);
      // specific check for partial matches - should fail
      expect(only.shouldLog('target msg 2')).toBe(false);
    });

    it('should clear correctly', () => {
      only.activate('foo');
      only.clear();
      expect(only.isActive()).toBe(false);
      expect(only.shouldLog('bar')).toBe(true);
    });
  });
});
