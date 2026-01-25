import { gc } from '../../dist/index.mjs';

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

// Expose to window for manual testing
(window as any).gc = gc;
