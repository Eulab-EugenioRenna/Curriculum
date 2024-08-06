import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleObj } from './model/googleObj';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = 'AIzaSyBLEzB5bSzBEx7XNEQS-yaqtOGlxAJ1FIo';
  constructor(private http: HttpClient) {}
  translate(obj: GoogleObj): any {
    return this.http.post(this.url + this.key, obj);
  }
}
