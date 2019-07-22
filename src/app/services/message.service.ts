import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  get(serviceName: string, functionName: string): string {
    let result: string;
    for ( let i = 0; i < this.messages.length; i++) {
      if ( this.messages[i].search(serviceName)
          && this.messages[i].search(functionName) ) {
            result = this.messages[i];
            this.messages.splice(i, 1);
      }
   }
    return result;
  }

  clear() {
    this.messages = [];
  }
}
