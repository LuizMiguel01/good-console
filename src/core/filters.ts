export class SpotlightManager {
  private tags: Set<string> = new Set();

  add(tags: string[]) {
    tags.forEach(t => this.tags.add(t));
  }

  clear() {
    this.tags.clear();
  }

  hasCallers(): boolean {
    return this.tags.size > 0;
  }

  shouldLog(tags: string[]): boolean {
    if (this.tags.size === 0) return true;
    return tags.some(t => this.tags.has(t));
  }
}

export class OnlyManager {
  private activeMessage: string | null = null;

  activate(message: string) {
    this.activeMessage = message;
  }

  clear() {
    this.activeMessage = null;
  }

  isActive(): boolean {
    return this.activeMessage !== null;
  }

  shouldLog(message: string): boolean {
    if (!this.activeMessage) return true;
    return message === this.activeMessage;
  }
}
