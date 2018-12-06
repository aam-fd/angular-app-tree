import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(
    private _http: HttpClient
  ) { }

  public getTree(): Observable<any> {
    return this._http.get<Object>('./mock-data/data.json');
  }
}
