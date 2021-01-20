import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.scss'],
})
export class OfficersComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  createUser(): void {
    this.router.navigate([`dashboard/create/officer`]);
  }
}
