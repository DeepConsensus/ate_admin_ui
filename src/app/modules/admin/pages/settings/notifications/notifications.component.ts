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

import { Router } from "@angular/router";

@Component({
  selector: "settings-notifications",
  templateUrl: "./notifications.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNotificationsComponent implements OnInit, OnDestroy {
  appForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private service: SettingsService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.appForm = this._formBuilder.group({
      android_env: ["", [Validators.required]],
      android_pushkey: ["", [Validators.required]],
      ios_user_env: ["", [Validators.required]],
      ios_provider_env: ["", [Validators.required]],
      ios_applink: ["", [Validators.required]],
      android_applink: ["", [Validators.required]],
      iosprovider_pushpassword: ["", [Validators.required]],
      iosshop_env: ["", [Validators.required]],
      iosshop_pushpassword: ["", [Validators.required]],
      iosuser_pushpassword: ["", [Validators.required]],
      iosuser_topic: ["", [Validators.required]],
      iosuser_apppassword: ["", [Validators.required]],
      iosprovider_apptopic: ["", [Validators.required]],
      iosprovider_apppassword: ["", [Validators.required]],
      iosshop_apptopic: ["", [Validators.required]],
      iosshop_apppassword: ["", [Validators.required]],
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
          this.appForm.patchValue(settings.app);         
        }
      });
  }

  save() {
    if (this.appForm.valid) {
      const saveData = {
        android_env: this.appForm.value.android_env,
        android_pushkey: this.appForm.value.android_pushkey,
        ios_user_env: this.appForm.value.ios_user_env,
        ios_provider_env: this.appForm.value.ios_provider_env,
        ios_applink: this.appForm.value.ios_applink,
        android_applink: this.appForm.value.android_applink,
        iosprovider_pushpassword: this.appForm.value.iosprovider_pushpassword,
        iosshop_env: this.appForm.value.iosshop_env,
        iosshop_pushpassword: this.appForm.value.iosshop_pushpassword,
        iosuser_pushpassword: this.appForm.value.iosuser_pushpassword,
        iosuser_topic: this.appForm.value.iosuser_topic,
        iosuser_apppassword: this.appForm.value.iosuser_apppassword,
        iosprovider_apptopic: this.appForm.value.iosprovider_apptopic,
        iosprovider_apppassword: this.appForm.value.iosprovider_apppassword,
        iosshop_apptopic: this.appForm.value.iosshop_apptopic,
        iosshop_apppassword: this.appForm.value.iosshop_apppassword,
      };
      this.service
        .update(saveData, "app")
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.errors) {
            this.openSnackBar("Something went wrong, please try again.");
          } else {
            this.openSnackBar("APP Settings has been updated successfully.");
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
