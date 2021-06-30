import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.scss']
})
export class FilmFormComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();;
  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  public filter(movie: string){
    this.messageEvent.emit(movie);
  }

}
