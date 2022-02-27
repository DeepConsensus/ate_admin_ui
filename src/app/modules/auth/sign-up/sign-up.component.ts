import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { AuthService } from "app/core/auth/auth.service";

@Component({
  selector: "auth-sign-up",
  templateUrl: "./sign-up.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
  @ViewChild("signUpNgForm") signUpNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  signUpForm: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private _router: Router) {}

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value ? null : { isMatching: false };
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", [Validators.required, AuthSignUpComponent.matchValues("password")]],
      phone: ["", Validators.required],
      countrycode: ["", Validators.required],
      type: ["", Validators.required],
      agreements: ["", Validators.requiredTrue],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign up
   */
  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    const saveData = {
      user: {
        fullname: this.signUpForm.value.fullname,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        confirmPassword: this.signUpForm.value.confirmPassword,
        phone: this.signUpForm.value.countrycode + " " + this.signUpForm.value.phone,
        type: parseInt(this.signUpForm.value.type),
      },
    };
    // Sign up
    this._authService.signUp(saveData).subscribe(
      (response) => {
        if (response.userId) {
          // Navigate to the confirmation required page
          this._router.navigateByUrl("/confirmation-required");
        } else {
          // Set the alert
          this.alert = {
            type: "error",
            message: response.error.message ? response.error.message : "Something went wrong, please try again.",
          };

          // Show the alert
          this.showAlert = true;
        }
      },
      (response) => {
        // Re-enable the form
        this.signUpForm.enable();

        // Reset the form
        this.signUpNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: "error",
          message: "Something went wrong, please try again.",
        };

        // Show the alert
        this.showAlert = true;
      }
    );
  }
}
