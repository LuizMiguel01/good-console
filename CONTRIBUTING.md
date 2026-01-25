# Contributing to Good Console

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/good-console.git
   cd good-console
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run Build**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## Feature Boundary Rules
**IMPORTANT**: This project adheres to a strict MVP scope.
- No external runtime dependencies.
- No new features beyond MVP without discussion.
- No remote logging or file transports.

## Code Style
- Use TypeScript.
- Follow existing patterns (Adapters in `src/adapters`, Core in `src/core`).
- Pure functions where possible.

## Project Structure
- `src/core`: Framework-agnostic logic (Logger, Filters, Stacktrace).
- `src/adapters`: Environment-specific logic (NodeAdapter, BrowserAdapter).
