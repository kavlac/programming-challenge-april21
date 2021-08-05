import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {

    Swal.fire({
      title: 'Page not found',
      text: 'you will be redirected to home',
      icon: 'error',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate([''])
      }})

    new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
        Swal.close();
        this.route.navigate([''])
      }, 5000);
    })

  }

}
