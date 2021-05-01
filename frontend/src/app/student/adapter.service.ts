import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdapterService {
  public rootUrl: string = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  get(path: any) {
    return this.http.get(this.rootUrl + path);
  }

  post(path: any, data: any) {
    return this.http.post(this.rootUrl + path, data);
  }

  put(path: any, data: any) {
    return this.http.put(this.rootUrl + path, data);
  }

  delete(path: any) {
    return this.http.delete(this.rootUrl + path);
  }
}
