import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  private cache: { [key: string]: any } = {};

  set(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: new Date().getTime(),
    };
  }

  get(key: string, maxAge: number = 60000): any {
    const entry = this.cache[key];
    if (entry && new Date().getTime() - entry.timestamp < maxAge) {
      return entry.data;
    }
    return null;
  }
}
