import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open('Maximum 3 item drag and drop', 'ok', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'top'
    }).afterOpened
  }
}
