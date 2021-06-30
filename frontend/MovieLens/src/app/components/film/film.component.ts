import { Rating } from './../../models/rating.models';
import { RequestService } from './../../services/request.service';
import { Movie } from './../../models/movies.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, OnDestroy{

  public movies: Rating[] = [];
  public hasMore = false;
  private nextUrl = '';

  debounce: Subject<string> = new Subject<string>();

  constructor(
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(movie => this.getMovie(movie));
  }

  // tslint:disable-next-line: typedef
  public getMovie(movie: string){
    // tslint:disable-next-line: triple-equals
    if(movie == '')
    {
      this.movies = [];
      this.hasMore = false;
    }
    else
    {
      this.request.get(`rating/?search=${movie}`).subscribe(res =>{
        this.movies = res.results;
        this.nextUrl = res.next;
        if (res.next) { this.hasMore = true; }
        else { this.hasMore = false; }

      });
    }
  }

  // tslint:disable-next-line: typedef
  public getNewPage(){
    this.request.next(this.nextUrl).subscribe(res =>{
      this.movies = res.results;
      this.nextUrl = res.next;
      console.log(res);
      if (res.next) { this.hasMore = true; }
      else { this.hasMore = false; }

    });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
