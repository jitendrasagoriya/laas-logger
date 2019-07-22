import { LogConsole } from './logConsole';
import { Injectable } from '@angular/core';
import { LogPublisher } from './logPublisher';

@Injectable()
export class LogPublishersServiceService {

  constructor() {
    // Build publishers arrays
    this.buildPublishers();
  }
  // Public properties
  publishers: LogPublisher[] = [];
  // Build publishers array
  buildPublishers(): void {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());
  }
}
