import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmDialogComponent } from './components/confirmDialog/confirm-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  open(title: string, text: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        title: title,
        text: text,
      }
    });
  }

  openConfirm(title: string, text: string, cancelText: string, acceptText: string) {
    return this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: title,
          text: text,
          cancelText: cancelText,
          acceptText: acceptText,
        }
      });
  }
}
