import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NoticeboardService } from "../noticeboard.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { find } from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  animations: [fuseAnimations],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit, OnDestroy {
  public params: any;
  createForm: FormGroup;
  public deliveryPeople: any[] = [{ _id: 0, name: "Please select " }];
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  getItemDetails: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private nbService: NoticeboardService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.params = this.route.snapshot.params;
    if (this.params && this.params.id) {
      this.getItemById(this.params.id);
    }
  }

  ngOnInit(): void {
    this.createForm = this._formBuilder.group({
      delivery_user: ["", [Validators.required]],
      title: ["", [Validators.required]],
      notice: ["", [Validators.required]],
      extraNote: [""],
    });

    this.getDeliveryPeopleList();
  }

  getDeliveryPeopleList() {
    this.nbService
      .deliveryPeopleList()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        if (data && data.result && data.result.isSuccess) {
          this.deliveryPeople = data.result.data;
        }
      });
  }

  save(): void {
    if (this.params && this.params.id) {
      this.updateNotice();
    } else {
      this.saveNotice();
    }
  }

  saveNotice() {
    if (this.createForm.valid) {
      const exactPeople = find(this.deliveryPeople, {
        _id: this.createForm.value.delivery_user,
      });
      if (exactPeople) {
        const saveData = {
          delivery_user: {
            id: exactPeople._id,
            name: exactPeople.name,
            deviceId: "AAA",
            deviceOS: "IOS",
          },
          title: this.createForm.value.title,
          notice: this.createForm.value.notice,
          extraNote: this.createForm.value.extraNote,
        };
        this.nbService
          .create(saveData)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Notice Board has been created successfully.");
              this._router.navigate(["/inventory/noticeboard/list"]);
            }
          });
      }
    }
  }

  updateNotice() {
    if (this.createForm.valid) {
      const exactPeople = find(this.deliveryPeople, {
        _id: this.createForm.value.delivery_user,
      });
      if (exactPeople) {
        const saveData = {
          delivery_user: {
            id: exactPeople._id,
            name: exactPeople.name,
            deviceId: "AAA",
            deviceOS: "IOS",
          },
          title: this.createForm.value.title,
          notice: this.createForm.value.notice,
          extraNote: this.createForm.value.extraNote,
        };
        this.nbService
          .update(saveData, this.params.id)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Notice Board has been updated successfully.");
              this._router.navigate(["/inventory/noticeboard/list"]);
            }
          });
      }
    }
  }

  getItemById(id): void {
    try {
      this.nbService
        .getById(id)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.result.isSuccess) {
            this.getItemDetails = data.result.data;
            this.createForm.patchValue(this.getItemDetails);
            this.createForm.patchValue({
              delivery_user: this.getItemDetails.delivery_user.id,
            });
          } else {
            this.openSnackBar("Unable to get the data");
          }
        });
    } catch (error) {}
  }

  openSnackBar(message) {
    this._snackBar.open(message, "Splash", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
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
