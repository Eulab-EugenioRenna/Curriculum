import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleObj } from './model/googleObj';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = environment.GOOGLE_API_KEY;
  constructor(private http: HttpClient) {}
  translate(obj: GoogleObj): any {
    return this.http.post(this.url + this.key, obj);
  }
}
