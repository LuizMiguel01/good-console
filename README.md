# Good Console

> A developer-focused, framework-agnostic logging library for TypeScript.
> Zero dependencies. Production ready. Browser + Node.

## Why?
Most loggers are bloated or Node-only. Good Console brings a premium developer experience with beautiful colors, smart filtering (`spotlight`, `only`), and zero configuration to both Browser and Node environments.

## Installation

```bash
npm install good-console
```

## Usage

### Basic Example (Node & Browser)

```typescript
import { gc } from 'good-console';

gc.success('Server started on port 3000');
gc.info('User logged in', { id: 123 });
gc.warn('Rate limit approaching');
gc.error('Database connection failed', new Error('Timeout'));
```

### Spotlight Usage
Focus only on specific log types while debugging.

```typescript
// Only show 'error' and 'warn' logs. Info/Debug/Log are suppressed.
gc.spotlight(['error', 'warn']);

gc.info('This will NOT appear');
gc.error('This WILL appear');

gc.clearSpotlight(); // Reset
```

### Custom Tags
Add your own tags to logs for specific filtering.

```typescript
// Add tags by passing a string array as the first argument
gc.info(['auth'], 'User logged in');
gc.warn(['db', 'timeout'], 'Query took too long');

// Filter by your custom tags
gc.spotlight(['auth', 'db']);
```

### Enhanced Configuration

#### JSON Output
Switch to JSON mode for structured logging (e.g., CloudWatch, Datadog).
```typescript
gc.json(true);
gc.info('Server started');
// Output: {"level":"info", "message":"Server started", "timestamp":17000000000, "file":"...", "line":"..."}
```

#### Timestamps
Add human-readable timestamps to text output.
```typescript
gc.timestamps(true);
gc.info('Hello');
// Output: [10:30:45 AM] [file:line] [INFO] ::: Hello
```

#### Automatic JSON Parsing
Good Console automatically parses JSON strings for better readability.
```typescript
const jsonStr = '{"user": "admin", "id": 1}';
gc.log(jsonStr);
// Output (Pretty printed):
// {
//   "user": "admin",
//   "id": 1
// }
```

### Only Usage
Debug a specific line of code without noise.

```typescript
// Only logs that match this EXACT message string will print.
// Effectively mutes the entire application except this line.
gc.only('Critical checkpoint reached');

gc.log('Data processed');         // Suppressed
gc.log('Critical checkpoint reached'); // Printed
```

## API Reference

### Methods
- `gc.panic(error, ...args)`: Red
- `gc.error(...args)`: Red
- `gc.warn(...args)`: Yellow
- `gc.success(...args)`: Green
- `gc.info(...args)`: Blue
- `gc.debug(...args)`: Gray
- `gc.log(...args)`: White/Neutral

### Filters
- `gc.spotlight(tags[])`: Filter by log type.
- `gc.only(message)`: Exclusive filter by message content.
- `gc.clearSpotlight()`
- `gc.clearOnly()`

## Platform Support

| Feature | Node.js | Browser |
|---------|---------|---------|
| Colors  | ANSI    | CSS %c  |
| Format  | Text    | Text    |
| Stack   | Yes     | Yes     |

## Framework Agnostic
Works with React, Vue, Svelte, Express, NestJS, etc. pure TypeScript library.
