import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  public get(route: string){
    return this.http.get<any>(this.url + route);
  }

  // tslint:disable-next-line: typedef
  public next(nextPage: string){
    return this.http.get<any>(nextPage);
  }
}
