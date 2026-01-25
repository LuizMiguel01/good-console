import { gc } from '../../dist/index.mjs';

console.log('=== GOOD CONSOLE BROWSER DEMO ===');

// 1. Basic
gc.success('Page Loaded');
gc.info('Fetching data...');
gc.warn('Slow network detected');
gc.debug('User ID:', 42);

// 2. JSON Parsing
gc.log('JSON String Auto-Parse:', '{"response": 200, "data": []}');

// 3. Custom Tags
gc.info(['auth'], 'User authenticated');
gc.error(['api'], 'API Error 500');

// 4. Timestamps (Check console)
gc.timestamps(true);
gc.info('This log has a timestamp');
gc.timestamps(false);

// 5. Interactive Test
console.log('%c Try these in Console:', 'font-weight:bold');
console.log('1. gc.spotlight(["auth"])');
console.log('2. gc.json(true) // Then log something');
console.log('3. gc.only("Target")');

// Expose to window for manual testing
(window as any).gc = gc;
