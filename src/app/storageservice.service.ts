import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  load(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
