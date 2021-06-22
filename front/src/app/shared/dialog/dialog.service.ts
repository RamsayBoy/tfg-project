import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog.component'

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  open(title: string, text: string) {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        text: text,
      }
    });
  }
}
