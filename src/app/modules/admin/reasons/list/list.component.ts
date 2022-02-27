import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { ReasonService } from '../reason.service';
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";

import { Router } from "@angular/router";
import { Reason } from 'app/modules/admin/reasons/reason.types';

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  public columns: string[] = ["slno", "reason",  "createdAt", "action"];
  //public dataSource: any[] = [];
  public dataSource = new MatTableDataSource<Reason>();
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  public selectedRowItem: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private service: ReasonService,
    private _router: Router,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getList();
    //Custom filter according to name column
    this.dataSource.filterPredicate = (
      data: { reason: string },
      filterValue: string
    ) => data.reason.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  getList() {
    this.service
      .getList(this.pageIndex + 1, this.pageSize)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        if (data && data.docs) {
          // this.dataSource = data.docs;
          this.dataSource.data = data.docs as Reason[];
          this.setPageCount(data);
        }
      });
  }

  setPageCount(data): void {
    this.length = data.totalDocs ? data.totalDocs : 0;
    //  this.pageSize = (data.totalPages ? data.totalPages : 0);
    this.pageIndex = data.page ? data.page - 1 : 0;
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    //this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getList();
  }

  selectRecord(row): void {
    this.selectedRowItem = row;
  }

  editRow(): void {
    if (this.selectedRowItem) {
      this._router.navigate([
        "/inventory/reasons/update/" + this.selectedRowItem._id,
      ]);
    }
  }

  deleteRow(): void {
    this.confirmDialog();
  }

  confirmDialog(): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteRowItem();
      }
    });
  }

  deleteRowItem() {
    if (this.selectedRowItem) {
      this.service.delete(this.selectedRowItem._id).subscribe((data: any) => {
        if (data.errors) {
          this.openSnackBar("Something went wrong, please try again.");
        } else {
          this.openSnackBar("Reason has been deleted successfully.");
          this.getList();
        }
      });
    }
  }

  openSnackBar(message) {
    this._snackBar.open(message, "Splash", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
