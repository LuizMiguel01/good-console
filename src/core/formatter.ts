export function formatMessage(args: any[]): string {
  if (args.length === 0) return '';
  
  return args.map(arg => {
    if (typeof arg === 'string') {
      try {
       if ((arg.startsWith('{') && arg.endsWith('}')) || (arg.startsWith('[') && arg.endsWith(']'))) {
             const parsed = JSON.parse(arg);
             return JSON.stringify(parsed, null, 2);
        }
      } catch (e) {
        // Not valid JSON, keep as string
      }
      return arg;
    }
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2);
      } catch (e) {
        return '[Circular/Unknown]';
      }
    }
    return String(arg);
  }).join(' ');
}

export function formatFilePath(filePath: string): string {
  let cleanPath = filePath.replace(/^file:\/\//, '');
  const parts = cleanPath.split(/[/\\]/);
  
  if (parts.length <= 2) {
    return cleanPath;
  }
  
  // Return last 2 parts of the path
  return parts.slice(-2).join('/');
}
