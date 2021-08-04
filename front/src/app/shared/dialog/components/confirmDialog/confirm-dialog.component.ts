import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  isConfirmed!: boolean;
  confirmed!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      text: string,
      cancelText: string,
      acceptText: string,
    },
  ) { }

  ngOnInit(): void {
  }
}
