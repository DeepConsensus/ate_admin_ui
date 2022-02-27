import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SettingsService } from "../settings.service";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "settings-plan-billing",
  templateUrl: "./plan-billing.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPlanBillingComponent implements OnInit, OnDestroy {
  planBillingForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private service: SettingsService,
    private _snackBar: MatSnackBar
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.planBillingForm = this._formBuilder.group({
      order_assinged: ["", [Validators.required]],
      deliverycost: ["", [Validators.required]],
      dispute_responsetime: ["", [Validators.required]],
      search_distance: ["", [Validators.required]],
      deliveryman_responsetime: ["", [Validators.required]],
      dish_commission: ["", [Validators.required]],
      delivery_fee: ["", [Validators.required]],
      orderlimit_min: ["", [Validators.required]],
      orderlimit_max: ["", [Validators.required]],
    });
    this.getSettings();

  }

  getSettings() {
    this.service
      .getList(1, 10)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        if (data && data.docs && data.docs.length) {
          const settings = data.docs[0];
          this.planBillingForm.patchValue(settings.productOrder);
        }
      });
  }

  save() {
    if (this.planBillingForm.valid) {
      const saveData = {
        order_assinged: this.planBillingForm.value.order_assinged,
        deliverycost: this.planBillingForm.value.deliverycost,
        dispute_responsetime: this.planBillingForm.value.dispute_responsetime,
        search_distance: this.planBillingForm.value.search_distance,       
        deliveryman_responsetime: this.planBillingForm.value.deliveryman_responsetime,
        dish_commission: this.planBillingForm.value.dish_commission,
        delivery_fee: this.planBillingForm.value.delivery_fee,
        orderlimit_min: this.planBillingForm.value.orderlimit_min,
        orderlimit_max: this.planBillingForm.value.orderlimit_max
      };
      this.service
        .update(saveData, "productorder")
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.errors) {
            this.openSnackBar("Something went wrong, please try again.");
          } else {
            this.openSnackBar("Product Order has been updated successfully.");
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

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
