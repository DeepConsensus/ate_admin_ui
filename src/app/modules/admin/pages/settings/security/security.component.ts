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
  selector: "settings-security",
  templateUrl: "./security.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurityComponent implements OnInit, OnDestroy {
  securityForm: FormGroup;
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
    this.securityForm = this._formBuilder.group({
      default_payment: ["", [Validators.required]],
      stripe_charge: ["", [Validators.required]],
      stripe_publish_key: ["", [Validators.required]],
      stripe_secret: ["", [Validators.required]],
      stripe_url: ["", [Validators.required]],
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
          this.securityForm.patchValue(settings.payment);
        }
      });
  }

  save() {
    if (this.securityForm.valid) {
      const saveData = {
        default_payment: this.securityForm.value.default_payment,
        stripe_charge: this.securityForm.value.stripe_charge,
        stripe_publish_key: this.securityForm.value.stripe_publish_key,
        stripe_secret: this.securityForm.value.stripe_secret,       
        stripe_url: this.securityForm.value.stripe_url
      };
      this.service
        .update(saveData, "payment")
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.errors) {
            this.openSnackBar("Something went wrong, please try again.");
          } else {
            this.openSnackBar("Payment Settings has been updated successfully.");
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
