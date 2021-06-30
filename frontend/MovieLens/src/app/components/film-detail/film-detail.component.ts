import { Component, Input, OnInit, Inject } from '@angular/core';

import { RequestService } from './../../services/request.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rating } from './../../models/rating.models';
import { FilmLink } from './../../models/link.models';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  public description!: FilmLink;
  public movie: Rating | undefined;
  public link: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Rating,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.movie = this.data;

    this.request.get(`film-link/?film_id=${this.data.film_id.id}`)
      .subscribe(res => {
        this.description = res.results[0];
        this.link = 'https://www.themoviedb.org/movie/' + this.description.tmdb_id;
        console.log(this.link);
    });
  }

}
