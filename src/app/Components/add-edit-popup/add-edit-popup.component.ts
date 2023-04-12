import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-add-edit-popup',
  templateUrl: './add-edit-popup.component.html',
  styleUrls: ['./add-edit-popup.component.scss'],
})
export class AddEditPopupComponent implements OnInit {
  submitButtonTXT: string = 'ADD';

  public userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    job: new FormControl(''),
  });

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.submitButtonTXT = data.submitButtonTXT;
  }

  ngOnInit(): void {}

  Submit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.hasBackdrop = true;

    const dialog_box = this.dialog.open(
      ConfirmationPopUpComponent,
      dialogConfig
    );

    dialog_box.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close(this.userForm.value);
      }
    });
  }
  CloseDialog() {
    this.dialogRef.close(false);
  }
}
