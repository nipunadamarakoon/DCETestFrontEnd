import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditPopupComponent } from '../add-edit-popup/add-edit-popup.component';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';
import { UserService } from 'src/app/Services/user.service';
export interface PeriodicElement {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(FormGroupDirective, { static: false })
  dataSource: MatTableDataSource<PeriodicElement>;
  pageSize = 6;
  currentPage = 0;
  totalRows = 0;
  OperationBtnText = 'ADD';
  UserFormDirective: FormGroupDirective;
  noFoundFilterData: boolean = false;
  userList: any;
  constructor(public dialog: MatDialog, public UserService: UserService) {}
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.UserService.getUserList(this.currentPage + 1).subscribe((res) => {
      this.userList = res.data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.userList);
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = res.total;
      });
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getUserList();
  }
  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'avatar',
    'edit',
    'delete',
  ];

  //Insert
  getForm() {
    this.OperationBtnText = 'ADD';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      submitButtonTXT: this.OperationBtnText,
    };
    const dialog_Box = this.dialog.open(AddEditPopupComponent, dialogConfig);
    dialog_Box.afterClosed().subscribe((result) => {
      if (result) {
        const DATA: any = {
          name: result.name,
          job: result.job,
        };
        this.UserService.InsertUser(DATA).subscribe();
      }
    });
  }
  //Update
  getFormToEdit(id: any) {
    this.OperationBtnText = 'UPDATE';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      submitButtonTXT: this.OperationBtnText,
    };
    const dialog_Box = this.dialog.open(AddEditPopupComponent, dialogConfig);
    dialog_Box.afterClosed().subscribe((result) => {
      if (result) {
        const DATA: any = {
          name: result.name,
          job: result.job,
        };
        this.UserService.UpdateUser(DATA, id).subscribe();
      }
    });
  }
  //delete function
  delete(id: any) {
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
        this.UserService.DeleteUser(id).subscribe((res) => {
          console.log('DeleteUser res', res);
        });
      }
    });
  }
}
