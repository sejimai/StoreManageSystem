import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  year: number = 2022;

  constructor() {}

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
  }
}
