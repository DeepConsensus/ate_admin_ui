import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SettingsService } from "../settings.service";
import { CommonService } from "app/shared/services/common.service";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { Router } from "@angular/router";

@Component({
  selector: "settings-account",
  templateUrl: "./account.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  public currencyList: any[];
  public language: any[] = [
    { id: 0, name: "en" },
    { id: 1, name: "it" },
  ];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private service: SettingsService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private cs: CommonService
  ) {
    this.getCurrency();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.accountForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      copyright: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      currencycode: ["", [Validators.required]],
      twilotoken: ["", [Validators.required]],
      twilionumber: ["", [Validators.required]],
      pub_pub_key: ["", [Validators.required]],
      pub_sub_key: ["", [Validators.required]],
      client_id: ["", [Validators.required]],
      client_secret: ["", [Validators.required]],
      default_language: ["", [Validators.required]],
      customer_username: ["", [Validators.required]],
      terms_user: ["", [Validators.required]],
      terms_restaurants: ["", [Validators.required]],
      default_location: ["", [Validators.required]],
      amount_referral: ["", [Validators.required]],
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
          this.accountForm.patchValue(settings.site);
          const currencyNameArr = settings.site.currency.split("(");
          if (currencyNameArr.length) {
            const matchedCurrency = currencyNameArr[0].trim();
            this.accountForm.patchValue({
              currency: matchedCurrency,
            });
          }
        }
      });
  }

  getCurrency() {
    this.cs
      .getCurrencyList(1, 10)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        if (data && data.result && data.result.data.length) {
          this.currencyList = data.result.data;
        }
      });
  }

  save() {
    if (this.accountForm.valid) {
      const saveData = {
        title: this.accountForm.value.title,
        logo: this.accountForm.value.logo,
        favicon: this.accountForm.value.favicon,
        copyright: this.accountForm.value.copyright,
        currency:
          this.accountForm.value.currency +
          "(" +
          this.accountForm.value.currencycode +
          ")",
        currencycode: this.accountForm.value.currencycode,
        twilotoken: this.accountForm.value.twilotoken,
        twilionumber: this.accountForm.value.twilionumber,
        pub_pub_key: this.accountForm.value.pub_pub_key,
        pub_sub_key: this.accountForm.value.pub_sub_key,
        client_id: this.accountForm.value.client_id,
        client_secret: this.accountForm.value.client_secret,
        default_language: this.accountForm.value.default_language,
        customer_username: this.accountForm.value.customer_username,
        terms_user: this.accountForm.value.terms_user,
        terms_restaurants: this.accountForm.value.terms_restaurants,
        default_location: this.accountForm.value.default_location,
        amount_referral: this.accountForm.value.amount_referral,
      };
      this.service
        .update(saveData, "site")
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.errors) {
            this.openSnackBar("Something went wrong, please try again.");
          } else {
            this.openSnackBar("Site Settings has been updated successfully.");
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
