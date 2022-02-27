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
  selector: "settings-team",
  templateUrl: "./team.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTeamComponent implements OnInit, OnDestroy {
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
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.appForm = this._formBuilder.group({
      googlemap_key: ["", [Validators.required]],
      twilio_sid: ["", [Validators.required]],
      twilio_token: ["", [Validators.required]],
      twilio_number: ["", [Validators.required]],
      fb_client_id: ["", [Validators.required]],
      fb_client_secret: ["", [Validators.required]],
      fb_redirect: ["", [Validators.required]],
      google_client_id: ["", [Validators.required]],
      google_client_secret: ["", [Validators.required]],
      google_redirect: ["", [Validators.required]],
      is_sociallogin: [false],
      link: this._formBuilder.group({
        // make a nested group
        facebook: ["", [Validators.required]],
        twitter: ["", [Validators.required]],
        instagram: ["", [Validators.required]],
        pinterest: ["", [Validators.required]],
        vimeo: ["", [Validators.required]],
        youtube: ["", [Validators.required]],
      }),
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
          this.appForm.patchValue(settings.social);
          this.appForm.patchValue({
            link: {
              facebook: settings.social.link.facebook,
              twitter: settings.social.link.twitter,
              instagram: settings.social.link.instagram,
              pinterest: settings.social.link.pinterest,
              vimeo: settings.social.link.vimeo,
              youtube: settings.social.link.youtube,
            },
          });
        }
      });
  }

  save() {
    if (this.appForm.valid) {
      const saveData = {
        googlemap_key: this.appForm.value.googlemap_key,
        twilio_sid: this.appForm.value.twilio_sid,
        twilio_token: this.appForm.value.twilio_token,
        twilio_number: this.appForm.value.twilio_number,
        fb_client_id: this.appForm.value.fb_client_id,
        fb_client_secret: this.appForm.value.fb_client_secret,
        fb_redirect: this.appForm.value.fb_redirect,
        google_client_id: this.appForm.value.google_client_id,
        google_client_secret: this.appForm.value.google_client_secret,
        google_redirect: this.appForm.value.google_redirect,
        link: {
          // make a nested group
          facebook: this.appForm.value.link.facebook,
          twitter: this.appForm.value.link.twitter,
          instagram: this.appForm.value.link.instagram,
          pinterest: this.appForm.value.link.pinterest,
          vimeo: this.appForm.value.link.vimeo,
          youtube: this.appForm.value.link.youtube,
        },
        is_sociallogin: this.appForm.value.is_sociallogin,
      };
      this.service
        .update(saveData, "social")
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
          if (data.errors) {
            this.openSnackBar("Something went wrong, please try again.");
          } else {
            this.openSnackBar("Social Settings has been updated successfully.");
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
