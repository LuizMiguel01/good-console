import { gc } from '../../dist/index.js';

// -----------------------------------------------------
// 1. Standard Logging Methods
// -----------------------------------------------------
gc.log('Log: Default logging');
gc.info('Info: System events');
gc.success('Success: Operation completed');
gc.warn('Warn: Something needs attention');
gc.error('Error: Something went wrong');
gc.panic('Panic: Critical failure');
gc.debug('Debug: Developer details');

// -----------------------------------------------------
// 2. Custom Tags
// -----------------------------------------------------
// You can pass an array of strings as the first argument to add tags
gc.info(['auth', 'login'], 'User logged in successfully');
gc.error(['db', 'connection'], 'Database timeout');
gc.warn(['deprecated'], 'This function will be removed');

// -----------------------------------------------------
// 3. Spotlight (Filtering)
// -----------------------------------------------------
gc.info('This standard info log will be HIDDEN');
gc.info(['auth'], 'This tagged log will be VISIBLE');
gc.panic('This panic log will be VISIBLE (default tag matched)');
gc.error('This error log will be HIDDEN');
gc.clearSpotlight();
gc.info('Info is visible again');

// -----------------------------------------------------
// 4. "Only" Mode (Focus Debugging)
// -----------------------------------------------------
gc.only('Target Message');

gc.log('Some noise'); // Hidden
gc.info('Start process'); // Hidden
gc.log('Target Message'); // VISIBLE
gc.success('Finished'); // Hidden

gc.clearOnly();
gc.log('Noise is back');

// -----------------------------------------------------
// 5. JSON Parsing (Auto-Pretty Print)
// -----------------------------------------------------
const rawJson = '{"user": "Admin", "id": 1, "roles": ["read", "write"]}';
gc.log('Raw JSON string:', rawJson);

// -----------------------------------------------------
// 6. Configuration: Timestamps
// -----------------------------------------------------
gc.timestamps(true);
gc.info('Log with timestamp');
gc.timestamps(false); // Disable for next section

// -----------------------------------------------------
// 7. Configuration: JSON Output Mode
// -----------------------------------------------------
gc.json(true);
gc.info('This log is structured JSON', { context: 'demo' });
gc.error(['custom-tag'], 'Structured error', { code: 500 });
gc.json(false); // Disable