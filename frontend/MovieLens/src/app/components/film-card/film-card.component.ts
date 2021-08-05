import { FilmDetailComponent } from './../film-detail/film-detail.component';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Rating } from './../../models/rating.models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnChanges {

  @Input() movies: Rating[] = [];
  rows: any[] = [];

  constructor(
    private dialog: MatDialog
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.movies){
      this.rows = this.groupColumns(this.movies);
    }
  }

  private groupColumns(movies: Rating[]){
    const newRows = [];

    for(let i = 0; i < movies.length; i += 2){
      newRows.push(movies.slice(i, i + 2));
    }

    return newRows;
  }

  // tslint:disable-next-line: typedef
  public viewDetail(id: Rating){
    this.dialog.open(FilmDetailComponent, { data: id});
  }

}
