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
import { PromoCodeService } from "../promo-code.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { find } from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as moment from 'moment';

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
  public ptype: any[] = [{ id: '', name: "Please select " }, { id: 'AMOUNT', name: "Amount" }, { id: 'PERCENT', name: "Percent" }];
  public promocodetypes: any[] = [{ id: '', name: "Please select " }, { id: 'ADDED', name: "Added" }, { id: 'EXPIRED', name: "Expired" }];
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  getItemDetails: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private service: PromoCodeService,
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
      promocode: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      usagelimit_percoupon: ["", [Validators.required]],
      usagelimit_peruser: ["", [Validators.required]],
      type: ["", [Validators.required]],
      promocodetype: ["", [Validators.required]],
      avaiable_from: ["", [Validators.required]],
      expired_date: ["", [Validators.required]],
    });

    
  }

  

  save(): void {
    if (this.params && this.params.id) {
      this.updatePromo();
    } else {
      this.savePromo();
    }
  }

  savePromo() {
    if (this.createForm.valid) {
        const saveData = {
          promocode: this.createForm.value.promocode,
          discount: this.createForm.value.discount,
          usagelimit_percoupon: this.createForm.value.usagelimit_percoupon,
          usagelimit_peruser: this.createForm.value.usagelimit_peruser,
          type: this.createForm.value.type,
          promocodetype: this.createForm.value.promocodetype,
          avaiable_from: this.createForm.value.avaiable_from,
          expired_date: this.createForm.value.expired_date,
        };
        this.service
          .create(saveData)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Promotional Code has been created successfully.");
              this._router.navigate(["/inventory/promocode/list"]);
            }
          });
      
    }
  }

  updatePromo() {
    if (this.createForm.valid) {     
      const saveData = {
        promocode: this.createForm.value.promocode,
        discount: this.createForm.value.discount,
        usagelimit_percoupon: this.createForm.value.usagelimit_percoupon,
        usagelimit_peruser: this.createForm.value.usagelimit_peruser,
        type: this.createForm.value.type,
        promocodetype: this.createForm.value.promocodetype,
        avaiable_from: this.createForm.value.avaiable_from,
        expired_date: this.createForm.value.expired_date,
      };
        this.service
          .update(saveData, this.params.id)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data: any) => {
            if (data.errors) {
              this.openSnackBar("Something went wrong, please try again.");
            } else {
              this.openSnackBar("Promotional Code has been updated successfully.");
              this._router.navigate(["/inventory/promocode/list"]);
            }
          });
      
    }
  }

  getItemById(id): void {
    try {
      this.service
        .getById(id)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.result.isSuccess) {
            this.getItemDetails = data.result.data;
            this.createForm.patchValue(this.getItemDetails);
            this.createForm.patchValue({
              avaiable_from: moment(this.getItemDetails.avaiable_from).format('YYYY-MM-DD'),
            });
            this.createForm.patchValue({
              expired_date: moment(this.getItemDetails.expired_date).format('YYYY-MM-DD'),
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
